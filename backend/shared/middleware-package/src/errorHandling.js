/**
 * Wrapper para manejar errores async de manera automática
 * @param {Function} fn - Función async a envolver
 * @returns {Function} - Función que maneja errores automáticamente
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Middleware global de manejo de errores
 * @param {string} serviceName - Nombre del servicio
 * @returns {Function} - Middleware de manejo de errores
 */
const errorHandler = (serviceName = 'unknown-service') => {
  return (err, req, res, next) => {
    console.error(`[${serviceName}] Global Error Handler:`, err.stack || err.message);
    
    // Mongoose/Sequelize validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: Object.values(err.errors).map(e => e.message),
        code: "VALIDATION_ERROR",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
    
    // Duplicate error (PostgreSQL)
    if (err.code === '23505') {
      return res.status(409).json({
        success: false,
        message: "Recurso ya existe",
        code: "DUPLICATE_RESOURCE",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
    
    // Foreign key error (PostgreSQL)
    if (err.code === '23503') {
      return res.status(400).json({
        success: false,
        message: "Referencia inválida",
        code: "FOREIGN_KEY_VIOLATION",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
    
    // Database connection error
    if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
      return res.status(503).json({
        success: false,
        message: "Servicio temporalmente no disponible",
        code: "SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
    
    // Error de JWT
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
        code: "INVALID_TOKEN",
        timestamp: new Date().toISOString(),
        service: serviceName,
        shouldLogout: true
      });
    }
    
    // Error de sintaxis JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({
        success: false,
        message: "JSON malformado",
        code: "INVALID_JSON",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
    
    // Generic server error
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "Error interno del servidor";
    
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Error interno del servidor" : message,
      code: err.code || "INTERNAL_ERROR",
      timestamp: new Date().toISOString(),
      service: serviceName,
      ...(process.env.NODE_ENV === 'development' && { 
        stack: err.stack,
        details: err 
      })
    });
  };
};

/**
 * Middleware para manejar rutas no encontradas
 * @param {string} serviceName - Nombre del servicio
 * @returns {Function} - Middleware para 404
 */
const notFoundHandler = (serviceName = 'unknown-service') => {
  return (req, res) => {
    res.status(404).json({
      success: false,
      message: `Endpoint ${req.originalUrl} no encontrado`,
      code: "ENDPOINT_NOT_FOUND",
      timestamp: new Date().toISOString(),
      service: serviceName,
      method: req.method,
      path: req.originalUrl
    });
  };
};

/**
 * Middleware para manejar timeouts de requests
 * @param {number} timeout - Timeout en millisegundos
 * @param {string} serviceName - Nombre del servicio
 * @returns {Function} - Middleware de timeout
 */
const timeoutHandler = (timeout = 30000, serviceName = 'unknown-service') => {
  return (req, res, next) => {
    res.setTimeout(timeout, () => {
      console.error(`[${serviceName}] Request timeout: ${req.method} ${req.originalUrl}`);
      
      if (!res.headersSent) {
        res.status(408).json({
          success: false,
          message: "Request timeout",
          code: "REQUEST_TIMEOUT",
          timestamp: new Date().toISOString(),
          service: serviceName
        });
      }
    });
    
    next();
  };
};

module.exports = {
  asyncHandler,
  errorHandler,
  notFoundHandler,
  timeoutHandler
};
