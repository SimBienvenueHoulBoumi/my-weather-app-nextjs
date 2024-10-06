// weather.ts
import { Weather } from "@/utils/weatherType";

const getCustomWeather = async (
  latitude: number,
  longitude: number
): Promise<Weather | null> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return {
      current: {
        time: data.current_weather.time,
        temperature_2m: data.current_weather.temperature,
        wind_speed_10m: data.current_weather.windspeed,
      },
      hourly: {
        time: data.hourly.time,
        temperature_2m: data.hourly.temperature_2m,
        wind_speed_10m: data.hourly.wind_speed_10m,
        relative_humidity_2m: data.hourly.relative_humidity_2m,
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCurrentFormattedDate = () =>{
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}`;
}

export { getCustomWeather, getCurrentFormattedDate };
