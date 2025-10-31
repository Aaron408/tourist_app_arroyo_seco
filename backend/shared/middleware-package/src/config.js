/**
 * Centralized configuration for shared middleware
 */
class MiddlewareConfig {
  constructor(options = {}) {
    // Authentication configuration
    this.auth = {
      jwtSecret: options.jwtSecret || process.env.JWT_SECRET,
      sessionTimeout: options.sessionTimeout || process.env.SESSION_TIMEOUT || "24h",
      serviceName: options.serviceName || 'unknown-service',
      databasePool: options.databasePool || null
    };

    // Security configuration
    this.security = {
      corsOrigin: options.corsOrigin || true,
      rateLimitWindow: options.rateLimitWindow || 15, // minutes
      rateLimitMax: options.rateLimitMax || 100,
      maxFileSize: options.maxFileSize || 10 * 1024 * 1024, // 10MB
      helmetOptions: options.helmetOptions || {}
    };

    // Logging configuration
    this.logging = {
      format: options.loggingFormat || 'combined',
      enableMetrics: options.enableMetrics || false,
      skipHealthChecks: options.skipHealthChecks !== false
    };

    // Validate required configuration
    this.validate();
  }

  validate() {
    if (!this.auth.jwtSecret) {
      throw new Error('JWT_SECRET is required for middleware configuration');
    }

    if (!this.auth.serviceName || this.auth.serviceName === 'unknown-service') {
      console.warn('⚠️ Service name not provided, using "unknown-service"');
    }
  }

  /**
   * Obtiene configuración completa para un microservicio
   */
  getServiceConfig() {
    return {
      serviceName: this.auth.serviceName,
      auth: this.auth,
      security: this.security,
      logging: this.logging
    };
  }

  /**
   * Configura el pool de base de datos
   */
  setDatabasePool(pool) {
    this.auth.databasePool = pool;
    return this;
  }

  /**
   * Actualiza el nombre del servicio
   */
  setServiceName(serviceName) {
    this.auth.serviceName = serviceName;
    return this;
  }
}

module.exports = MiddlewareConfig;
