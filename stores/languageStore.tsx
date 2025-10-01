import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Supported languages
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: 'US'
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: 'MX'
  }
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

interface LanguageState {
  currentLanguage: LanguageCode;
  isLoading: boolean;
  setLanguage: (language: LanguageCode) => void;
  getCurrentLanguage: () => typeof LANGUAGES[LanguageCode];
  getAvailableLanguages: () => typeof LANGUAGES;
  initializeLanguage: () => Promise<void>;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en', // Default language Spanish
      isLoading: true,
      
      setLanguage: (language: LanguageCode) => {
        set({ currentLanguage: language });
      },
      
      getCurrentLanguage: () => {
        const { currentLanguage } = get();
        return LANGUAGES[currentLanguage];
      },
      
      getAvailableLanguages: () => {
        return LANGUAGES;
      },
      
      initializeLanguage: async () => {
        try {
          // Consider add device location for set up language
          // const deviceLocale = Localization.locale;
          set({ isLoading: false });
        } catch (error) {
          console.error('Failed to initialize language:', error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'language-storage', // Storage key
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // Called when the storage is rehydrated
        if (state) {
          state.isLoading = false;
        }
      },
    }
  )
);