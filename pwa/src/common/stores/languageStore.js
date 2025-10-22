import { create } from 'zustand';

export const useLanguageStore = create((set) => ({
  currentLanguage: 'es-MX',
  
  supportedLanguages: [
    { code: 'es-MX', name: 'Español (México)' },
    { code: 'en-US', name: 'English (US)' }
  ],
  
  translations: {
    'es-MX': {
      // Common translations shared across modules
      welcome: 'Bienvenido',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      home: 'Inicio',
      about: 'Acerca de',
      contact: 'Contacto',
      language: 'Idioma',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      search: 'Buscar',
      filter: 'Filtrar',
      yes: 'Sí',
      no: 'No',
      ok: 'Aceptar',
      close: 'Cerrar',
    },
    'en-US': {
      welcome: 'Welcome',
      login: 'Log in',
      logout: 'Log out',
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      language: 'Language',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      close: 'Close',
    }
  },
  
  setLanguage: (languageCode) => {
    set({ currentLanguage: languageCode });
    localStorage.setItem('preferredLanguage', languageCode);
  },
  
  t: (key) => {
    const state = useLanguageStore.getState();
    return state.translations[state.currentLanguage]?.[key] || key;
  },
  
  initializeLanguage: () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      set({ currentLanguage: savedLanguage });
    } else {
      const browserLanguage = navigator.language;
      const languageToUse = useLanguageStore.getState().supportedLanguages
        .find(lang => browserLanguage.startsWith(lang.code.split('-')[0]))?.code || 'es-MX';
      
      set({ currentLanguage: languageToUse });
    }
  }
}));