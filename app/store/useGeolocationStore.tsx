import { create } from "zustand";

interface locationWeatherData {
  description: string;
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
  locationWeather: locationWeatherData | null;
  setCoordinates: (latitude: number, longitude: number) => void;  
  setIsGeolocationEnabled: (isGeolocationEnabled: boolean) => void; 
  setLocationWeather: (data: locationWeatherData) => void;
}

const useGeolocationStore = create<GeolocationState>((set) => ({
  locationWeather: null,
  latitude: null,
  longitude: null,  
  isGeolocationEnabled: true, 
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),  
  setIsGeolocationEnabled: (isGeolocationEnabled) =>
    set({ isGeolocationEnabled }), 
  setLocationWeather: (data) =>
    set({ locationWeather: data }),
}));

export default useGeolocationStore;
