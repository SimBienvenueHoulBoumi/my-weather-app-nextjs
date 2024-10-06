"use client";

import { useState, useEffect, useMemo } from "react";

import { getCustomWeather, getCurrentFormattedDate } from "@/services/weather";
import { fetchCountries, fetchCoordinates } from "@/services/countries";

import LocationSelect from "@/components/LocationSelect";
import WeatherDisplay from "@/components/WeatherDisplay";
import Loader from "@/components/Loader";

export default function Home() {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("France");
  const [currentHourWeather, setCurrentHourWeather] = useState<{
    time: string;
    temperature: number;
    windSpeed: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaderFinished, setLoaderFinished] = useState(false);

  useEffect(() => {
    const fetchCountryData = async () => {
      const countryData = await fetchCountries();
      setCountries(countryData);

      if (countryData.find((country: any) => country.name === "France")) {
        setSelectedCity("France");
      }

      setLoading(false);
    };

    fetchCountryData();
  }, []);

  const selectedLocation = useMemo(
    () => countries.find((loc) => loc.name === selectedCity),
    [selectedCity, countries]
  );

  useEffect(() => {
    const fetchWeather = async () => {
      if (!selectedLocation) return;

      setLoading(true);

      const coordinates = await fetchCoordinates(selectedLocation.name);
      if (!coordinates) {
        setLoading(false);
        return;
      }

      try {
        const weatherData = await getCustomWeather(
          coordinates.lat,
          coordinates.lng
        );

        if (!weatherData) {
          setCurrentHourWeather(null);
          setLoading(false);
          return;
        }

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
        setCurrentHourWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedLocation]);

  const handleLocationChange = (city: string) => {
    setSelectedCity(city);
    setLoaderFinished(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-[320px] space-y-2">
      <LocationSelect
        locations={countries}
        selectedCity={selectedCity}
        onChange={handleLocationChange}
      />
      <WeatherDisplay
        selectedCity={selectedCity}
        weatherData={currentHourWeather}
      />
    </div>
  );
}
