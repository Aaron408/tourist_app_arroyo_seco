/**
 * Constantes de la API
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.arroyoseco-app.com';
export const API_TIMEOUT = 10000; // 10 segundos

/**
 * Códigos de estado HTTP
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
 * Configuración del mapa
 */
export const MAP_CONFIG = {
  CENTER: [21.5470145, -99.6907782], // Centro en la Presidencia Municipal de Arroyo Seco
  ZOOM: 13,
  MAX_ZOOM: 18,
  MIN_ZOOM: 10
};

/**
 * Tipos de ubicaciones
 */
export const LOCATION_TYPES = {
  RESTAURANT: 'restaurant',
  EVENT: 'event',
  LANDMARK: 'landmark',
  MARKET: 'market',
  WORKSHOP: 'workshop'
};

/**
 * Rutas de la aplicación landing
 */
export const ROUTES = {
  HOME: "/",

  // Gastronomía
  GASTRONOMY: "/gastronomia",
  RECIPES: "/gastronomia/recetas",
  INGREDIENTS: "/gastronomia/ingredientes",
  SEASONAL_MONITORING: "/gastronomia/ingredientes/estacional",
  HARVEST_CYCLES: "/gastronomia/ingredientes/cosecha",
  CONSERVATION: "/gastronomia/ingredientes/conservacion",
  CULINARY_TECHNIQUES: "/gastronomia/tecnicas",
  TOOLS: "/gastronomia/herramientas",
  REFERENCE_RESTAURANTS: "/gastronomia/restaurantes",

  // Ubicaciones
  LOCATIONS: "/ubicaciones",
  EMBLEMATIC_PLACES: "/ubicaciones/lugares",
  ROUTE_RESTAURANTS: "/ubicaciones/restaurantes",
  POINTS_OF_INTEREST: "/ubicaciones/puntos",
  INTERACTIVE_SKETCH: "/ubicaciones/croquis",
  CATEGORY_SEARCH: "/ubicaciones/busqueda",
  GOOGLE_MAPS_REDIRECT: "/ubicaciones/mapa",

  // Eventos
  EVENTS: "/eventos",
  FLAVOR_ROUTE: "/eventos/ruta-del-sabor",
  WORKSHOPS: "/eventos/talleres",
};

/**
 * Mensajes de la aplicación
 */
export const MESSAGES = {
  WELCOME: 'Bienvenido a la app turística de Arroyo Seco',
};

/**
 * Opciones de paginación
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};