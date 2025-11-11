/**
 * Application Routes
 */
export const ROUTES = {
  // Sessions and Authentication (relative to /administracion)
  LOGIN: 'login',
  LOGOUT: 'logout',
  RECOVERY_PASSWORD: 'recuperar-contrasena',

  // Admin Routes (dashboard / subdomain)
  DASHBOARD: '', // index route

  // Gastronomy (Admin)
  ADMIN_RECIPES: 'gastronomia/recetas',
  ADMIN_INGREDIENTS: 'gastronomia/ingredientes',
  ADMIN_TECHNIQUES: 'gastronomia/tecnicas',
  ADMIN_TOOLS: 'gastronomia/utensilios',

  // Locations (Admin)
  ADMIN_LOCATIONS: 'ubicaciones',

  // Workshops (Admin)
  ADMIN_WORKSHOPS: 'talleres',

  // Users (Admin)
  ADMIN_USERS: 'usuarios',

  // Gastronomy (landing / public)
  GASTRONOMY: '/gastronomia',
  RECIPES: '/gastronomia/recetas',
  INGREDIENTS: '/gastronomia/ingredientes',
  SEASONAL_MONITORING: '/gastronomia/ingredientes/estacional',
  HARVEST_CYCLES: '/gastronomia/ingredientes/cosecha',
  CONSERVATION: '/gastronomia/ingredientes/conservacion',
  CULINARY_TECHNIQUES: '/gastronomia/tecnicas',
  TOOLS: '/gastronomia/herramientas',
  REFERENCE_RESTAURANTS: '/gastronomia/restaurantes',

  // Locations (Public)
  LOCATIONS: '/ubicaciones',
  EMBLEMATIC_PLACES: '/ubicaciones/lugares',
  ROUTE_RESTAURANTS: '/ubicaciones/restaurantes',
  POINTS_OF_INTEREST: '/ubicaciones/puntos',
  INTERACTIVE_SKETCH: '/ubicaciones/croquis',
  CATEGORY_SEARCH: '/ubicaciones/busqueda',
  GOOGLE_MAPS_REDIRECT: '/ubicaciones/mapa',

  // Events (Public)
  EVENTS: '/eventos',
  WORKSHOPS: '/eventos/talleres',
  GUIDED_ROUTES: '/eventos/rutas',
};

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

/**
 * Application Messages
 */
export const MESSAGES = {
  WELCOME: 'Bienvenido a la app turística de Arroyo Seco',
};

/**
 * Pagination Options
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};

/**
 * Form Constants and Enums
 */

// Languages
export const LANGUAGES = [
  { code: 'es-MX', name: 'Español (México)', flag: '🇲🇽' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
];

// Recipe Difficulty Levels
export const DIFFICULTY_LEVELS = [
  { value: 1, label: 'Fácil', color: 'green' },
  { value: 2, label: 'Media', color: 'yellow' },
  { value: 3, label: 'Difícil', color: 'red' },
];

// Measurement Units
export const MEASUREMENT_UNITS = [
  { value: 'gramos', label: 'Gramos (g)' },
  { value: 'kilogramos', label: 'Kilogramos (kg)' },
  { value: 'miligramos', label: 'Miligramos (mg)' },
  { value: 'litros', label: 'Litros (L)' },
  { value: 'mililitros', label: 'Mililitros (ml)' },
  { value: 'tazas', label: 'Tazas' },
  { value: 'cucharadas', label: 'Cucharadas' },
  { value: 'cucharaditas', label: 'Cucharaditas' },
  { value: 'piezas', label: 'Piezas' },
  { value: 'unidades', label: 'Unidades' },
  { value: 'rebanadas', label: 'Rebanadas' },
  { value: 'onzas', label: 'Onzas (oz)' },
  { value: 'libras', label: 'Libras (lb)' },
  { value: 'pizca', label: 'Pizca' },
  { value: 'al gusto', label: 'Al gusto' },
];

/**
 * Helper functions
 */
export const getDifficultyLabel = (value) => {
  return DIFFICULTY_LEVELS.find(d => d.value === value)?.label || 'Desconocido';
};

export const getDifficultyColor = (value) => {
  return DIFFICULTY_LEVELS.find(d => d.value === value)?.color || 'gray';
};

export const getLanguageName = (code) => {
  return LANGUAGES.find(l => l.code === code)?.name || code;
};

export const getLanguageFlag = (code) => {
  return LANGUAGES.find(l => l.code === code)?.flag || '🌐';
};