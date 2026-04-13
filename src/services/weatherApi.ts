import type {
  CurrentWeather,
  ForecastData,
  HourlyData,
  DailyData,
  AirQuality,
  WeatherCondition,
  Coordinates,
} from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';
const AIR_URL = 'https://api.openweathermap.org/data/2.5';

function kelvinToCelsius(k: number): number {
  return Math.round(k - 273.15);
}

function mpsToKmh(mps: number): number {
  return Math.round(mps * 3.6);
}

export interface GeoResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export async function searchCities(query: string): Promise<GeoResult[]> {
  if (!query.trim()) return [];
  const res = await fetch(
    `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error('Geocoding request failed');
  return res.json();
}

function mapCurrentWeather(data: any, uvIndex?: number): CurrentWeather {
  return {
    city: data.name,
    country: data.sys.country,
    temp: kelvinToCelsius(data.main.temp),
    feelsLike: kelvinToCelsius(data.main.feels_like),
    tempMin: kelvinToCelsius(data.main.temp_min),
    tempMax: kelvinToCelsius(data.main.temp_max),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: mpsToKmh(data.wind.speed),
    windDeg: data.wind.deg ?? 0,
    visibility: Math.round((data.visibility ?? 10000) / 1000),
    uvIndex,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    dt: data.dt,
    timezone: data.timezone,
    condition: data.weather[0] as WeatherCondition,
    coords: { lat: data.coord.lat, lon: data.coord.lon },
  };
}

export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
  const [weatherRes, uvRes] = await Promise.all([
    fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
    fetch(`${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
  ]);

  if (!weatherRes.ok) throw new Error('Weather request failed');

  const weatherData = await weatherRes.json();
  let uvIndex: number | undefined;
  if (uvRes.ok) {
    const uvData = await uvRes.json();
    uvIndex = uvData.value;
  }

  return mapCurrentWeather(weatherData, uvIndex);
}

function mapHourly(item: any): HourlyData {
  return {
    dt: item.dt,
    temp: kelvinToCelsius(item.main.temp),
    feelsLike: kelvinToCelsius(item.main.feels_like),
    humidity: item.main.humidity,
    windSpeed: mpsToKmh(item.wind.speed),
    pop: Math.round((item.pop ?? 0) * 100),
    condition: item.weather[0] as WeatherCondition,
  };
}

function aggregateDaily(items: any[]): DailyData[] {
  const byDay = new Map<string, typeof items>();

  for (const item of items) {
    const date = new Date(item.dt * 1000);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(item);
  }

  return Array.from(byDay.values()).map((dayItems): DailyData => {
    const temps = dayItems.map((i) => kelvinToCelsius(i.main.temp));
    const noonItem = dayItems[Math.floor(dayItems.length / 2)];
    return {
      dt: noonItem.dt,
      tempMin: Math.min(...temps),
      tempMax: Math.max(...temps),
      humidity: Math.round(dayItems.reduce((s, i) => s + i.main.humidity, 0) / dayItems.length),
      windSpeed: mpsToKmh(dayItems.reduce((s, i) => s + i.wind.speed, 0) / dayItems.length),
      pop: Math.round(Math.max(...dayItems.map((i) => i.pop ?? 0)) * 100),
      uvIndex: 0,
      condition: noonItem.weather[0] as WeatherCondition,
      summary: noonItem.weather[0].description,
    };
  });
}

export type { ForecastData };

export async function getForecast(lat: number, lon: number): Promise<ForecastData> {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=40`
  );
  if (!res.ok) throw new Error('Forecast request failed');
  const data = await res.json();

  return {
    hourly: (data.list as unknown[]).slice(0, 9).map(mapHourly),
    daily: aggregateDaily(data.list),
  };
}

function mapOneCallDaily(item: any): DailyData {
  return {
    dt: item.dt,
    tempMin: kelvinToCelsius(item.temp.min),
    tempMax: kelvinToCelsius(item.temp.max),
    humidity: item.humidity,
    windSpeed: mpsToKmh(item.wind_speed),
    pop: Math.round((item.pop ?? 0) * 100),
    uvIndex: item.uvi ?? 0,
    condition: item.weather[0] as WeatherCondition,
    summary: item.weather[0].description,
  };
}

export async function getDailyForecast(lat: number, lon: number): Promise<DailyData[]> {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall` +
    `?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error('One Call API 3.0 failed');
  const data = await res.json();
  return (data.daily as unknown[]).slice(0, 7).map(mapOneCallDaily);
}

export async function getAirQuality(lat: number, lon: number): Promise<AirQuality | null> {
  try {
    const res = await fetch(
      `${AIR_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const comp = data.list[0].components;
    return {
      aqi: data.list[0].main.aqi,
      pm25: comp.pm2_5,
      pm10: comp.pm10,
      no2: comp.no2,
      o3: comp.o3,
    };
  } catch {
    return null;
  }
}

export function getIconUrl(iconCode: string, size: '1x' | '2x' | '4x' = '2x'): string {

  if (size === '1x') {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  }
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
}

export function degreesToDirection(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

export function aqiLabel(aqi: number): string {
  const labels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  return labels[aqi] ?? 'Unknown';
}

export function aqiColor(aqi: number): string {
  const colors = ['', '#4CAF50', '#8BC34A', '#FFC107', '#FF5722', '#9C27B0'];
  return colors[aqi] ?? '#8E9196';
}

export async function getCoordsFromCity(city: string): Promise<Coordinates | null> {
  const results = await searchCities(city);
  if (results.length === 0) return null;
  return { lat: results[0].lat, lon: results[0].lon };
}
