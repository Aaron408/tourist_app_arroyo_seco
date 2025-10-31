const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

/**
 * Configura middleware de seguridad básico
 * @param {Object} options - Opciones de configuración
 * @returns {Array} - Array de middlewares
 */
const setupSecurity = (options = {}) => {
  const {
    corsOrigin = true,
    helmetOptions = {},
    rateLimitWindow = 15, // minutos
    rateLimitMax = 100,
    serviceName = 'unknown-service'
  } = options;

  const middlewares = [];

  // CORS
  middlewares.push(cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }));

  // Helmet para headers de seguridad
  middlewares.push(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    ...helmetOptions
  }));

  // Rate limiting
  middlewares.push(rateLimit({
    windowMs: rateLimitWindow * 60 * 1000,
    max: rateLimitMax,
    message: {
      success: false,
      message: "Demasiadas peticiones, intente más tarde",
      code: "RATE_LIMIT_EXCEEDED",
      timestamp: new Date().toISOString(),
      service: serviceName
    },
    standardHeaders: true,
    legacyHeaders: false
  }));

  return middlewares;
};

/**
 * Middleware para agregar headers de seguridad personalizados
 * @param {string} serviceName - Nombre del servicio
 * @returns {Function} - Middleware de Express
 */
const securityHeaders = (serviceName = 'unknown-service') => {
  return (req, res, next) => {
    // Headers personalizados de seguridad
    res.setHeader('X-Service-Name', serviceName);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Remove headers that reveal information
    res.removeHeader('X-Powered-By');
    res.removeHeader('Server');
    
    next();
  };
};

/**
 * Crea un rate limiter personalizado
 * @param {Object} options - Opciones del rate limiter
 * @returns {Function} - Rate limiter middleware
 */
const rateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutos
    max = 100,
    message = "Demasiadas peticiones",
    serviceName = 'unknown-service',
    skipSuccessfulRequests = false,
    skipFailedRequests = false
  } = options;

  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message,
      code: "RATE_LIMIT_EXCEEDED",
      timestamp: new Date().toISOString(),
      service: serviceName
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests,
    skipFailedRequests,
    keyGenerator: (req) => {
      // Use IP + User-Agent to create a more specific key
      return `${req.ip}-${req.get('User-Agent') || 'unknown'}`;
    }
  });
};

/**
 * Middleware para limitar el tamaño de archivos
 * @param {number} maxSize - Tamaño máximo en bytes
 * @param {string} serviceName - Nombre del servicio
 * @returns {Function} - Middleware de Express
 */
const limitFileSize = (maxSize = 10 * 1024 * 1024, serviceName = 'unknown-service') => {
  return (req, res, next) => {
    const contentLength = parseInt(req.get('Content-Length') || '0');
    
    if (contentLength > maxSize) {
      return res.status(413).json({
        success: false,
        message: `Archivo demasiado grande. Máximo permitido: ${Math.round(maxSize / 1024 / 1024)}MB`,
        code: "FILE_TOO_LARGE",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
    
    next();
  };
};

module.exports = {
  setupSecurity,
  securityHeaders,
  rateLimiter,
  limitFileSize
};
