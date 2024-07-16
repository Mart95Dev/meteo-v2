import {create} from 'zustand';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  language: string | null;
  city: string | null;
  country: string | null;
  setCoordinates: (latitude: number, longitude: number) => void;
  setLanguage: (language: string) => void;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
}

const useGeolocationStore = create<GeolocationState>((set) => ({
  latitude: null,
  longitude: null,
  language: null,
  city: null,
  country: null,
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),
  setLanguage: (language)=> set({language}),
  setCity: (city)=> set({city}),
  setCountry: (country)=> set({country})
}));

export default useGeolocationStore;

