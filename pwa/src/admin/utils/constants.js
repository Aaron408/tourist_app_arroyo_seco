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


// Rutas de administración (dashboard / subdominio)
export const ROUTES = {
  DASHBOARD: "admin",

  // Catálogos
  ADMIN_CATALOGOS: "catalogos",
  ADMIN_RECETAS: "catalogos/recetas",
  ADMIN_INGREDIENTES: "catalogos/ingredientes",
  ADMIN_TECNICAS: "catalogos/tecnicas",
  ADMIN_HERRAMIENTAS: "catalogos/herramientas",
  ADMIN_UBICACIONES: "catalogos/ubicaciones",

  // Eventos
  ADMIN_EVENTOS: "eventos",
  ADMIN_TALLERES: "eventos/talleres",
  ADMIN_RUTAS: "eventos/rutas",

  // Otros
  ADMIN_TRADUCCIONES: "traducciones",
  ADMIN_FEEDBACK: "feedback",
  ADMIN_USUARIOS: "usuarios",
  ADMIN_MONITOREO: "estadisticas",

  // Sesiones y autenticación
  LOGIN: "login",
  LOGOUT: "logout",
  RECOVERY_PASSWORD: "recuperar-contrasena",
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