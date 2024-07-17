import {create} from 'zustand';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  language: string | null;
  isGeolocationEnabled: boolean;
  flag: string;
  country_code: string | null;
  country: string | null;
  city: string | null;
  icon: string;
  temp_real: number | null;
  temp_feel: number | null;
  rain: number | null;
  wind: number | null;
  humidity: number | null;
  setCoordinates: (latitude: number, longitude: number) => void;
  setLanguage: (language: string) => void;
  setIsGeolocationEnabled: (isGeolocationEnabled: boolean)=> void;
  setFlag: (flag: string) => void;
  setCountry: (country: string) => void;
  setCountry_code: (country_code: string)=> void;
  setCity: (city: string) => void;
  setIcon: (icon: string) => void;
  setTempReal: (temp_real: number) => void;
  setTempFeel: (temp_feel: number) => void;
  setRain: (rain: number) => void;
  setWind: (wind: number) => void;
  setHumidity: (humidity: number) => void;
}

const useGeolocationStore = create<GeolocationState>((set) => ({
  latitude: null,
  longitude: null,
  language: null,
  isGeolocationEnabled: true,
  flag: "",
  country: null,
  country_code: null,
  city: null,
  icon: "",
  temp_real: null,
  temp_feel: null,
  rain: null,
  wind: null,
  humidity: null,
  setCoordinates: (latitude, longitude) => set({ latitude, longitude }),
  setLanguage: (language)=> set({language}),
  setIsGeolocationEnabled: (isGeolocationEnabled)=>set({isGeolocationEnabled}),
  setFlag: (flag) => set({ flag }),
  setCountry: (country) => set({ country }),
  setCity: (city) => set({ city }),
  setIcon: (icon) => set({ icon }),
  setTempReal: (temp_real) => set({ temp_real }),
  setTempFeel: (temp_feel) => set({ temp_feel }),
  setRain: (rain) => set({ rain }),
  setWind: (wind) => set({ wind }),
  setHumidity: (humidity) => set({ humidity }),
  setCountry_code: (country_code)=> set({country_code})
}));

export default useGeolocationStore;

