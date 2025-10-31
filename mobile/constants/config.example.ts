/**
 * Ejemplo de configuración de entorno
 * Copia este archivo y ajusta las URLs según tu entorno
 */

import { Platform } from 'react-native';

// Configuración de desarrollo
const DEV_CONFIG = {
  // Para Android Emulator, usa 10.0.2.2 para acceder a localhost del host
  ANDROID_EMULATOR: 'http://10.0.2.2:3000',
  
  // Para iOS Simulator, usa localhost
  IOS_SIMULATOR: 'http://localhost:3000',
  
  // Para dispositivo físico, usa tu IP local en la red
  // Ejemplo: 'http://192.168.1.5:3000'
  PHYSICAL_DEVICE: 'http://192.168.1.X:3000', // Cambia X por tu IP
};

// Configuración de producción
const PROD_CONFIG = {
  API_URL: 'https://your-production-api.com',
};

// Exportar configuración según el entorno y plataforma
export const getApiUrl = () => {
  if (__DEV__) {
    // Modo desarrollo
    if (Platform.OS === 'android') {
      return DEV_CONFIG.ANDROID_EMULATOR;
    } else if (Platform.OS === 'ios') {
      return DEV_CONFIG.IOS_SIMULATOR;
    }
    // Para web o dispositivos físicos, puedes agregar lógica adicional
    return DEV_CONFIG.IOS_SIMULATOR;
  }
  
  // Modo producción
  return PROD_CONFIG.API_URL;
};

// Instrucciones:
// 1. Para Android Emulator: usar 10.0.2.2
// 2. Para iOS Simulator: usar localhost
// 3. Para dispositivo físico:
//    - Encuentra tu IP local: 
//      * Windows: ipconfig
//      * Mac/Linux: ifconfig
//    - Asegúrate de estar en la misma red Wi-Fi
//    - Actualiza PHYSICAL_DEVICE con tu IP
