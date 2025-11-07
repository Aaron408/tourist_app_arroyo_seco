import { API_BASE_URL } from './constants';

// Base configuration for fetch requests
const baseConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * Basic HTTP client for making API requests
 */
class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL || API_BASE_URL;
  }

  /**
   * Add authentication token to headers
   * @param {Object} config - Request configuration
   * @returns {Object} - Configuration with token included
   */
  _addAuthToken(config = {}) {
    const token = localStorage.getItem('authToken');
    if (!token) return config;

    const headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`
    };

    return {
      ...config,
      headers
    };
  }

  /**
   * Process API response
   * @param {Response} response - Fetch response
   * @returns {Promise} - Response data
   */
  async _handleResponse(response) {
    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || data.error || 'Request error');
      error.response = {
        data,
        status: response.status
      };
      throw error;
    }

    return data;
  }

  /**
   * Build URL with query parameters
   * @param {string} url - Base URL
   * @param {Object} params - Query parameters
   * @returns {string} - Full URL with query string
   */
  _buildURL(url, params = {}) {
    const fullURL = `${this.baseURL}${url}`;
    
    if (!params || Object.keys(params).length === 0) {
      return fullURL;
    }

    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return queryString ? `${fullURL}?${queryString}` : fullURL;
  }

  /**
   * Make a GET request
   * @param {string} url - Request URL
   * @param {Object} config - Additional configuration
   * @param {Object} config.params - Query parameters
   * @returns {Promise} - Response data
   */
  async get(url, config = {}) {
    const { params, ...restConfig } = config;
    const fullConfig = this._addAuthToken({ ...baseConfig, ...restConfig });
    const fullURL = this._buildURL(url, params);
    
    const response = await fetch(fullURL, {
      method: 'GET',
      ...fullConfig
    });

    return this._handleResponse(response);
  }

  /**
   * Make a POST request
   * @param {string} url - Request URL
   * @param {Object} data - Data to send
   * @param {Object} config - Additional configuration
   * @returns {Promise} - Response data
   */
  async post(url, data, config = {}) {
    const fullConfig = this._addAuthToken({ ...baseConfig, ...config });
    const fullURL = `${this.baseURL}${url}`;
    
    const response = await fetch(fullURL, {
      method: 'POST',
      ...fullConfig,
      body: JSON.stringify(data)
    });

    return this._handleResponse(response);
  }

  /**
   * Make a PUT request
   * @param {string} url - Request URL
   * @param {Object} data - Data to send
   * @param {Object} config - Additional configuration
   * @returns {Promise} - Response data
   */
  async put(url, data, config = {}) {
    const fullConfig = this._addAuthToken({ ...baseConfig, ...config });
    const fullURL = `${this.baseURL}${url}`;
    
    const response = await fetch(fullURL, {
      method: 'PUT',
      ...fullConfig,
      body: JSON.stringify(data)
    });

    return this._handleResponse(response);
  }

  /**
   * Make a DELETE request
   * @param {string} url - Request URL
   * @param {Object} config - Additional configuration
   * @returns {Promise} - Response data
   */
  async delete(url, config = {}) {
    const fullConfig = this._addAuthToken({ ...baseConfig, ...config });
    const fullURL = `${this.baseURL}${url}`;
    
    const response = await fetch(fullURL, {
      method: 'DELETE',
      ...fullConfig
    });

    return this._handleResponse(response);
  }
}

// Export class to allow creating custom instances
export default HttpClient;