'use client';
import { useEffect, useState } from 'react';
import { fetchWeather } from '@/lib/weather';
import { useWeatherStore } from '@/store/weatherStore';
import { WeatherSkeleton, WeatherError } from './WeatherUI';
import type { WeatherData } from '@/types/weather';

export function WeatherCard({ city }: { city: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { favoriteCities, toggleFavorite } = useWeatherStore();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [city]);

  if (loading) return <WeatherSkeleton />;
  if (error) return <WeatherError onRetry={fetchData} />;

  return (
    <div className="bg-white/80 dark:bg-gray-800 p-4 rounded-lg shadow relative transition-all hover:shadow-md">
      <button
        onClick={() => toggleFavorite(city)}
        className="absolute top-3 right-3 text-xl hover:scale-110 transition-transform"
        aria-label={favoriteCities.includes(city) ? 'Remove favorite' : 'Add favorite'}
      >
        {favoriteCities.includes(city) ? '❤️' : '🤍'}
      </button>

      <h3 className="text-xl font-semibold">
        {weather?.name}, {weather?.sys?.country}
      </h3>

      <div className="flex items-center justify-between mt-2">
        <span className="text-3xl font-bold">
          {weather?.main?.temp !== undefined ? Math.round(weather.main.temp) : '--'}°C
        </span>
        {weather?.weather?.[0]?.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description || 'Weather icon'}
            className="w-16 h-16"
          />
        )}
      </div>

      <p className="capitalize mt-1 text-gray-600 dark:text-gray-300">
        {weather?.weather?.[0]?.description}
      </p>

      <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
        <p>Humidity: {weather?.main?.humidity ?? '--'}%</p>
        <p>Wind: {weather?.wind?.speed ?? '--'} m/s</p>
        <p>Min: {Math.round(weather?.main?.temp_min ?? 0)}°C</p>
        <p>Max: {Math.round(weather?.main?.temp_max ?? 0)}°C</p>
      </div>
    </div>
  );
}