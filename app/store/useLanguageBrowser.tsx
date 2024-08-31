import { create } from 'zustand';

interface LanguageBrowserState {
  language_browser: string | null;
  setLanguageBrowser: (lang: string) => void;
}

const useLanguageBrowserStore = create<LanguageBrowserState>((set) => ({
  language_browser: null,
  setLanguageBrowser: (lang) => {
    set({ language_browser: lang });
  },
}));

export default useLanguageBrowserStore;