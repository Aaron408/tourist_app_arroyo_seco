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

  // Catalogs
  ADMIN_CATALOGS: 'catalogos',
  ADMIN_RECIPES: 'catalogos/recetas',
  ADMIN_INGREDIENTS: 'catalogos/ingredientes',
  ADMIN_TECHNIQUES: 'catalogos/tecnicas',
  ADMIN_TOOLS: 'catalogos/herramientas',
  ADMIN_LOCATIONS: 'catalogos/ubicaciones',

  // Admin Events
  ADMIN_EVENTS: 'eventos',
  ADMIN_WORKSHOPS: 'eventos/talleres',
  ADMIN_ROUTES: 'eventos/rutas',

  // Others
  ADMIN_TRANSLATIONS: 'traducciones',
  ADMIN_FEEDBACK: 'feedback',
  ADMIN_USERS: 'usuarios',
  ADMIN_MONITORING: 'estadisticas',

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

  // Locations
  LOCATIONS: '/ubicaciones',
  EMBLEMATIC_PLACES: '/ubicaciones/lugares',
  ROUTE_RESTAURANTS: '/ubicaciones/restaurantes',
  POINTS_OF_INTEREST: '/ubicaciones/puntos',
  INTERACTIVE_SKETCH: '/ubicaciones/croquis',
  CATEGORY_SEARCH: '/ubicaciones/busqueda',
  GOOGLE_MAPS_REDIRECT: '/ubicaciones/mapa',

  // Events
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
