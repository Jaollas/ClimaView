export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  visibility: number;
  uvIndex?: number;
  sunrise: number;
  sunset: number;
  dt: number;
  timezone: number;
  condition: WeatherCondition;
  coords: Coordinates;
}

export interface HourlyData {
  dt: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pop: number; 
  condition: WeatherCondition;
}

export interface DailyData {
  dt: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  pop: number;
  uvIndex: number;
  condition: WeatherCondition;
  summary: string;
}

export interface AirQuality {
  aqi: number; 
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
}

export interface ForecastData {
  hourly: HourlyData[];
  daily: DailyData[];
}

export interface SavedCity {
  id: string;
  name: string;
  country: string;
  coords: Coordinates;
  currentTemp?: number;
  condition?: WeatherCondition;
}

export type WindDirection =
  | 'N' | 'NNE' | 'NE' | 'ENE'
  | 'E' | 'ESE' | 'SE' | 'SSE'
  | 'S' | 'SSW' | 'SW' | 'WSW'
  | 'W' | 'WNW' | 'NW' | 'NNW';

export type AQILabel = 'Good' | 'Fair' | 'Moderate' | 'Poor' | 'Very Poor';
