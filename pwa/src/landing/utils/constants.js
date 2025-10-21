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
 * Rutas de la aplicación landing
 */
export const ROUTES = {
  HOME: "/",

  // Gastronomía
  GASTRONOMIA: "/gastronomia",
  RECETAS: "/gastronomia/recetas",
  INGREDIENTES: "/gastronomia/ingredientes",
  MONITOREO_ESTACIONAL: "/gastronomia/ingredientes/estacional",
  CICLOS_COSECHA: "/gastronomia/ingredientes/cosecha",
  CONSERVACION: "/gastronomia/ingredientes/conservacion",
  TECNICAS_CULINARIAS: "/gastronomia/tecnicas",
  HERRAMIENTAS: "/gastronomia/herramientas",
  RESTAURANTES_REFERENCIA: "/gastronomia/restaurantes",

  // Ubicaciones
  UBICACIONES: "/ubicaciones",
  LUGARES_EMBLEMATICOS: "/ubicaciones/lugares",
  RESTAURANTES_RUTA: "/ubicaciones/restaurantes",
  PUNTOS_INTERES: "/ubicaciones/puntos",
  CROQUIS_INTERACTIVO: "/ubicaciones/croquis",
  BUSQUEDA_CATEGORIA: "/ubicaciones/busqueda",
  GOOGLE_MAPS_REDIRECT: "/ubicaciones/mapa",

  // Eventos
  EVENTOS: "/eventos",
  TALLERES: "/eventos/talleres",
  RUTAS_GUIADAS: "/eventos/rutas",
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