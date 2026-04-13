import { useLanguage } from '../../contexts/LanguageContext';
import { getIconUrl } from '../../services/weatherApi';
import { getConditionLabel } from '../../i18n/conditionTranslations';
import { Chip } from '../ui/Chip';
import type { CurrentWeather } from '../../types/weather';
import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  data: CurrentWeather;
  isLoading?: boolean;
}

function formatTime(unix: number, timezone: number): string {
  const date = new Date((unix + timezone) * 1000);
  return date.toUTCString().slice(17, 22);
}

function formatDate(unix: number, timezone: number): string {
  const date = new Date((unix + timezone) * 1000);
  return date.toUTCString().slice(0, 16);
}

export function WeatherCard({ data, isLoading }: WeatherCardProps) {
  const { t, lang } = useLanguage();

  if (isLoading) {
    return (
      <div className={styles.card}>
        <div className={`skeleton ${styles.skeletonHero}`} />
      </div>
    );
  }

  const localTime = formatTime(data.dt, data.timezone);
  const localDate = formatDate(data.dt, data.timezone);
  const sunrise = formatTime(data.sunrise, data.timezone);
  const sunset = formatTime(data.sunset, data.timezone);

  return (
    <div className={styles.card}>
      {}
      <div className={styles.topRow}>
        <div className={styles.location}>
          <h1 className={styles.cityName}>{data.city}</h1>
          <span className={styles.country}>{data.country}</span>
        </div>
        <div className={styles.chips}>
          <Chip label={t.live} variant="live" pulse />
          <Chip label={localDate} variant="neutral" />
        </div>
      </div>

      {}
      <div className={styles.heroRow}>
        <div className={styles.tempSection}>
          <span className={`${styles.temp} tabular`}>{data.temp}</span>
          <span className={styles.tempUnit}>°C</span>
        </div>

        <div className={styles.conditionSection}>
          <img
            src={getIconUrl(data.condition.icon, '4x')}
            alt={data.condition.description}
            className={styles.conditionIcon}
            width={100}
            height={100}
          />
        </div>

        <div className={styles.sideInfo}>
          <div className={styles.sideInfoItem}>
            <span className={styles.sideInfoLabel}>{t.feelsLike}</span>
            <span className={`${styles.sideInfoValue} tabular`}>{data.feelsLike}°C</span>
          </div>
          <div className={styles.sideInfoItem}>
            <span className={styles.sideInfoLabel}>{t.highLow}</span>
            <span className={`${styles.sideInfoValue} tabular`}>
              {data.tempMax}° / {data.tempMin}°
            </span>
          </div>
          <div className={styles.sideInfoItem}>
            <span className={styles.sideInfoLabel}>{t.localTime}</span>
            <span className={`${styles.sideInfoValue} tabular`}>{localTime}</span>
          </div>
        </div>
      </div>

      {}
      <div className={styles.description}>
        <span className={styles.descText}>
          {getConditionLabel(data.condition.id, lang)}
        </span>
      </div>

      {}
      <div className={styles.sunTimeline}>
        <div className={styles.sunItem}>
          <span className={styles.sunLabel}>{t.sunrise}</span>
          <span className={`${styles.sunTime} tabular`}>{sunrise}</span>
        </div>
        <SunArc />
        <div className={styles.sunItem}>
          <span className={styles.sunLabel}>{t.sunset}</span>
          <span className={`${styles.sunTime} tabular`}>{sunset}</span>
        </div>
      </div>
    </div>
  );
}

function SunArc() {
  return (
    <svg
      className={styles.sunArc}
      viewBox="0 0 120 36"
      width="120"
      height="36"
      aria-hidden="true"
    >
      <path
        d="M 4,32 Q 60,-8 116,32"
        fill="none"
        stroke="rgba(47, 217, 244, 0.2)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <circle cx="60" cy="6" r="3" fill="var(--primary)" opacity="0.7" />
    </svg>
  );
}
