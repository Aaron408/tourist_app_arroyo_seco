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
 * Rutas de la aplicación
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EXPLORE: '/explore',
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAIL: '/restaurants/:id',
  ATTRACTIONS: '/attractions',
  ATTRACTION_DETAIL: '/attractions/:id',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

/**
 * Mensajes de la aplicación
 */
export const MESSAGES = {
  WELCOME: 'Bienvenido a la app turística de Arroyo Seco',
  LOGIN_SUCCESS: 'Has iniciado sesión correctamente',
  LOGOUT_SUCCESS: 'Has cerrado sesión correctamente',
  REGISTER_SUCCESS: 'Te has registrado correctamente',
};

/**
 * Opciones de paginación
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};