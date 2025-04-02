// src/app/dashboard/page.tsx
'use client'; // Required for Zustand and interactivity

import { useWeatherStore } from '@/store/weatherStore';
import { CitySearch } from '@/components/CitySearch';
import { WeatherCard } from '@/components/WeatherCard';
import { useEffect, useState } from 'react';
import { fetchWeather } from '@/lib/weather';
import { WeatherSkeleton } from '@/components/WeatherUI';

export default function WeatherSection() {
  const { favoriteCities, addCity } = useWeatherStore();
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pre-fetch weather for all favorite cities on first load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Optional: Pre-load data here if needed
        await Promise.all(favoriteCities.map(fetchWeather));
        setInitialLoading(false);
      } catch (err) {
        setError('Failed to load initial weather data');
        setInitialLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleAddCity = async (city: string) => {
    try {
      // Validate city exists by attempting to fetch
      await fetchWeather(city);
      addCity(city);
      setError(null);
    } catch (err) {
      setError(`City "${city}" not found`);
      setTimeout(() => setError(null), 3000);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <WeatherSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      <CitySearch onAddCity={handleAddCity} disabled={initialLoading} />

      {favoriteCities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No cities added yet. Search for a city above!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteCities.map((city) => (
            <WeatherCard key={city} city={city} />
          ))}
        </div>
      )}
    </div>
  );
}