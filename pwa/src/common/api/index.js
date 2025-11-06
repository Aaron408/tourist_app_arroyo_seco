// Centralized file for all API calls

import HttpClient from '../utils/httpClient';
import { API_BASE_URL, AUTH_API_URL, GASTRONOMY_API_URL } from '../utils/constants';

// ============================================================================
// HTTP CLIENTS
// ============================================================================
// Main API client
const httpClient = new HttpClient(API_BASE_URL);

// Gastronomy microservice client
const authClient = new HttpClient(AUTH_API_URL);

// Gastronomy microservice client
const gastronomyClient = new HttpClient(GASTRONOMY_API_URL);

// ============================================================================
// AUTHENTICATION API
// ============================================================================
export const authAPI = {
  login: async (credentials) => {
    return authClient.post('/api/auth/login', credentials);
  },
  
  register: async (userData) => {
    return authClient.post('/auth/register', userData);
  },
  
  verifyToken: async () => {
    return authClient.get('/auth/verify');
  },
  
  logout: async () => {
    return authClient.post('/auth/logout');
  },
  
  requestPasswordReset: async (email) => {
    return authClient.post('/auth/forgot-password', { email });
  }
};

// ============================================================================
// USERS API
// ============================================================================
export const userAPI = {
  getProfile: async () => {
    return httpClient.get('/users/profile');
  },
  
  updateProfile: async (userData) => {
    return httpClient.put('/users/profile', userData);
  },
  
  changePassword: async (passwordData) => {
    return httpClient.put('/users/change-password', passwordData);
  },
  
  getFavorites: async () => {
    return httpClient.get('/users/favorites');
  },
  
  addToFavorites: async (type, id) => {
    return httpClient.post('/users/favorites', { type, id });
  },
  
  removeFromFavorites: async (type, id) => {
    return httpClient.delete(`/users/favorites/${type}/${id}`);
  }
};

// ============================================================================
// GASTRONOMY API (Independent Microservice)
// ============================================================================
export const gastronomyAPI = {
  
  // ========== RECIPES ==========
  recipes: {
    getAll: async (params = {}) => {
      return gastronomyClient.get('/recipes', { params });
    },

    getById: async (id, language = null) => {
      const params = language ? { language } : {};
      return gastronomyClient.get(`/recipes/${id}`, { params });
    },

    search: async (query, language = null) => {
      const params = { q: query };
      if (language) params.language = language;
      return gastronomyClient.get('/recipes/search', { params });
    },

    create: async (recipeData) => {
      return gastronomyClient.post('/recipes', recipeData);
    },

    update: async (id, recipeData) => {
      return gastronomyClient.put(`/recipes/${id}`, recipeData);
    },

    delete: async (id) => {
      return gastronomyClient.delete(`/recipes/${id}`);
    }
  },

  // ========== INGREDIENTS ==========
  ingredients: {
    getAll: async (params = {}) => {
      return gastronomyClient.get('/ingredients', { params });
    },

    getById: async (id, language = null) => {
      const params = language ? { language } : {};
      return gastronomyClient.get(`/ingredients/${id}`, { params });
    },

    create: async (ingredientData) => {
      return gastronomyClient.post('/ingredients', ingredientData);
    },

    update: async (id, ingredientData) => {
      return gastronomyClient.put(`/ingredients/${id}`, ingredientData);
    },

    delete: async (id) => {
      return gastronomyClient.delete(`/ingredients/${id}`);
    }
  },

  // ========== TECHNIQUES ==========
  techniques: {
    getAll: async (params = {}) => {
      return gastronomyClient.get('/techniques', { params });
    },

    getById: async (id, language = null) => {
      const params = language ? { language } : {};
      return gastronomyClient.get(`/techniques/${id}`, { params });
    },

    create: async (techniqueData) => {
      return gastronomyClient.post('/techniques', techniqueData);
    },

    update: async (id, techniqueData) => {
      return gastronomyClient.put(`/techniques/${id}`, techniqueData);
    },

    delete: async (id) => {
      return gastronomyClient.delete(`/techniques/${id}`);
    }
  },

  // ========== TOOLS ==========
  tools: {
    getAll: async (params = {}) => {
      return gastronomyClient.get('/tools', { params });
    },

    getById: async (id, language = null) => {
      const params = language ? { language } : {};
      return gastronomyClient.get(`/tools/${id}`, { params });
    },

    create: async (toolData) => {
      return gastronomyClient.post('/tools', toolData);
    },

    update: async (id, toolData) => {
      return gastronomyClient.put(`/tools/${id}`, toolData);
    },

    delete: async (id) => {
      return gastronomyClient.delete(`/tools/${id}`);
    }
  },

  // ========== HEALTH CHECK ==========
  health: async () => {
    return gastronomyClient.get('/health');
  }
};