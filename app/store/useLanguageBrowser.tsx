import {create} from "zustand";

interface LanguageBrowserState {
    language_browser: string | null;
    setlanguageBrowser: (language_broswer: string) => void;
}

const useLanguageBrowserStore = create<LanguageBrowserState>((set)=>({
    language_browser: null,
    setlanguageBrowser: (language_browser) => set({ language_browser }), 
}));

export default useLanguageBrowserStore;