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
 * Rutas de administración
 */
export const ROUTES = {
  LOGIN: '', // Ruta base /administracion (login)
  HOME: 'home', // /administracion/home
};

/**
 * Mensajes de la aplicación
 */
export const MESSAGES = {
  WELCOME: 'Bienvenido al panel de administración',
  LOGIN_SUCCESS: 'Has iniciado sesión correctamente',
  LOGOUT_SUCCESS: 'Has cerrado sesión correctamente',
};

/**
 * Opciones de paginación
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};