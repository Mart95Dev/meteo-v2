import {create} from 'zustand';
import { persist } from 'zustand/middleware';

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
  setFlag: (flag: string) => void;
  setCountry: (country: string) => void;
  setCity: (city: string) => void;
  setIcon: (icon: string) => void;
  setTempReal: (temp_real: number) => void;
  setTempFeel: (temp_feel: number) => void;
  setRain: (rain: number) => void;
  setWind: (wind: number) => void;
  setHumidity: (humidity: number) => void;
 }

 interface WeatherState {
  currentWeather: WeatherData | null;
  searchHistory: WeatherData[];
  setWeatherData: (data: WeatherData) => void;
  addSearchHistory: (data: WeatherData) => void;
  // ... autres actions éventuelles
}

const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      currentWeather: null,
      searchHistory: [],
      setWeatherData: (data) => set({ currentWeather: data }),
      addSearchHistory: (data) => set((state) => ({ searchHistory: [...state.searchHistory, data] })),
    }),
    {
      name: 'weather-storage', // Persister uniquement l'historique de recherche
      partialize: (state) => ({ searchHistory: state.searchHistory }), // Sérialiser uniquement searchHistory
    }
  )
);

export default useWeatherStore;
