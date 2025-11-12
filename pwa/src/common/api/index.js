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
// HELPER FUNCTIONS
// ============================================================================
/**
 * Convert data to FormData if it contains files (banner_image or multimedia)
 * @param {Object} data - Data object that may contain files
 * @returns {FormData|Object} - FormData if files exist, otherwise original data
 */
const prepareGastronomyData = (data) => {
  const hasBannerImage = data.banner_image && data.banner_image instanceof File;
  const hasMultimediaFiles = data.multimedia?.some(media => media.file instanceof File);

  // Check if we have any files to upload
  if (hasBannerImage || hasMultimediaFiles) {
    // Create FormData for multipart/form-data submission
    const formData = new FormData();

    // Add the banner image file if exists
    if (hasBannerImage) {
      formData.append('file', data.banner_image);
    }

    // Add multimedia files
    if (data.multimedia && data.multimedia.length > 0) {
      const multimediaTypes = [];

      data.multimedia.forEach((media, index) => {
        if (media.file instanceof File) {
          // Append file
          formData.append(`multimedia_files`, media.file);
          // Collect types to send as JSON array
          multimediaTypes.push(media.type);
        }
      });

      // Send types as JSON array
      if (multimediaTypes.length > 0) {
        formData.append('multimedia_types', JSON.stringify(multimediaTypes));
      }

      // Send existing multimedia URLs separately (those that don't have file)
      const existingMultimedia = data.multimedia
        .filter(media => !media.file && media.existingUrl)
        .map(media => ({ type: media.type, url: media.existingUrl }));

      if (existingMultimedia.length > 0) {
        formData.append('existing_multimedia', JSON.stringify(existingMultimedia));
      }
    }

    // Add all other fields as JSON strings (backend expects this format)
    Object.keys(data).forEach(key => {
      if (key !== 'banner_image' && key !== 'multimedia') {
        const value = data[key];
        // Send arrays and objects as JSON strings
        if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
    });

    return formData;
  }

  // No files - send as JSON, removing file-related fields
  const { banner_image, multimedia, ...restData } = data;

  // If multimedia exists but has no files, include only existing URLs
  if (multimedia && multimedia.length > 0) {
    restData.multimedia = multimedia
      .filter(media => media.existingUrl)
      .map(media => ({ type: media.type, url: media.existingUrl }));
  }

  return restData;
};

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
      const preparedData = prepareGastronomyData(recipeData);
      return gastronomyClient.post('/recipes', preparedData);
    },

    update: async (id, recipeData) => {
      const preparedData = prepareGastronomyData(recipeData);
      return gastronomyClient.put(`/recipes/${id}`, preparedData);
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
      const preparedData = prepareGastronomyData(ingredientData);
      return gastronomyClient.post('/ingredients', preparedData);
    },

    update: async (id, ingredientData) => {
      const preparedData = prepareGastronomyData(ingredientData);
      return gastronomyClient.put(`/ingredients/${id}`, preparedData);
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
      const preparedData = prepareGastronomyData(techniqueData);
      return gastronomyClient.post('/techniques', preparedData);
    },

    update: async (id, techniqueData) => {
      const preparedData = prepareGastronomyData(techniqueData);
      return gastronomyClient.put(`/techniques/${id}`, preparedData);
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
      const preparedData = prepareGastronomyData(toolData);
      return gastronomyClient.post('/tools', preparedData);
    },

    update: async (id, toolData) => {
      const preparedData = prepareGastronomyData(toolData);
      return gastronomyClient.put(`/tools/${id}`, preparedData);
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