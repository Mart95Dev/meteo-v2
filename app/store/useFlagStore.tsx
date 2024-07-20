import { create } from "zustand";
import Flag from "../components/Flag/Flag";

interface FlagState {
    flag_geolocalisation: string | null;
    no_flag_geolocalisation: React.FC;
    setFlagGeolocalisation: (flag_geolocalisation: string) => void;
    setNoFlagGeolocalisation: (no_flag_geolocalisation: React.FC) => void;
    flag_search: string | null;
    no_flag_search: React.FC;
    setFlagSearch: (flag_search: string) => void;
    setNoFlagSearch: (no_flag_search: React.FC) => void;
}

const useFlagStore = create<FlagState>((set)=>({
  flag_geolocalisation: null,
  no_flag_geolocalisation: Flag,
  setFlagGeolocalisation: (flag_geolocalisation: string) => set({flag_geolocalisation}),
  setNoFlagGeolocalisation: (no_flag_geolocalisation: React.FC) => set({no_flag_geolocalisation}),
  flag_search: null,
  no_flag_search: Flag,
  setFlagSearch: (flag_search: string) => set({flag_search}),
  setNoFlagSearch: (no_flag_search: React.FC) => set({no_flag_search}),
}));

export default useFlagStore;





