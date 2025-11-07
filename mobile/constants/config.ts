/**
 * Configuración de la aplicación
 */

// URL del backend - Ajusta según tu entorno
export const API_CONFIG = {
  // Para desarrollo local
  // Android Emulator: usa 10.0.2.2 para acceder a localhost del host
  // iOS Simulator: usa localhost
  // Dispositivo físico: usa la IP de tu computadora en la red local
  DEV_URL: __DEV__ 
    ? 'https://vps-master.duckdns.org/authMS/'
    : 'https://vps-master.duckdns.org/authMS/',
  
  // URL de producción
  PROD_URL: 'https://vps-master.duckdns.org/authMS/',
  
  // Timeout para las peticiones (en ms)
  TIMEOUT: 10000,
};

// Export base URL según el entorno
export const API_BASE_URL = __DEV__ ? API_CONFIG.DEV_URL : API_CONFIG.PROD_URL;
