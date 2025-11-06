/**
 * API Base URLs
 */
export const API_BASE_URL = 'https://vps-master.duckdns.org';
export const AUTH_API_URL = 'https://vps-master.duckdns.org/authMS';
export const GASTRONOMY_API_URL = 'https://vps-master.duckdns.org/gastronomyMS';

/**
 * API Configuration
 */
export const API_TIMEOUT = 10000; // 10 seconds

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

/**
 * Application Routes
 */
export const ROUTES = {
  // Home
  HOME: '/',
  
  // Legal pages - Spanish
  POLICY_SPANISH: '/aviso-de-privacidad',
  TERMS_SPANISH: '/terminos-y-condiciones',
  
  // Legal pages - English
  POLICY_ENGLISH: '/privacy-policy',
  TERMS_ENGLISH: '/terms-and-conditions',
};