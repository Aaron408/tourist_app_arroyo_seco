/**
 * Configuración de la aplicación
 */

// URL base del backend
const BASE_URL = 'https://vps-master.duckdns.org';

// Configuración de la API
export const API_CONFIG = {
  // URL base del servidor
  BASE_URL: BASE_URL,

  // Timeout para las peticiones (en ms)
  TIMEOUT: 10000,

  // Rutas de los microservicios
  SERVICES: {
    AUTH: `${BASE_URL}/authMS`,
    GASTRONOMY: `${BASE_URL}/gastronomyMS`,
    WORKSHOPS: `${BASE_URL}/workshopMS`,
    REVIEWS: `${BASE_URL}/reviewMS`,
    LOCATIONS: `${BASE_URL}/locationMS`,
    CONTENT: `${BASE_URL}/contentMS`,
    RECIPES: `${BASE_URL}/recipeMS`,
    RESTAURANTS: `${BASE_URL}/restaurantMS`,
  },
};

// Export base URL (para retrocompatibilidad)
export const API_BASE_URL = API_CONFIG.SERVICES.AUTH;