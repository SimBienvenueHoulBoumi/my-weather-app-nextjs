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

  return (
    <div className="bg-blue-100 m-2 p-4 rounded-sm w-full text-center shadow-md">
      <h2 className="text-lg font-semibold">Weather for {selectedCity}</h2>
      <p className="mt-2">
        <strong>Time:</strong> {weatherData.time}
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
