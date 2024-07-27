import { create } from "zustand";


interface FlagState {
  flag_geolocation: string;
  no_flag_geolocation: boolean;
  setFlagGeolocation: (flag_geolocation: string) => void;
  setNoFlagGeolocation: (no_flag_geolocation: boolean) => void;
  flag_search: string;
  no_flag_search: boolean;
  setFlagSearch: (flag_search: string) => void;
  setNoFlagSearch: (flag_search: boolean) => void;
}

const useFlagStore = create<FlagState>((set) => ({
  flag_geolocation: "",
  no_flag_geolocation: false,
  setFlagGeolocation: (flag_geolocation: string) =>
    set({ flag_geolocation }),
  setNoFlagGeolocation: (no_flag_geolocation: boolean) => set({no_flag_geolocation}),
  flag_search: "",
  no_flag_search: false,

  setFlagSearch: (flag_search: string) => set({ flag_search }),

  setNoFlagSearch: (no_flag_search: boolean) => set({no_flag_search}),

}));

export default useFlagStore;
