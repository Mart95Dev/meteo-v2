import {create} from 'zustand';

interface countryState {
    geo_country: string;
    geo_country_code: string;
    geo_city: string;
    search_country: string;
    search_country_code: string;
    search_city: string;
    setGeoCountry: (geo_country: string) => void;
    setGeoCountryCode: (geo_country_code: string) => void;
    setGeoCity: (geo_city: string) => void;
    setSearchCountry: (search_country: string) => void;
    setSearchCountryCode: (search_country_code: string) => void;
    setSearchCity: (search_city: string) => void;
}

const useCountryStore = create<countryState>((set)=>({
    geo_country: "",
    geo_country_code: "",
    geo_city: "",
    search_country: "",
    search_country_code: "",
    search_city: "",
    setGeoCountry: (geo_country) => set({geo_country}),
    setGeoCountryCode: (geo_country_code) => set({geo_country_code}),
    setGeoCity: (geo_city) => set({geo_city}),
    setSearchCountry: (search_country) => set({search_country}),
    setSearchCountryCode: (search_country_code) => set({search_country_code}),
    setSearchCity: (search_city) => set({search_city}),
}))

export default useCountryStore;