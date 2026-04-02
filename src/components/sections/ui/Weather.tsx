"use client";

import { useEffect, useState } from "react";
import {
  FaCloud,
  FaSun,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa";

interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

interface Props {
  latitude: number;
  longitude: number;
  city: string;
}

export default function OpenMeteoWeather({ latitude, longitude, city }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  // Live clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather from Open-Meteo
  useEffect(() => {
    async function fetchWeather() {
const res = await fetch(
  `/api/weather?lat=${latitude}&lon=${longitude}`
);
      const data = await res.json();
      if (data.current_weather) {
        setWeather({
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
          weathercode: data.current_weather.weathercode,
          time: data.current_weather.time,
        });
      }
    }
    fetchWeather();
  }, [latitude, longitude]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getWeatherIcon = () => {
    if (!weather)
      return <FaSun size={60} className="text-yellow-400 animate-pulse" />;
    const code = weather.weathercode;
    if (code === 0)
      return <FaSun size={60} className="text-yellow-400 animate-spin-slow" />; // Clear
    if (code >= 1 && code <= 3)
      return <FaCloud size={60} className="text-gray-400 animate-bounce" />; // Cloudy
    if (code >= 45 && code <= 48)
      return <FaSmog size={60} className="text-gray-500 animate-pulse" />; // Fog
    if (code >= 51 && code <= 67)
      return <FaCloudRain size={60} className="text-blue-500 animate-bounce" />; // Rain
    if (code >= 71 && code <= 77)
      return (
        <FaSnowflake size={60} className="text-blue-200 animate-spin-slow" />
      ); // Snow
    return <FaSun size={60} className="text-yellow-400 animate-pulse" />;
  };

  return (
    <div className="w-1/2 flex items-center justify-between px-8 py-5 rounded-4xl bg-white/80 backdrop-blur-md shadow-md border border-gray-100">
      {/* Right Section */}
      <div className="flex items-center gap-8">
        {/* Time */}
        <div className="text-right">
<p className="text-3xl font-bold text-gray-800 tracking-tight">
  {mounted
    ? time.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--"}
</p>
          <p className="text-gray-500 text-sm">
            {mounted
              ? time.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </p>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-200" />

        {/* Weather */}
        {weather && (
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="text-yellow-400 text-3xl">{getWeatherIcon()}</div>

            {/* Weather Info */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                {weather.temperature}°C
              </span>
              <span className="text-sm text-gray-500">
                {getWeatherDescription(weather.weathercode)}
              </span>
              <span className="text-xs text-gray-400">
                Wind {weather.windspeed} m/s
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Optional: Map weathercode to text descriptions
function getWeatherDescription(code: number) {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Cloudy";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  return "Sunny";
}
