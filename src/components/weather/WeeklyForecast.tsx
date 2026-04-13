import { useLanguage } from '../../contexts/LanguageContext';
import { getIconUrl } from '../../services/weatherApi';
import { DataSparkline } from './DataSparkline';
import { getConditionLabel } from '../../i18n/conditionTranslations';
import type { DailyData } from '../../types/weather';
import styles from './WeeklyForecast.module.css';

interface WeeklyForecastProps {
  data: DailyData[];
  isLoading?: boolean;
}

function formatShortDate(unix: number): string {
  const date = new Date(unix * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

export function WeeklyForecast({ data, isLoading }: WeeklyForecastProps) {
  const { t, lang } = useLanguage();

  if (isLoading) {
    return (
      <div className={styles.section}>
        <div className={`skeleton ${styles.skeletonFull}`} />
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  const allMaxTemps = data.map((d) => d.tempMax);
  const allMinTemps = data.map((d) => d.tempMin);

  const getDayName = (unix: number, index: number): string => {
    if (index === 0) return t.today;
    const date = new Date(unix * 1000);
    return t.days[date.getDay()];
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{t.weeklyForecast}</h2>
        <div className={styles.legend}>
          <span className={styles.legendHigh}>{t.legendHigh}</span>
          <span className={styles.legendLow}>{t.legendLow}</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.table}>
          {}
          <div className={styles.sparkRow}>
            <span className={styles.sparkLabel}>{t.tempTrend}</span>
            <div className={styles.sparkWrapper}>
              <DataSparkline
                data={allMaxTemps}
                color="primary"
                width={300}
                height={40}
                fill
              />
              <DataSparkline
                data={allMinTemps}
                color="secondary"
                width={300}
                height={40}
                fill={false}
              />
            </div>
          </div>

          {}
          {data.map((day, i) => (
            <div
              key={day.dt}
              className={`${styles.dayRow} ${i === 0 ? styles.dayRowToday : ''} ${i % 2 === 0 ? styles.dayRowEven : ''}`}
            >
              <div className={styles.dayInfo}>
                <span className={styles.dayName}>{getDayName(day.dt, i)}</span>
                <span className={styles.dayDate}>{formatShortDate(day.dt)}</span>
              </div>

              <img
                src={getIconUrl(day.condition.icon, '2x')}
                alt={day.condition.description}
                className={styles.dayIcon}
                width={36}
                height={36}
              />

              <span className={styles.dayDesc}>{getConditionLabel(day.condition.id, lang)}</span>

              <div className={styles.dayTemps}>
                <span className={`${styles.tempHigh} tabular`}>{day.tempMax}°</span>
                <span className={`${styles.tempLow} tabular`}>{day.tempMin}°</span>
              </div>

              {day.pop > 0 && (
                <span className={`${styles.dayPop} tabular`}>{day.pop}%</span>
              )}
              {day.pop === 0 && <span className={styles.dayPop} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
