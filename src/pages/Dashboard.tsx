import { WeatherCard } from '../components/weather/WeatherCard';
import { WeatherMetrics } from '../components/weather/WeatherMetrics';
import { HourlyForecast } from '../components/weather/HourlyForecast';
import { WeeklyForecast } from '../components/weather/WeeklyForecast';
import type { CurrentWeather, ForecastData, AirQuality } from '../types/weather';
import styles from './Dashboard.module.css';

interface DashboardProps {
  current: CurrentWeather | null;
  forecast: ForecastData | null;
  airQuality: AirQuality | null;
  isLoading: boolean;
  error: string | null;
  onReload?: () => void;
}

export function Dashboard({ current, forecast, airQuality, isLoading, error, onReload }: DashboardProps) {

  return (
    <main className={styles.dashboard} id="main-content">
      {}
      {error && !isLoading && (
        <div className="error-banner" role="alert">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {}
      <WeatherCard
        data={current!}
        isLoading={isLoading || !current}
        onReload={onReload}
        isRefreshing={isLoading}
      />


      {}
      {(current || isLoading) && (
        <WeatherMetrics
          current={current!}
          airQuality={airQuality}
          isLoading={isLoading || !current}
        />
      )}

      {}
      <div className={styles.forecastGrid}>
        <HourlyForecast
          data={forecast?.hourly ?? []}
          isLoading={isLoading || !forecast}
        />
        <WeeklyForecast
          data={forecast?.daily ?? []}
          isLoading={isLoading || !forecast}
        />
      </div>
    </main>
  );
}
