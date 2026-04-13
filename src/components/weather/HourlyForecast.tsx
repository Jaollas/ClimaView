import { useState, useEffect } from 'react';
import { Droplets, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getIconUrl } from '../../services/weatherApi';
import { DataSparkline } from './DataSparkline';
import { getConditionLabel } from '../../i18n/conditionTranslations';
import type { HourlyData } from '../../types/weather';
import styles from './HourlyForecast.module.css';

type HourFormat = 12 | 24;
const STORAGE_KEY = 'climaview-hour-format';

interface HourlyForecastProps {
  data: HourlyData[];
  isLoading?: boolean;
}

function formatHour(unix: number, format: HourFormat): string {
  const date = new Date(unix * 1000);
  const h = date.getHours();
  if (format === 24) {
    return `${String(h).padStart(2, '0')}:00`;
  }
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function popColor(pop: number): string {
  if (pop === 0) return 'var(--on-surface-variant)';
  if (pop < 30) return 'var(--tertiary)';
  if (pop < 60) return 'var(--primary)';
  return '#60A5FA';
}

export function HourlyForecast({ data, isLoading }: HourlyForecastProps) {
  const { t, lang } = useLanguage();

  const [hourFormat, setHourFormat] = useState<HourFormat>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === '12' ? 12 : 24;
    } catch {
      return 24;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(hourFormat));
    } catch {  }
  }, [hourFormat]);

  if (isLoading) {
    return (
      <div className={styles.section}>
        <div className={`skeleton ${styles.skeletonFull}`} />
      </div>
    );
  }

  const nowItem = data[0] ?? null;
  const nextItems = data.slice(1, 9); 
  const allItems = nowItem ? [nowItem, ...nextItems] : nextItems;
  const temps = allItems.map((d) => d.temp);

  return (
    <div className={styles.section}>
      {}
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{t.hourlyForecast}</h2>

        <div className={styles.headerRight}>
          <DataSparkline data={temps} color="primary" width={300} height={25} fill={true} />

          {}
          <div className={styles.formatToggle} role="group" aria-label="Formato de hora">
            <button
              className={`${styles.formatBtn} ${hourFormat === 24 ? styles.formatBtnActive : ''}`}
              onClick={() => setHourFormat(24)}
              aria-pressed={hourFormat === 24}
            >
              <Clock size={10} />
              24h
            </button>
            <button
              className={`${styles.formatBtn} ${hourFormat === 12 ? styles.formatBtnActive : ''}`}
              onClick={() => setHourFormat(12)}
              aria-pressed={hourFormat === 12}
            >
              <Clock size={10} />
              12h
            </button>
          </div>
        </div>
      </div>

      {}
      <div className={styles.scrollContainer}>
        <div className={styles.list}>
          {allItems.map((item, i) => {
            const isNow = i === 0;
            const desc = getConditionLabel(item.condition.id, lang);
            const pop = item.pop;

            return (
              <div
                key={item.dt}
                className={`${styles.hourItem} ${isNow ? styles.hourItemNow : ''}`}
              >
                {}
                <span className={`${styles.hourLabel} ${isNow ? styles.hourLabelNow : ''}`}>
                  {isNow ? t.now : formatHour(item.dt, hourFormat)}
                </span>

                {}
                <img
                  src={getIconUrl(item.condition.icon, '2x')}
                  alt={item.condition.description}
                  className={styles.hourIcon}
                  width={44}
                  height={44}
                />

                {}
                <span className={styles.hourDesc}>{desc}</span>

                {}
                <span className={`${styles.hourTemp} tabular`}>{item.temp}°</span>

                {}
                <div className={styles.hourDivider} />

                {}
                <div
                  className={styles.hourPop}
                  style={{ color: popColor(pop) }}
                  title={`Precipitação: ${pop}%`}
                >
                  <Droplets size={15} />
                  <span className="tabular">{pop}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
