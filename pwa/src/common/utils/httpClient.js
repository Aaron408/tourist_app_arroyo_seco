import { API_BASE_URL } from './constants';

// Base configuration for fetch requests
const baseConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// Default timeout in milliseconds (30 seconds)
const DEFAULT_TIMEOUT = 30000;

/**
 * Basic HTTP client for making API requests
 */
class HttpClient {
  constructor(baseURL, timeout = DEFAULT_TIMEOUT) {
    this.baseURL = baseURL || API_BASE_URL;
    this.timeout = timeout;
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
   * Create timeout for fetch request using AbortController
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Object} - Object with signal and cleanup function
   */
  _createTimeout(timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    return {
      signal: controller.signal,
      cleanup: () => clearTimeout(timeoutId)
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
   * Handle fetch errors (network, timeout, etc.)
   * @param {Error} error - Fetch error
   * @throws {Error} - Enhanced error with better messaging
   */
  _handleFetchError(error) {
    if (error.name === 'AbortError') {
      const timeoutError = new Error('La solicitud excedió el tiempo de espera. Por favor, verifica tu conexión a internet.');
      timeoutError.name = 'TimeoutError';
      throw timeoutError;
    }

    if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
      const networkError = new Error('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
      networkError.name = 'NetworkError';
      throw networkError;
    }

    throw error;
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
   * @param {number} config.timeout - Custom timeout in milliseconds
   * @returns {Promise} - Response data
   */
  async get(url, config = {}) {
    const { params, timeout, ...restConfig } = config;
    const fullConfig = this._addAuthToken({ ...baseConfig, ...restConfig });
    const fullURL = this._buildURL(url, params);

    const { signal, cleanup } = this._createTimeout(timeout || this.timeout);

    try {
      const response = await fetch(fullURL, {
        method: 'GET',
        ...fullConfig,
        signal
      });

      cleanup();
      return this._handleResponse(response);
    } catch (error) {
      cleanup();
      this._handleFetchError(error);
    }
  }

  /**
   * Make a POST request
   * @param {string} url - Request URL
   * @param {Object|FormData} data - Data to send
   * @param {Object} config - Additional configuration
   * @param {number} config.timeout - Custom timeout in milliseconds
   * @returns {Promise} - Response data
   */
  async post(url, data, config = {}) {
    const { timeout, ...restConfig } = config;

    // Check if data is FormData (for file uploads)
    const isFormData = data instanceof FormData;

    // If FormData, don't include Content-Type header (browser sets it automatically with boundary)
    const baseHeaders = isFormData ? {} : baseConfig;
    const fullConfig = this._addAuthToken({ ...baseHeaders, ...restConfig });
    const fullURL = `${this.baseURL}${url}`;

    const { signal, cleanup } = this._createTimeout(timeout || this.timeout);

    try {
      const response = await fetch(fullURL, {
        method: 'POST',
        ...fullConfig,
        body: isFormData ? data : JSON.stringify(data),
        signal
      });

      cleanup();
      return this._handleResponse(response);
    } catch (error) {
      cleanup();
      this._handleFetchError(error);
    }
  }

  /**
   * Make a PUT request
   * @param {string} url - Request URL
   * @param {Object|FormData} data - Data to send
   * @param {Object} config - Additional configuration
   * @param {number} config.timeout - Custom timeout in milliseconds
   * @returns {Promise} - Response data
   */
  async put(url, data, config = {}) {
    const { timeout, ...restConfig } = config;

    // Check if data is FormData (for file uploads)
    const isFormData = data instanceof FormData;

    // If FormData, don't include Content-Type header (browser sets it automatically with boundary)
    const baseHeaders = isFormData ? {} : baseConfig;
    const fullConfig = this._addAuthToken({ ...baseHeaders, ...restConfig });
    const fullURL = `${this.baseURL}${url}`;

    const { signal, cleanup } = this._createTimeout(timeout || this.timeout);

    try {
      const response = await fetch(fullURL, {
        method: 'PUT',
        ...fullConfig,
        body: isFormData ? data : JSON.stringify(data),
        signal
      });

      cleanup();
      return this._handleResponse(response);
    } catch (error) {
      cleanup();
      this._handleFetchError(error);
    }
  }

  /**
   * Make a DELETE request
   * @param {string} url - Request URL
   * @param {Object} config - Additional configuration
   * @param {number} config.timeout - Custom timeout in milliseconds
   * @returns {Promise} - Response data
   */
  async delete(url, config = {}) {
    const { timeout, ...restConfig } = config;
    const fullConfig = this._addAuthToken({ ...baseConfig, ...restConfig });
    const fullURL = `${this.baseURL}${url}`;

    const { signal, cleanup } = this._createTimeout(timeout || this.timeout);

    try {
      const response = await fetch(fullURL, {
        method: 'DELETE',
        ...fullConfig,
        signal
      });

      cleanup();
      return this._handleResponse(response);
    } catch (error) {
      cleanup();
      this._handleFetchError(error);
    }
  }
}

// Export class to allow creating custom instances
export default HttpClient;