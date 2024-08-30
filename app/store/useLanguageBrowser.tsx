import { create } from 'zustand';

interface LanguageBrowserState {
  language_browser: string | null;
  setLanguageBrowser: (lang: string) => void;
}

const useLanguageBrowserStore = create<LanguageBrowserState>((set) => ({
  language_browser: null,
  setLanguageBrowser: (lang) => {
    console.log("Langue détectée:", lang);
    set({ language_browser: lang });
  },
}));

// Ajoutez cette fonction d'initialisation
export const initializeLanguageBrowser = () => {
  const store = useLanguageBrowserStore.getState();
  const detectedLanguage = navigator.language || (navigator as any).userLanguage;
  console.log("Langue du navigateur détectée:", detectedLanguage);
  store.setLanguageBrowser(detectedLanguage);
};

export default useLanguageBrowserStore;