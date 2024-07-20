import { create } from "zustand";

interface localisationWeatherData {
  temperature: number;
  icon: string;
  temp_real: number | null;
  temp_feel: number | null;
  rain: number | null;
  wind: number | null;
  humidity: number | null;
}

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;  
  isGeolocationEnabled: boolean;
  country_code: string;
  country: string | null;
  city: string | null;
  localisationWeather: localisationWeatherData | null;
  setCoordinates: (latitude: number, longitude: number) => void;  
  setIsGeolocationEnabled: (isGeolocationEnabled: boolean) => void;
  setCountry: (country: string) => void;
  setCountry_code: (country_code: string) => void;
  setCity: (city: string) => void;
}

const useGeolocationStore = create<GeolocationState>((set) => ({
  localisationWeather: null,
  latitude: null,
  longitude: null,  
  isGeolocationEnabled: true,
  country: null,
  country_code: "",
  city: null,  
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),  
  setIsGeolocationEnabled: (isGeolocationEnabled) =>
    set({ isGeolocationEnabled }),
  setCountry: (country) => set({ country }),
  setCountry_code: (country_code) => set({ country_code }),
  setCity: (city) => set({ city }),
  setlocalisationWeather: (data: localisationWeatherData) =>
    set({ localisationWeather: data }),
}));

export default useGeolocationStore;
