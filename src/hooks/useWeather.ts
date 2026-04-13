import { useState, useCallback, useEffect } from 'react';
import type { CurrentWeather, AirQuality, SavedCity, Coordinates } from '../types/weather';
import {
  getCurrentWeather,
  getForecast,
  getDailyForecast,
  getAirQuality,
  searchCities,
} from '../services/weatherApi';
import type { ForecastData, GeoResult } from '../services/weatherApi';

interface WeatherState {
  current: CurrentWeather | null;
  forecast: ForecastData | null;
  airQuality: AirQuality | null;
  isLoading: boolean;
  error: string | null;
}

interface UseWeatherReturn extends WeatherState {
  fetchByCoords: (lat: number, lon: number) => Promise<void>;
  fetchByCity: (city: string) => Promise<void>;
  searchResults: GeoResult[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  clearSearch: () => void;
  savedCities: SavedCity[];
  addCity: (city: SavedCity) => void;
  removeCity: (id: string) => void;
  selectCity: (city: SavedCity) => void;
  activeCity: SavedCity | null;
}

const DEFAULT_COORDS: Coordinates = { lat: -23.5505, lon: -46.6333 }; 

export function useWeather(): UseWeatherReturn {
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: null,
    airQuality: null,
    isLoading: true,
    error: null,
  });

  const [savedCities, setSavedCities] = useState<SavedCity[]>(() => {
    try {
      const stored = localStorage.getItem('climaview-cities');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeCity, setActiveCity] = useState<SavedCity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeoResult[]>([]);

  useEffect(() => {
    localStorage.setItem('climaview-cities', JSON.stringify(savedCities));
  }, [savedCities]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const results = await searchCities(searchQuery);
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchByCoords = useCallback(async (lat: number, lon: number) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const [current, forecast, airQuality, daily7] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
        getAirQuality(lat, lon),
        getDailyForecast(lat, lon).catch(() => null), 
      ]);

      const mergedForecast: ForecastData = {
        ...forecast,
        daily: daily7 ?? forecast.daily,
      };

      setState({ current, forecast: mergedForecast, airQuality, isLoading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch weather data',
      }));
    }
  }, []);

  const fetchByCity = useCallback(
    async (cityName: string) => {
      const results = await searchCities(cityName);
      if (results.length === 0) {
        setState((prev) => ({ ...prev, error: 'City not found' }));
        return;
      }
      await fetchByCoords(results[0].lat, results[0].lon);
    },
    [fetchByCoords]
  );

  const addCity = useCallback((city: SavedCity) => {
    setSavedCities((prev) =>
      prev.some((c) => c.id === city.id) ? prev : [...prev, city]
    );
  }, []);

  const removeCity = useCallback((id: string) => {
    setSavedCities((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const selectCity = useCallback(
    (city: SavedCity) => {
      setActiveCity(city);
      fetchByCoords(city.coords.lat, city.coords.lon);
    },
    [fetchByCoords]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => fetchByCoords(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon)
      );
    } else {
      fetchByCoords(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
    }
  }, [fetchByCoords]);

  return {
    ...state,
    fetchByCoords,
    fetchByCity,
    searchResults,
    searchQuery,
    setSearchQuery,
    clearSearch,
    savedCities,
    addCity,
    removeCity,
    selectCity,
    activeCity,
  };
}
