import { create } from 'zustand';

export const useLanguageStore = create((set) => ({
  currentLanguage: 'es-MX', //Idioma por defecto
  
  //Lista de idiomas soportados
  supportedLanguages: [
    { code: 'es-MX', name: 'Español (México)' },
    { code: 'en-US', name: 'English (US)' }
  ],
  
  //Traducciones
  translations: {
    'es-MX': {
      welcomeMessage: 'Bienvenido a la aplicación turística de Arroyo Seco',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      explore: 'Explorar',
      settings: 'Configuración'
    },
    'en-US': {
      welcomeMessage: 'Welcome to the Arroyo Seco tourist app',
      login: 'Log in',
      register: 'Sign up',
      explore: 'Explore',
      settings: 'Settings'
    }
  },
  
  //Cambiar el idioma actual
  setLanguage: (languageCode) => {
    set({ currentLanguage: languageCode });
    localStorage.setItem('preferredLanguage', languageCode);
  },
  
  //Obtener una traducción
  t: (key) => {
    const state = useLanguageStore.getState();
    return state.translations[state.currentLanguage]?.[key] || key;
  },
  
  //Inicializar el idioma desde localStorage
  initializeLanguage: () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      set({ currentLanguage: savedLanguage });
    } else {
      //Obtener el idioma del navegador como alternativa
      const browserLanguage = navigator.language;
      const languageToUse = useLanguageStore.getState().supportedLanguages
        .find(lang => browserLanguage.startsWith(lang.code.split('-')[0]))?.code || 'es-MX';
      
      set({ currentLanguage: languageToUse });
    }
  }
}));