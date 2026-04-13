import './index.css';
import './App.css';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { useWeather } from './hooks/useWeather';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const {
    current,
    forecast,
    airQuality,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    clearSearch,
    searchResults,
    savedCities,
    activeCity,
    addCity,
    removeCity,
    selectCity,
    fetchByCoords,
  } = useWeather();

  const handleAddCity = (city: Parameters<typeof addCity>[0]) => {

    addCity(city);
    fetchByCoords(city.coords.lat, city.coords.lon);
  };

  return (
    <LanguageProvider>
      <div className="app-layout">
        {}
        <Sidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchClear={clearSearch}
          searchResults={searchResults}
          savedCities={savedCities}
          activeCity={activeCity}
          current={current}
          onSelectCity={selectCity}
          onAddCity={handleAddCity}
          onRemoveCity={removeCity}
        />

        {}
        <div className="app-main">
          <Dashboard
            current={current}
            forecast={forecast}
            airQuality={airQuality}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
