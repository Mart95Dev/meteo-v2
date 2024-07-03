import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WeatherDataSearch {
  id: number,
  date: string,
  city: string,
  country: string,
  temperature: number,
  wind: number
  
}

interface WeatherState {
  searchHistory: WeatherDataSearch[]; // Tableau pour l'historique de recherche
  addSearchData: (data: WeatherDataSearch) => void;
}

const useSearchHistory = create<WeatherState>()(
  persist(
    (set) => ({
      searchHistory: [],
      addSearchData: (data) =>
        set((state) => ({ searchHistory: [...state.searchHistory, data] })),
    }),
    {
      name: "weather-storage",
    }
  )
);

export default useSearchHistory;
