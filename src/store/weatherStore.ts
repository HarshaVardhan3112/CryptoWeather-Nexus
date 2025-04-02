import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WeatherStore = {
  favoriteCities: string[];
  toggleFavorite: (city: string) => void;
  addCity: (city: string) => void;
};

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      favoriteCities: ['New York', 'London', 'Tokyo'],
      toggleFavorite: (city) => set((state) => ({
        favoriteCities: state.favoriteCities.includes(city)
          ? state.favoriteCities.filter(c => c !== city)
          : [...state.favoriteCities, city]
      })),
      addCity: (city) => set((state) => ({
        favoriteCities: Array.from(new Set([...state.favoriteCities, city]))
      })),
    }),
    { name: 'weather-app-storage' }
  )
);