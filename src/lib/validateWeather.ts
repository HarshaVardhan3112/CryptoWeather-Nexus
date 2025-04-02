import type { WeatherData } from '@/types/weather';

export function isWeatherData(data: any): data is WeatherData {
  return (
    typeof data?.name === 'string' &&
    typeof data?.main?.temp === 'number' &&
    Array.isArray(data?.weather)
  );
}

export function validateWeatherData(data: any): WeatherData {
  if (!isWeatherData(data)) {
    throw new Error('Invalid weather data format');
  }
  return data;
}