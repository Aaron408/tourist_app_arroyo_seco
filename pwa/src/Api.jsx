// API.jsx - Archivo centralizado para todas las llamadas a la API

import { httpClient } from './utils/httpClient';

/**
 * API para autenticación
 */
export const authAPI = {
  // Inicio de sesión
  login: async (credentials) => {
    return httpClient.post('/auth/login', credentials);
  },
  
  // Registro de usuario
  register: async (userData) => {
    return httpClient.post('/auth/register', userData);
  },
  
  // Verificar token de autenticación
  verifyToken: async () => {
    return httpClient.get('/auth/verify');
  },
  
  // Cerrar sesión
  logout: async () => {
    return httpClient.post('/auth/logout');
  },
  
  // Restablecer contraseña
  requestPasswordReset: async (email) => {
    return httpClient.post('/auth/forgot-password', { email });
  }
};

/**
 * API para restaurantes
 */
export const restaurantsAPI = {
  // Obtener todos los restaurantes
  getAll: async (params = {}) => {
    return httpClient.get('/restaurants', { params });
  },
  
  // Obtener un restaurante por ID
  getById: async (id) => {
    return httpClient.get(`/restaurants/${id}`);
  },
  
  // Buscar restaurantes
  search: async (query) => {
    return httpClient.get('/restaurants/search', { params: { q: query } });
  },
  
  // Obtener reseñas de un restaurante
  getReviews: async (id) => {
    return httpClient.get(`/restaurants/${id}/reviews`);
  },
  
  // Enviar reseña para un restaurante
  addReview: async (id, reviewData) => {
    return httpClient.post(`/restaurants/${id}/reviews`, reviewData);
  }
};

/**
 * API para atracciones turísticas
 */
export const attractionsAPI = {
  // Obtener todas las atracciones
  getAll: async (params = {}) => {
    return httpClient.get('/attractions', { params });
  },
  
  // Obtener una atracción por ID
  getById: async (id) => {
    return httpClient.get(`/attractions/${id}`);
  },
  
  // Buscar atracciones
  search: async (query) => {
    return httpClient.get('/attractions/search', { params: { q: query } });
  },
  
  // Obtener reseñas de una atracción
  getReviews: async (id) => {
    return httpClient.get(`/attractions/${id}/reviews`);
  }
};

/**
 * API para usuarios
 */
export const userAPI = {
  // Obtener perfil del usuario
  getProfile: async () => {
    return httpClient.get('/users/profile');
  },
  
  // Actualizar perfil del usuario
  updateProfile: async (userData) => {
    return httpClient.put('/users/profile', userData);
  },
  
  // Cambiar contraseña
  changePassword: async (passwordData) => {
    return httpClient.put('/users/change-password', passwordData);
  },
  
  // Obtener favoritos del usuario
  getFavorites: async () => {
    return httpClient.get('/users/favorites');
  },
  
  // Agregar a favoritos
  addToFavorites: async (type, id) => {
    return httpClient.post('/users/favorites', { type, id });
  },
  
  // Eliminar de favoritos
  removeFromFavorites: async (type, id) => {
    return httpClient.delete(`/users/favorites/${type}/${id}`);
  }
};
