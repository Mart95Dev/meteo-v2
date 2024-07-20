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
  language_browser: string | null;
  isGeolocationEnabled: boolean;
  country_code: string;
  country: string | null;
  city: string | null;
  localisationWeather: localisationWeatherData | null;
  setCoordinates: (latitude: number, longitude: number) => void;
  setlanguageBrowser: (language_broswer: string) => void;
  setIsGeolocationEnabled: (isGeolocationEnabled: boolean) => void;

  setCountry: (country: string) => void;
  setCountry_code: (country_code: string) => void;
  setCity: (city: string) => void;
}

const useGeolocationStore = create<GeolocationState>((set) => ({
  localisationWeather: null,
  latitude: null,
  longitude: null,
  language: null,
  isGeolocationEnabled: true,
  country: null,
  country_code: "",
  city: null,
  flag: "",
  no_flag: Flag,
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),
  setLanguage: (language) => set({ language }),
  setIsGeolocationEnabled: (isGeolocationEnabled) =>
    set({ isGeolocationEnabled }),
  setCountry: (country) => set({ country }),
  setCountry_code: (country_code) => set({ country_code }),
  setCity: (city) => set({ city }),
  setlocalisationWeather: (data: localisationWeatherData) =>
    set({ localisationWeather: data }),
}));

export default useGeolocationStore;
