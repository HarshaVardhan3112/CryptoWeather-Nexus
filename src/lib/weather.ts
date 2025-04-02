import type { WeatherData } from '@/types/weather';
import axios from 'axios';

export const fetchWeather = async (city: string) => {
  console.log('ENV KEY:', process.env.NEXT_PUBLIC_WEATHER_API_KEY ? '***' + process.env.NEXT_PUBLIC_WEATHER_API_KEY.slice(-3) : 'MISSING');

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
  );
  return response.data;
};