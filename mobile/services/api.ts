import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_CONFIG } from '../constants/config';

// Keys de AsyncStorage (deben coincidir con authService)
const STORAGE_KEYS = {
  TOKEN: '@auth:tokenn',
  USER: '@auth:user',
  EXPIRY: '@auth:expiry',
  LOGIN_DATE: '@auth:loginDate',
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada request (desde caché)
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token agregado a la petición desde AsyncStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido - limpiar caché automáticamente
      console.log('⚠️ Token inválido o expirado - limpiando caché');
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER,
        STORAGE_KEYS.EXPIRY,
        STORAGE_KEYS.LOGIN_DATE,
      ]);
    }
    return Promise.reject(error);
  }
);

export default api;
