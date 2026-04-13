import { Plus, MapPin, Trash2 } from 'lucide-react';
import { SearchInput } from '../ui/SearchInput';
import { Chip } from '../ui/Chip';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import { getIconUrl } from '../../services/weatherApi';
import type { SavedCity, CurrentWeather } from '../../types/weather';
import type { GeoResult } from '../../services/weatherApi';
import styles from './Sidebar.module.css';

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchClear: () => void;
  searchResults: GeoResult[];
  savedCities: SavedCity[];
  activeCity: SavedCity | null;
  current: CurrentWeather | null;
  onSelectCity: (city: SavedCity) => void;
  onAddCity: (city: SavedCity) => void;
  onRemoveCity: (id: string) => void;
}

export function Sidebar({
  searchQuery,
  onSearchChange,
  onSearchClear,
  searchResults,
  savedCities,
  activeCity,
  current,
  onSelectCity,
  onAddCity,
  onRemoveCity,
}: SidebarProps) {
  const { t } = useLanguage();

  const handleAddFromSearch = (result: GeoResult) => {
    const city: SavedCity = {
      id: `${result.lat}-${result.lon}`,
      name: result.name,
      country: result.country,
      coords: { lat: result.lat, lon: result.lon },
    };
    onAddCity(city);
    onSelectCity(city);
    onSearchClear();
  };

  return (
    <aside className={styles.sidebar}>
      {}
      <div className={styles.logo}>
        <span className={styles.logoMark}>◈</span>
        <span className={styles.logoText}>ClimaView</span>
      </div>

      {}
      <div className={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          onClear={onSearchClear}
          placeholder={t.searchPlaceholder}
          id="sidebar-city-search"
        />

        {}
        {searchResults.length > 0 && (
          <ul className={styles.searchResults} role="listbox">
            {searchResults.map((result) => (
              <li
                key={`${result.lat}-${result.lon}`}
                className={styles.searchResultItem}
                role="option"
                aria-selected={false}
              >
                <button
                  className={styles.searchResultBtn}
                  onClick={() => handleAddFromSearch(result)}
                >
                  <MapPin size={12} className={styles.pinIcon} />
                  <span className={styles.resultName}>{result.name}</span>
                  <span className={styles.resultCountry}>
                    {result.state ? `${result.state}, ` : ''}{result.country}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {}
      {current && (
        <div className={styles.currentSummary}>
          <Chip label={t.live} variant="live" pulse />
          <div className={styles.currentCity}>
            <MapPin size={11} />
            <span>{current.city}, {current.country}</span>
          </div>
          <div className={styles.currentTemp}>
            {current.temp}°C
          </div>
        </div>
      )}

      {}
      <div className={styles.divider} />

      {}
      <nav className={styles.citiesSection} aria-label={t.savedCities}>
        <h2 className={styles.sectionLabel}>{t.savedCities}</h2>

        {savedCities.length === 0 && (
          <p className={styles.emptyHint}>
            {t.searchPlaceholder.replace('...', '')} → {t.addCity}
          </p>
        )}

        <ul className={styles.cityList}>
          {savedCities.map((city) => {
            const isActive = activeCity?.id === city.id;
            return (
              <li key={city.id} className={styles.cityItem}>
                <button
                  className={`${styles.cityBtn} ${isActive ? styles.cityBtnActive : ''}`}
                  onClick={() => onSelectCity(city)}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div className={styles.cityInfo}>
                    {city.condition && (
                      <img
                        src={getIconUrl(city.condition.icon, '1x')}
                        alt={city.condition.description}
                        className={styles.cityIcon}
                        width={24}
                        height={24}
                      />
                    )}
                    <div>
                      <span className={styles.cityName}>{city.name}</span>
                      <span className={styles.cityCountry}>{city.country}</span>
                    </div>
                  </div>
                  {city.currentTemp !== undefined && (
                    <span className={`${styles.cityTemp} tabular`}>
                      {city.currentTemp}°
                    </span>
                  )}
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => onRemoveCity(city.id)}
                  aria-label={`${city.name}`}
                  title={`${city.name}`}
                >
                  <Trash2 size={11} />
                </button>
              </li>
            );
          })}
        </ul>

        {savedCities.length < 10 && searchResults.length === 0 && (
          <button
            className={styles.addHint}
            onClick={() => document.getElementById('sidebar-city-search')?.focus()}
            aria-label={t.addCity}
          >
            <Plus size={13} />
            <span>{t.addCity}</span>
          </button>
        )}
      </nav>

      {}
      <div className={styles.sidebarFooter}>
        <LanguageSelector />
        <span className={styles.footerText}>{t.dataSource}</span>
      </div>
    </aside>
  );
}
