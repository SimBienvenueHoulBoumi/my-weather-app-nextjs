export interface WeatherData {
  time: string;
  temperature: number;
  windSpeed: number;
}

export interface WeatherDisplayProps {
  selectedCity: string;
  weatherData: WeatherData | null;
}