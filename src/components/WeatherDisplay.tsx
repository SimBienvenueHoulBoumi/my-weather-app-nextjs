"use client";

import { WeatherDisplayProps } from "@/utils/weatherInterface";
import React from "react";

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  selectedCity,
  weatherData,
}) => {
  if (!weatherData) {
    return null;
  }

  // Fonction pour formater la date et l'heure
  const formatDateTime = (dateTime: string) => {
    const dateObj = new Date(dateTime);
    const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    
    const formattedDate = dateObj.toLocaleDateString(undefined, optionsDate);
    const formattedTime = dateObj.toLocaleTimeString(undefined, optionsTime);

    return { formattedDate, formattedTime };
  };

  // Récupérer la date et l'heure formatées
  const { formattedDate, formattedTime } = formatDateTime(weatherData.time);

  return (
    <div className="bg-blue-100 m-2 p-4 rounded-sm w-full text-center shadow-md">
      <h2 className="text-lg font-semibold">Weather for {selectedCity}</h2>
      <p className="mt-2">
        <strong>Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Time:</strong> {formattedTime}
      </p>
      <p>
        <strong>Temperature:</strong> {weatherData.temperature}°C
      </p>
      <p>
        <strong>Wind Speed:</strong> {weatherData.windSpeed} m/s
      </p>
    </div>
  );
};

export default WeatherDisplay;
