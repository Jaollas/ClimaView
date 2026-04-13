import { Droplets, Wind, Sun, Gauge } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { degreesToDirection, aqiColor } from '../../services/weatherApi';
import type { CurrentWeather, AirQuality } from '../../types/weather';
import styles from './WeatherMetrics.module.css';

interface WeatherMetricsProps {
  current: CurrentWeather;
  airQuality?: AirQuality | null;
  isLoading?: boolean;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  accent?: string;
}

function MetricCard({ icon, label, value, subValue, accent }: MetricCardProps) {
  return (
    <div className={styles.metricCard}>
      <div className={styles.metricIcon} style={accent ? { color: accent } : undefined}>
        {icon}
      </div>
      <div className={styles.metricContent}>
        <span className={styles.metricLabel}>{label}</span>
        <span className={`${styles.metricValue} tabular`}>{value}</span>
        {subValue && <span className={styles.metricSub}>{subValue}</span>}
      </div>
    </div>
  );
}

export function WeatherMetrics({ current, airQuality, isLoading }: WeatherMetricsProps) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`skeleton ${styles.skeletonCard}`} />
        ))}
      </div>
    );
  }

  const windDir = degreesToDirection(current.windDeg);

  const getUvLabel = (uv: number) => {
    if (uv <= 2) return { label: t.uvLow, color: '#4CAF50' };
    if (uv <= 5) return { label: t.uvModerate, color: '#FFC107' };
    if (uv <= 7) return { label: t.uvHigh, color: '#FF9800' };
    if (uv <= 10) return { label: t.uvVeryHigh, color: '#FF5722' };
    return { label: t.uvExtreme, color: '#9C27B0' };
  };

  const getAqiLabel = (aqi: number): string => {
    const labels: Record<number, string> = {
      1: t.aqiGood,
      2: t.aqiFair,
      3: t.aqiModerate,
      4: t.aqiPoor,
      5: t.aqiVeryPoor,
    };
    return labels[aqi] ?? '—';
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{t.currentConditions}</h2>
      <div className={styles.grid}>
        <MetricCard
          icon={<Droplets size={18} />}
          label={t.humidity}
          value={`${current.humidity}%`}
          subValue={
            current.humidity > 70 ? t.humidityHigh :
            current.humidity > 40 ? t.humidityComf : t.humidityLow
          }
          accent="var(--primary)"
        />

        <MetricCard
          icon={<Wind size={18} />}
          label={t.windSpeed}
          value={`${current.windSpeed} km/h`}
          subValue={`${windDir} ${t.windDir}`}
          accent="var(--tertiary)"
        />

        {current.uvIndex !== undefined ? (() => {
          const { label, color } = getUvLabel(current.uvIndex);
          return (
            <MetricCard
              icon={<Sun size={18} />}
              label={t.uvIndex}
              value={String(current.uvIndex)}
              subValue={label}
              accent={color}
            />
          );
        })() : (
          <MetricCard
            icon={<Sun size={18} />}
            label={t.uvIndex}
            value="—"
            accent="var(--secondary)"
          />
        )}

        <MetricCard
          icon={<Gauge size={18} />}
          label={t.pressure}
          value={`${current.pressure} hPa`}
          subValue={
            current.pressure > 1013 ? t.pressureHigh :
            current.pressure < 1013 ? t.pressureLow : t.pressureNormal
          }
          accent="var(--on-surface-variant)"
        />
      </div>

      {}
      {airQuality && (
        <div className={styles.aqiSection}>
          <div className={styles.aqiHeader}>
            <span className={styles.aqiLabel}>{t.airQuality}</span>
            <span
              className={styles.aqiBadge}
              style={{ color: aqiColor(airQuality.aqi) }}
            >
              {getAqiLabel(airQuality.aqi)}
            </span>
          </div>
          <div className={styles.aqiBarTrack}>
            <div
              className={styles.aqiBarFill}
              style={{
                width: `${(airQuality.aqi / 5) * 100}%`,
                background: `linear-gradient(90deg, #4CAF50, ${aqiColor(airQuality.aqi)})`,
              }}
            />
          </div>
          <div className={styles.aqiDetails}>
            <span>PM2.5: <b>{airQuality.pm25.toFixed(1)}</b></span>
            <span>PM10: <b>{airQuality.pm10.toFixed(1)}</b></span>
            <span>NO₂: <b>{airQuality.no2.toFixed(1)}</b></span>
            <span>O₃: <b>{airQuality.o3.toFixed(1)}</b></span>
          </div>
        </div>
      )}

      {}
      <div className={styles.extras}>
        <div className={styles.extraItem}>
          <span className={styles.extraLabel}>{t.visibility}</span>
          <span className={`${styles.extraValue} tabular`}>{current.visibility} km</span>
        </div>
      </div>
    </div>
  );
}
