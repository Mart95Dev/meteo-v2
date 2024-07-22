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
  city: string | null;
  localisationWeather: localisationWeatherData | null;
  setCoordinates: (latitude: number, longitude: number) => void;  
  setIsGeolocationEnabled: (isGeolocationEnabled: boolean) => void; 
  setCity: (city: string) => void;
}

const useGeolocationStore = create<GeolocationState>((set) => ({
  localisationWeather: null,
  latitude: null,
  longitude: null,  
  isGeolocationEnabled: true, 
  city: null,  
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),  
  setIsGeolocationEnabled: (isGeolocationEnabled) =>
    set({ isGeolocationEnabled }), 
  setCity: (city) => set({ city }),
  setlocalisationWeather: (data: localisationWeatherData) =>
    set({ localisationWeather: data }),
}));

export default useGeolocationStore;
