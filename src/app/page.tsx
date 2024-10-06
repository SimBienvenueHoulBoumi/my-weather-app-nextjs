"use client";

import { useEffect, useState, useMemo } from "react";
import { Weather } from "@/utils/weatherType";
import { getCustomWeather, getCurrentFormattedDate } from "@/services/weather";

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentHourWeather, setCurrentHourWeather] = useState<{
    time: string;
    temperature: number;
    windSpeed: number;
  } | null>(null);

  const [selectedCity, setSelectedCity] = useState("Berlin");

  const [loaderFinished, setLoaderFinished] = useState(false);

  const locations = useMemo(
    () => [
      { name: "Berlin", latitude: 52.52, longitude: 13.41 },
      { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
      { name: "New York", latitude: 40.7128, longitude: -74.006 },
      { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
    ],
    []
  );

  const selectedLocation = useMemo(
    () => locations.find((loc) => loc.name === selectedCity),
    [selectedCity, locations]
  );

  useEffect(() => {
    const fetchWeather = async () => {
      if (!selectedLocation) return;

      setLoading(true);

      try {
        const weatherData = await getCustomWeather(
          selectedLocation.latitude,
          selectedLocation.longitude
        );

        if (!weatherData) {
          setWeather(null);
          setCurrentHourWeather(null);
          setLoading(false);
          return;
        }

        setWeather(weatherData);

        const currentHour = getCurrentFormattedDate();
        const index = weatherData.hourly.time.findIndex((time) =>
          time.startsWith(currentHour)
        );

        if (index !== -1) {
          setCurrentHourWeather({
            time: weatherData.hourly.time[index],
            temperature: weatherData.hourly.temperature_2m[index],
            windSpeed: weatherData.hourly.wind_speed_10m[index],
          });
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setWeather(null);
        setCurrentHourWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    const loaderTimer = setTimeout(() => {
      setLoaderFinished(true);
    }, 3000);

    return () => clearTimeout(loaderTimer);
  }, [selectedLocation]);

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCity(event.target.value);
    setLoaderFinished(false);
  };

  if (loading || !loaderFinished) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!weather || !currentHourWeather) {
    return <div>Failed to load weather data</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Select pour choisir la localisation */}
      <div className="mb-4">
        <label htmlFor="location-select" className="mr-2">
          Choose a location:
        </label>
        <select
          id="location-select"
          onChange={handleLocationChange}
          className="p-2 border rounded-md"
          value={selectedCity}
        >
          {locations.map((loc) => (
            <option key={loc.name} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des données météo de l'heure actuelle */}
      <div className="bg-white m-2 p-2 rounded-sm w-1/3 text-center">
        <h2>Weather for {selectedCity}</h2>
        <p>
          <strong>Time:</strong> {currentHourWeather.time}
        </p>
        <p>
          <strong>Temperature:</strong> {currentHourWeather.temperature}°C
        </p>
        <p>
          <strong>Wind Speed:</strong> {currentHourWeather.windSpeed} m/s
        </p>
      </div>
    </div>
  );
}
