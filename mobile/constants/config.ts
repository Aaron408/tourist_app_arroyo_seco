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
    ? (Platform.OS === 'android' ? 'http://192.168.100.6:3000' : 'http://192.168.100.6:3000')
    : 'https://your-production-api.com',
  
  // URL de producción
  PROD_URL: 'https://your-production-api.com',
  
  // Timeout para las peticiones (en ms)
  TIMEOUT: 10000,
};

import { Platform } from 'react-native';

// Export base URL según el entorno
export const API_BASE_URL = __DEV__ ? API_CONFIG.DEV_URL : API_CONFIG.PROD_URL;
