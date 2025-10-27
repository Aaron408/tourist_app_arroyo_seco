import { create } from 'zustand';
import { translations, supportedLanguages } from '../i18n';

export const useLanguageStore = create((set, get) => ({
  currentLanguage: 'es-MX',
  supportedLanguages,
  
  setLanguage: (languageCode) => {
    set({ currentLanguage: languageCode });
    localStorage.setItem('preferredLanguage', languageCode);
  },
  
  // Función t() original (si la necesitas para casos específicos)
  t: (key) => {
    const { currentLanguage } = get();
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  },

  // Devuelve el objeto completo de traducciones
  getTranslations: () => {
    const { currentLanguage } = get();
    return translations[currentLanguage];
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