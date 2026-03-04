import React, { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";

interface WeatherData {
  temperature: number;
  location: string;
  description: string;
}

export const Navbarhelper = () => {
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 6000);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const api = "fb26d42567c249219f003feec2332c90";
      const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api}`;
      console.log(WEATHER_API_URL);
      try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();

        setWeather({
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          location: data.name,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    });
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar-helper">
      <span>
        <MdOutlineDateRange /> {time}
      </span>

      {weather && (
        <div>
          <p>{weather.temperature}°C</p>
          <p>{weather.description}</p>
          <p>{weather.location}</p>
        </div>
      )}
    </div>
  );
};
