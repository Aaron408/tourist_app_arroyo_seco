import { create } from 'zustand';
import { translations, supportedLanguages } from '../i18n';

export const useLanguageStore = create((set, get) => ({
  currentLanguage: 'es-MX',
  supportedLanguages,
  
  setLanguage: (languageCode) => {
    set({ currentLanguage: languageCode });
    localStorage.setItem('preferredLanguage', languageCode);
  },
  
  t: (key) => {
    const { currentLanguage } = get();
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  },
  
  initializeLanguage: () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      set({ currentLanguage: savedLanguage });
    } else {
      const browserLanguage = navigator.language;
      const languageToUse = supportedLanguages
        .find(lang => browserLanguage.startsWith(lang.code.split('-')[0]))?.code || 'es-MX';
      
      set({ currentLanguage: languageToUse });
    }
  }
}));