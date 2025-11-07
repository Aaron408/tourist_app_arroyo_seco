import Constants from 'expo-constants';

/**
 * Configuración de la aplicación
 * 
 * Lee la configuración desde app.json (extra) o usa valores por defecto
 * Soporta múltiples microservicios bajo la misma URL base
 * 
 * Estructura:
 * - apiBaseUrl: URL raíz del servidor (ej: https://vps-master.duckdns.org)
 * - services: Diccionario de microservicios con sus rutas específicas
 *   - auth: Servicio de autenticación
 *   - content: Servicio de contenido
 *   - recipes: Servicio de recetas
 *   - restaurants: Servicio de restaurantes
 */

const appConfig = Constants.expoConfig?.extra || {};

// URL base del backend (sin path de servicio)
export const API_BASE_URL = appConfig.apiBaseUrl || 'https://vps-master.duckdns.org';

// Timeout para las peticiones (en ms)
export const API_TIMEOUT = appConfig.apiTimeout || 10000;

// Versión de API
export const API_VERSION = appConfig.apiVersion || '1.0.0';

/**
 * Configuración de los microservicios
 * Cada servicio tiene su propia ruta bajo el mismo dominio
 * 
 * Basado en el Microservices Standard:
 * - Auth Users MS (puerto 5357): /authMS/
 * - Workshops MS (puerto 5126): /workshopMS/
 * - Reviews MS (puerto 6061): /reviewMS/
 * - Gastronomy MS (puerto 5199): /gastronomyMS/
 * - Locations MS (puerto 5888): /locationMS/
 */
export const API_SERVICES = appConfig.services || {
  auth: {
    path: '/authMS',
    port: 5357,
    version: '1.0.0',
    timeout: 10000,
    description: 'Servicio de autenticación y manejo de usuarios',
  },
  workshops: {
    path: '/workshopMS',
    port: 5126,
    version: '1.0.0',
    timeout: 10000,
    description: 'Gestión de talleres (workshops)',
  },
  reviews: {
    path: '/reviewMS',
    port: 6061,
    version: '1.0.0',
    timeout: 10000,
    description: 'Sistema de reseñas y calificaciones',
  },
  gastronomy: {
    path: '/gastronomyMS',
    port: 5199,
    version: '1.0.0',
    timeout: 10000,
    description: 'Gestión de gastronomía y menús',
  },
  locations: {
    path: '/locationMS',
    port: 5888,
    version: '1.0.0',
    timeout: 10000,
    description: 'Administración de ubicaciones y zonas',
  },
  content: {
    path: '/contentMS',
    version: '1.0.0',
    timeout: 10000,
    description: 'Servicio de contenido',
  },
  recipes: {
    path: '/recipeMS',
    version: '1.0.0',
    timeout: 10000,
    description: 'Servicio de recetas',
  },
  restaurants: {
    path: '/restaurantMS',
    version: '1.0.0',
    timeout: 10000,
    description: 'Servicio de restaurantes',
  },
};

/**
 * Construir URL completa para un servicio
 * @param serviceName - Nombre del servicio (auth, content, recipes, restaurants)
 * @param endpoint - Ruta del endpoint (ej: /login, /recipes)
 * @returns URL completa del endpoint
 */
export const buildServiceUrl = (serviceName: keyof typeof API_SERVICES, endpoint: string): string => {
  const service = API_SERVICES[serviceName];
  if (!service) {
    console.warn(`⚠️ Servicio no encontrado: ${String(serviceName)}`);
    return `${API_BASE_URL}${endpoint}`;
  }
  return `${API_BASE_URL}${service.path}${endpoint}`;
};

/**
 * Obtener timeout para un servicio específico
 * @param serviceName - Nombre del servicio
 * @returns Timeout en ms
 */
export const getServiceTimeout = (serviceName: keyof typeof API_SERVICES): number => {
  const service = API_SERVICES[serviceName];
  return service?.timeout || API_TIMEOUT;
};

// Configuración de API (compatibilidad con código existente)
export const API_CONFIG = {
  DEV_URL: __DEV__ 
    ? `${API_BASE_URL}${API_SERVICES.auth.path}`
    : 'https://your-production-api.com',
  
  PROD_URL: 'https://your-production-api.com',
  
  TIMEOUT: API_TIMEOUT,
};

// Features de la aplicación
export const APP_FEATURES = appConfig.features || {
  offlineSupport: true,
  pushNotifications: false,
  locationServices: true,
  cameraSupport: true,
};

// Información para App Stores
export const APP_STORE_INFO = appConfig.appStore || {
  category: 'Travel & Local',
  contentRating: '4+',
  minAge: 4,
};
