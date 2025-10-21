import { create } from 'zustand';

export const useLanguageStore = create((set) => ({
  currentLanguage: 'es-MX',
  
  supportedLanguages: [
    { code: 'es-MX', name: 'Español (México)' },
    { code: 'en-US', name: 'English (US)' }
  ],
  
  translations: {
    'es-MX': {
      // Dashboard
      dashboard: 'Panel de Control',
      welcomeAdmin: 'Bienvenido al Panel de Administración',
      overview: 'Resumen',
      adminPanel: 'Panel de Administración',
      
      // Catalogs
      catalogs: 'Catálogos',
      recipes: 'Recetas',
      ingredients: 'Ingredientes',
      techniques: 'Técnicas',
      tools: 'Herramientas',
      locations: 'Ubicaciones',
      
      // Events
      events: 'Eventos',
      workshops: 'Talleres',
      routes: 'Rutas',
      
      // Others
      translations: 'Traducciones',
      feedback: 'Retroalimentación',
      users: 'Usuarios',
      monitoring: 'Monitoreo',
      statistics: 'Estadísticas',
      
      // Auth
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      loginTitle: 'Bienvenido de vuelta',
      loginSubtitle: 'Ingresa tus credenciales para acceder al panel',
      loginButton: 'Iniciar Sesión',
      invalidCredentials: 'Credenciales incorrectas',
      testCredentials: 'Credenciales de prueba',
      pleaseCompleteAllFields: 'Por favor completa todos los campos',
      loggingIn: 'Iniciando sesión...',
      accessProblems: '¿Problemas para acceder? Contacta al administrador',
      
      // Actions
      add: 'Agregar',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      search: 'Buscar',
      filter: 'Filtrar',
      export: 'Exportar',
      import: 'Importar',
      view: 'Ver',
      create: 'Crear',
      update: 'Actualizar',
      
      // Messages
      loading: 'Cargando...',
      noData: 'No hay datos disponibles',
      error: 'Error',
      success: 'Éxito',
      warning: 'Advertencia',
      info: 'Información',
      
      // Common
      actions: 'Acciones',
      status: 'Estado',
      active: 'Activo',
      inactive: 'Inactivo',
      date: 'Fecha',
      name: 'Nombre',
      description: 'Descripción',
      image: 'Imagen',
      category: 'Categoría',
      
      // Navigation
      home: 'Inicio',
      back: 'Volver',
      next: 'Siguiente',
      previous: 'Anterior',
    },
    'en-US': {
      // Dashboard
      dashboard: 'Dashboard',
      welcomeAdmin: 'Welcome to Admin Panel',
      overview: 'Overview',
      adminPanel: 'Admin Panel',
      
      // Catalogs
      catalogs: 'Catalogs',
      recipes: 'Recipes',
      ingredients: 'Ingredients',
      techniques: 'Techniques',
      tools: 'Tools',
      locations: 'Locations',
      
      // Events
      events: 'Events',
      workshops: 'Workshops',
      routes: 'Routes',
      
      // Others
      translations: 'Translations',
      feedback: 'Feedback',
      users: 'Users',
      monitoring: 'Monitoring',
      statistics: 'Statistics',
      
      // Auth
      login: 'Log In',
      logout: 'Log Out',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember Me',
      forgotPassword: 'Forgot your password?',
      loginTitle: 'Welcome back',
      loginSubtitle: 'Enter your credentials to access the panel',
      loginButton: 'Log In',
      invalidCredentials: 'Invalid credentials',
      testCredentials: 'Test Credentials',
      pleaseCompleteAllFields: 'Please complete all fields',
      loggingIn: 'Logging in...',
      accessProblems: 'Access problems? Contact the administrator',
      
      // Actions
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      view: 'View',
      create: 'Create',
      update: 'Update',
      
      // Messages
      loading: 'Loading...',
      noData: 'No data available',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      
      // Common
      actions: 'Actions',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      date: 'Date',
      name: 'Name',
      description: 'Description',
      image: 'Image',
      category: 'Category',
      
      // Navigation
      home: 'Home',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
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