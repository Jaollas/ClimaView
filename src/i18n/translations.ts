export type Lang = 'pt-BR' | 'en' | 'es' | 'de' | 'it' | 'fr';

export interface Translations {

  searchPlaceholder: string;
  savedCities: string;
  addCity: string;
  dataSource: string;
  live: string;

  feelsLike: string;
  highLow: string;
  localTime: string;
  sunrise: string;
  sunset: string;

  currentConditions: string;
  humidity: string;
  humidityHigh: string;
  humidityComf: string;
  humidityLow: string;
  windSpeed: string;
  windDir: string;
  uvIndex: string;
  uvLow: string;
  uvModerate: string;
  uvHigh: string;
  uvVeryHigh: string;
  uvExtreme: string;
  pressure: string;
  pressureHigh: string;
  pressureLow: string;
  pressureNormal: string;
  airQuality: string;
  aqiGood: string;
  aqiFair: string;
  aqiModerate: string;
  aqiPoor: string;
  aqiVeryPoor: string;
  visibility: string;

  hourlyForecast: string;
  now: string;

  weeklyForecast: string;
  tempTrend: string;
  legendHigh: string;
  legendLow: string;
  today: string;
  days: [string, string, string, string, string, string, string]; 

  language: string;
  reload: string;
}


export const translations: Record<Lang, Translations> = {
  'pt-BR': {
    searchPlaceholder: 'Buscar cidade...',
    savedCities: 'Cidades Salvas',
    addCity: 'Adicionar cidade',
    dataSource: 'Dados © OpenWeatherMap',
    live: 'AO VIVO',
    feelsLike: 'Sensação',
    highLow: 'Máx / Mín',
    localTime: 'Hora local',
    sunrise: '☀ Nascer do sol',
    sunset: 'Pôr do sol ☽',
    currentConditions: 'Condições Atuais',
    humidity: 'Umidade',
    humidityHigh: 'Alta',
    humidityComf: 'Confortável',
    humidityLow: 'Baixa',
    windSpeed: 'Vento',
    windDir: 'direção',
    uvIndex: 'Índice UV',
    uvLow: 'Baixo',
    uvModerate: 'Moderado',
    uvHigh: 'Alto',
    uvVeryHigh: 'Muito Alto',
    uvExtreme: 'Extremo',
    pressure: 'Pressão',
    pressureHigh: 'Alta pressão',
    pressureLow: 'Baixa pressão',
    pressureNormal: 'Normal',
    airQuality: 'Qualidade do Ar',
    aqiGood: 'Boa',
    aqiFair: 'Razoável',
    aqiModerate: 'Moderada',
    aqiPoor: 'Ruim',
    aqiVeryPoor: 'Muito Ruim',
    visibility: 'Visibilidade',
    hourlyForecast: 'Previsão por Hora',
    now: 'Agora',
    weeklyForecast: 'Previsão 5 Dias',
    tempTrend: 'Tendência de temp.',
    legendHigh: '◆ Máx',
    legendLow: '◆ Mín',
    today: 'Hoje',
    days: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    language: 'Idioma',
    reload: 'Atualizar',
  },


  en: {
    searchPlaceholder: 'Search city...',
    savedCities: 'Saved Cities',
    addCity: 'Add city',
    dataSource: 'Data © OpenWeatherMap',
    live: 'LIVE',
    feelsLike: 'Feels like',
    highLow: 'High / Low',
    localTime: 'Local time',
    sunrise: '☀ Sunrise',
    sunset: 'Sunset ☽',
    currentConditions: 'Current Conditions',
    humidity: 'Humidity',
    humidityHigh: 'High',
    humidityComf: 'Comfortable',
    humidityLow: 'Low',
    windSpeed: 'Wind Speed',
    windDir: 'direction',
    uvIndex: 'UV Index',
    uvLow: 'Low',
    uvModerate: 'Moderate',
    uvHigh: 'High',
    uvVeryHigh: 'Very High',
    uvExtreme: 'Extreme',
    pressure: 'Pressure',
    pressureHigh: 'High pressure',
    pressureLow: 'Low pressure',
    pressureNormal: 'Normal',
    airQuality: 'Air Quality Index',
    aqiGood: 'Good',
    aqiFair: 'Fair',
    aqiModerate: 'Moderate',
    aqiPoor: 'Poor',
    aqiVeryPoor: 'Very Poor',
    visibility: 'Visibility',
    hourlyForecast: 'Hourly Forecast',
    now: 'Now',
    weeklyForecast: '7-Day Forecast',
    tempTrend: 'Temp trend',
    legendHigh: '◆ High',
    legendLow: '◆ Low',
    today: 'Today',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    language: 'Language',
    reload: 'Refresh',
  },


  es: {
    searchPlaceholder: 'Buscar ciudad...',
    savedCities: 'Ciudades Guardadas',
    addCity: 'Agregar ciudad',
    dataSource: 'Datos © OpenWeatherMap',
    live: 'EN VIVO',
    feelsLike: 'Sensación térm.',
    highLow: 'Máx / Mín',
    localTime: 'Hora local',
    sunrise: '☀ Amanecer',
    sunset: 'Atardecer ☽',
    currentConditions: 'Condiciones Actuales',
    humidity: 'Humedad',
    humidityHigh: 'Alta',
    humidityComf: 'Confortable',
    humidityLow: 'Baja',
    windSpeed: 'Viento',
    windDir: 'dirección',
    uvIndex: 'Índice UV',
    uvLow: 'Bajo',
    uvModerate: 'Moderado',
    uvHigh: 'Alto',
    uvVeryHigh: 'Muy Alto',
    uvExtreme: 'Extremo',
    pressure: 'Presión',
    pressureHigh: 'Alta presión',
    pressureLow: 'Baja presión',
    pressureNormal: 'Normal',
    airQuality: 'Calidad del Aire',
    aqiGood: 'Buena',
    aqiFair: 'Regular',
    aqiModerate: 'Moderada',
    aqiPoor: 'Mala',
    aqiVeryPoor: 'Muy Mala',
    visibility: 'Visibilidad',
    hourlyForecast: 'Pronóstico por Hora',
    now: 'Ahora',
    weeklyForecast: 'Pronóstico 7 Días',
    tempTrend: 'Tendencia de temp.',
    legendHigh: '◆ Máx',
    legendLow: '◆ Mín',
    today: 'Hoy',
    days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    language: 'Idioma',
    reload: 'Actualizar',
  },


  de: {
    searchPlaceholder: 'Stadt suchen...',
    savedCities: 'Gespeicherte Städte',
    addCity: 'Stadt hinzufügen',
    dataSource: 'Daten © OpenWeatherMap',
    live: 'LIVE',
    feelsLike: 'Gefühlt',
    highLow: 'Max / Min',
    localTime: 'Ortszeit',
    sunrise: '☀ Sonnenaufgang',
    sunset: 'Sonnenuntergang ☽',
    currentConditions: 'Aktuelle Bedingungen',
    humidity: 'Luftfeuchtigkeit',
    humidityHigh: 'Hoch',
    humidityComf: 'Komfortabel',
    humidityLow: 'Niedrig',
    windSpeed: 'Windgeschw.',
    windDir: 'Richtung',
    uvIndex: 'UV-Index',
    uvLow: 'Niedrig',
    uvModerate: 'Mäßig',
    uvHigh: 'Hoch',
    uvVeryHigh: 'Sehr hoch',
    uvExtreme: 'Extrem',
    pressure: 'Luftdruck',
    pressureHigh: 'Hoher Druck',
    pressureLow: 'Niedriger Druck',
    pressureNormal: 'Normal',
    airQuality: 'Luftqualität',
    aqiGood: 'Gut',
    aqiFair: 'Mäßig',
    aqiModerate: 'Befriedigend',
    aqiPoor: 'Schlecht',
    aqiVeryPoor: 'Sehr schlecht',
    visibility: 'Sichtweite',
    hourlyForecast: 'Stündliche Vorhersage',
    now: 'Jetzt',
    weeklyForecast: '7-Tage-Vorhersage',
    tempTrend: 'Temperaturtrend',
    legendHigh: '◆ Max',
    legendLow: '◆ Min',
    today: 'Heute',
    days: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    language: 'Sprache',
    reload: 'Aktualisieren',
  },


  it: {
    searchPlaceholder: 'Cerca città...',
    savedCities: 'Città Salvate',
    addCity: 'Aggiungi città',
    dataSource: 'Dati © OpenWeatherMap',
    live: 'IN DIRETTA',
    feelsLike: 'Percepita',
    highLow: 'Max / Min',
    localTime: 'Ora locale',
    sunrise: '☀ Alba',
    sunset: 'Tramonto ☽',
    currentConditions: 'Condizioni Attuali',
    humidity: 'Umidità',
    humidityHigh: 'Alta',
    humidityComf: 'Confortevole',
    humidityLow: 'Bassa',
    windSpeed: 'Vento',
    windDir: 'direzione',
    uvIndex: 'Indice UV',
    uvLow: 'Basso',
    uvModerate: 'Moderato',
    uvHigh: 'Alto',
    uvVeryHigh: 'Molto Alto',
    uvExtreme: 'Estremo',
    pressure: 'Pressione',
    pressureHigh: 'Alta pressione',
    pressureLow: 'Bassa pressione',
    pressureNormal: 'Normale',
    airQuality: 'Qualità dell\'Aria',
    aqiGood: 'Buona',
    aqiFair: 'Discreta',
    aqiModerate: 'Moderata',
    aqiPoor: 'Scarsa',
    aqiVeryPoor: 'Molto Scarsa',
    visibility: 'Visibilità',
    hourlyForecast: 'Previsione Oraria',
    now: 'Adesso',
    weeklyForecast: 'Previsione 7 Giorni',
    tempTrend: 'Andamento temp.',
    legendHigh: '◆ Max',
    legendLow: '◆ Min',
    today: 'Oggi',
    days: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    language: 'Lingua',
    reload: 'Aggiorna',
  },


  fr: {
    searchPlaceholder: 'Rechercher une ville...',
    savedCities: 'Villes Enregistrées',
    addCity: 'Ajouter une ville',
    dataSource: 'Données © OpenWeatherMap',
    live: 'EN DIRECT',
    feelsLike: 'Ressenti',
    highLow: 'Max / Min',
    localTime: 'Heure locale',
    sunrise: '☀ Lever du soleil',
    sunset: 'Coucher du soleil ☽',
    currentConditions: 'Conditions Actuelles',
    humidity: 'Humidité',
    humidityHigh: 'Élevée',
    humidityComf: 'Confortable',
    humidityLow: 'Faible',
    windSpeed: 'Vent',
    windDir: 'direction',
    uvIndex: 'Indice UV',
    uvLow: 'Faible',
    uvModerate: 'Modéré',
    uvHigh: 'Élevé',
    uvVeryHigh: 'Très élevé',
    uvExtreme: 'Extrême',
    pressure: 'Pression',
    pressureHigh: 'Haute pression',
    pressureLow: 'Basse pression',
    pressureNormal: 'Normale',
    airQuality: 'Qualité de l\'Air',
    aqiGood: 'Bonne',
    aqiFair: 'Correcte',
    aqiModerate: 'Modérée',
    aqiPoor: 'Mauvaise',
    aqiVeryPoor: 'Très Mauvaise',
    visibility: 'Visibilité',
    hourlyForecast: 'Prévisions Horaires',
    now: 'Maintenant',
    weeklyForecast: 'Prévisions 7 Jours',
    tempTrend: 'Tendance temp.',
    legendHigh: '◆ Max',
    legendLow: '◆ Min',
    today: 'Aujourd\'hui',
    days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    language: 'Langue',
    reload: 'Actualiser',
  },

};

export const LANG_LABELS: Record<Lang, string> = {
  'pt-BR': 'Português (BR)',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
  fr: 'Français',
};
