// Configuración básica para las solicitudes fetch
const baseConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * Cliente HTTP básico para realizar peticiones a la API
 */
class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL || '';
  }

  /**
   * Añade el token de autenticación a las cabeceras
   * @param {Object} config - Configuración de la petición
   * @returns {Object} - Configuración con el token incluido
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
   * Procesa la respuesta de la API
   * @param {Response} response - Respuesta de fetch
   * @returns {Promise} - Datos de la respuesta
   */
  async _handleResponse(response) {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || 'Error en la petición');
      error.response = {
        data,
        status: response.status
      };
      throw error;
    }

    return data;
  }

  /**
   * Realiza una petición GET
   * @param {string} url - URL de la petición
   * @param {Object} config - Configuración adicional
   * @returns {Promise} - Datos de la respuesta
   */
  async get(url, config = {}) {
    const fullConfig = this._addAuthToken({ ...baseConfig, ...config });
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'GET',
      ...fullConfig
    });

    return this._handleResponse(response);
  }

  /**
   * Realiza una petición POST
   * @param {string} url - URL de la petición
   * @param {Object} data - Datos a enviar
   * @param {Object} config - Configuración adicional
   * @returns {Promise} - Datos de la respuesta
   */
  async post(url, data, config = {}) {
    const fullConfig = this._addAuthToken({ ...baseConfig, ...config });
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      ...fullConfig,
      body: JSON.stringify(data)
    });

    return this._handleResponse(response);
  }

  /**
   * Realiza una petición PUT
   * @param {string} url - URL de la petición
   * @param {Object} data - Datos a enviar
   * @param {Object} config - Configuración adicional
   * @returns {Promise} - Datos de la respuesta
   */
  async put(url, data, config = {}) {
    const fullConfig = this._addAuthToken({ ...baseConfig, ...config });
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      ...fullConfig,
      body: JSON.stringify(data)
    });

    return this._handleResponse(response);
  }

  /**
   * Realiza una petición DELETE
   * @param {string} url - URL de la petición
   * @param {Object} config - Configuración adicional
   * @returns {Promise} - Datos de la respuesta
   */
  async delete(url, config = {}) {
    const fullConfig = this._addAuthToken({ ...baseConfig, ...config });
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
      ...fullConfig
    });

    return this._handleResponse(response);
  }
}

// Exportar una instancia por defecto
export const httpClient = new HttpClient(import.meta.env.VITE_API_URL || 'https://api.arroyoseco-app.com');

// Exportar la clase para permitir crear instancias personalizadas
export default HttpClient;