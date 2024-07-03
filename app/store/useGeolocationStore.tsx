import {create} from 'zustand';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  language: string;
  city: string | null;
  setCoordinates: (latitude: number, longitude: number) => void;
  setLanguage: (language: string) => void;
  setCity: (city: string) => void
}

const useGeolocationStore = create<GeolocationState>((set) => ({
  latitude: null,
  longitude: null,
  language: "",
  city: null,
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),
  setLanguage: (language)=> set({language}),
  setCity: (city)=> set({city})
}));

export default useGeolocationStore;

