import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WeatherData {
  id: number;
  date: string;
  temperature: number;
  flag: string;
  country: string | null;
  city: string | null;
  icon: string;
  temp_real: number | null;
  temp_feel: number | null;
  rain: number | null;
  wind: number | null;
  humidity: number | null;
}

interface WeatherState {
  currentWeather: WeatherData | null;
  searchHistory: WeatherData[];
}

const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      currentWeather: null,
      searchHistory: [],
      setWeatherData: (data: WeatherData) => set({ currentWeather: data }),
      addSearchHistory: (data: WeatherData) =>
        set((state) => ({ searchHistory: [...state.searchHistory, data] })),
    }),
    {
      name: "weather-storage", // Persister uniquement l'historique de recherche
      partialize: (state) => ({ searchHistory: state.searchHistory }), // Sérialiser uniquement searchHistory
    }
  )
);

export default useWeatherStore;
