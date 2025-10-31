const authentication = require('./src/authentication');
const validation = require('./src/validation');
const security = require('./src/security');
const logging = require('./src/logging');
const errorHandling = require('./src/errorHandling');
const utils = require('./src/utils');
const MiddlewareConfig = require('./src/config');

/**
 * Factory function para crear middleware configurado
 */
function createMiddleware(options = {}) {
  const config = new MiddlewareConfig(options);
  const serviceConfig = config.getServiceConfig();

  return {
    // Configuration
    config: serviceConfig,
    
    // Authentication middleware (configurados)
    authenticateToken: (allowedTypes = []) => 
      authentication.authenticateToken(serviceConfig.auth, allowedTypes),
    
    // Role-based authentication helpers (configurados)
    requireAuth: () => 
      authentication.requireAuth(serviceConfig.auth),
    requireRoles: (allowedRoles = []) => 
      authentication.requireRoles(serviceConfig.auth, allowedRoles),
    requireAdmin: () => 
      authentication.requireAdmin(serviceConfig.auth),
    requireOwner: () => 
      authentication.requireOwner(serviceConfig.auth),
    
    // Validation middleware (configurados)
    validateInput: (validationFunction) => 
      validation.validateInput(validationFunction, serviceConfig.serviceName),
    validatePagination: () => 
      validation.validatePagination(serviceConfig.serviceName),
    sanitizeInput: (fields = []) => 
      validation.sanitizeInput(fields, serviceConfig.serviceName),
    
    // Security middleware (configurados)
    setupSecurity: () => 
      security.setupSecurity({
        ...serviceConfig.security,
        serviceName: serviceConfig.serviceName
      }),
    securityHeaders: () => 
      security.securityHeaders(serviceConfig.serviceName),
    rateLimiter: (options = {}) => 
      security.rateLimiter({
        ...serviceConfig.security,
        ...options,
        serviceName: serviceConfig.serviceName
      }),
    
    // Logging middleware (configurados)
    setupLogging: (options = {}) => 
      logging.setupLogging({
        ...serviceConfig.logging,
        ...options,
        serviceName: serviceConfig.serviceName
      }),
    requestLogger: () => 
      logging.requestLogger(serviceConfig.serviceName),
    errorLogger: () => 
      logging.errorLogger(serviceConfig.serviceName),
    metricsLogger: () => 
      logging.metricsLogger(serviceConfig.serviceName),
    
    // Error handling (configurados)
    errorHandler: () => 
      errorHandling.errorHandler(serviceConfig.serviceName),
    notFoundHandler: () => 
      errorHandling.notFoundHandler(serviceConfig.serviceName),
    timeoutHandler: (timeout = 30000) => 
      errorHandling.timeoutHandler(timeout, serviceConfig.serviceName),
    asyncHandler: errorHandling.asyncHandler,
    
    // Utilities
    ResponseUtils: utils.ResponseUtils,
    ValidationUtils: utils.ValidationUtils,
    
    // Helper para configurar Express app completa
    setupExpressApp: require('./src/expressSetup')(serviceConfig)
  };
}

// Export directo de funciones individuales (para compatibilidad)
module.exports = {
  // Factory principal
  createMiddleware,
  
  // Funciones individuales sin configurar
  authenticateToken: authentication.authenticateToken,
  requireAuth: authentication.requireAuth,
  requireRoles: authentication.requireRoles,
  requireAdmin: authentication.requireAdmin,
  requireOwner: authentication.requireOwner,
  checkUserActive: authentication.checkUserActive,
  validateInput: validation.validateInput,
  validatePagination: validation.validatePagination,
  sanitizeInput: validation.sanitizeInput,
  setupSecurity: security.setupSecurity,
  securityHeaders: security.securityHeaders,
  rateLimiter: security.rateLimiter,
  setupLogging: logging.setupLogging,
  requestLogger: logging.requestLogger,
  errorHandler: errorHandling.errorHandler,
  asyncHandler: errorHandling.asyncHandler,
  notFoundHandler: errorHandling.notFoundHandler,
  
  // Utilities
  ResponseUtils: utils.ResponseUtils,
  ValidationUtils: utils.ValidationUtils,
  MiddlewareConfig
};
