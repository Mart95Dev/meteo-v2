import { create } from "zustand";

export interface locationWeatherData {
  description: string;
  icon: string;
  temp_real: number | null;
  temp_feel: number | null;
  rain: number | string;
  wind: number | null;
  humidity: number | null;
}

interface GeolocationState {
  isGeolocationEnabled: boolean;
  latitude: number | null;
  longitude: number | null;  
  locationWeather: locationWeatherData | null;
  setIsGeolocationEnabled: (isGeolocationEnabled: boolean) => void; 
  setCoordinates: (latitude: number, longitude: number) => void;  
  setLocationWeather: (data: locationWeatherData) => void;
}

const useGeolocationStore = create<GeolocationState>((set, get) => ({
  isGeolocationEnabled: true, 
  locationWeather: null,
  latitude: null,
  longitude: null,  
  setIsGeolocationEnabled: (isGeolocationEnabled) =>
    set({ isGeolocationEnabled }), 
  setCoordinates: (latitude, longitude) => {
    console.log(`Tentative de définition des coordonnées : ${latitude}, ${longitude}`);
    set({ latitude, longitude });
    console.log(`Coordonnées après définition : ${get().latitude}, ${get().longitude}`);
  },  
  setLocationWeather: (data) =>
    set({ locationWeather: data }),
}));

export default useGeolocationStore;