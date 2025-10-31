/**
 * Middleware para validar datos de entrada
 * @param {Function} validationFunction - Función de validación a usar
 * @param {string} serviceName - Nombre del servicio para logging
 * @returns {Function} - Middleware de Express
 */
const validateInput = (validationFunction, serviceName = 'unknown-service') => {
  return (req, res, next) => {
    try {
      const validation = validationFunction(req.body);
      
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: "Datos de entrada inválidos",
          errors: validation.errors || [],
          code: "VALIDATION_ERROR",
          timestamp: new Date().toISOString(),
          service: serviceName
        });
      }

      // Si hay datos sanitizados, reemplazar el body
      if (validation.sanitizedData) {
        req.body = { ...req.body, ...validation.sanitizedData };
      }

      next();
    } catch (error) {
      console.error(`[${serviceName}] Error en validateInput:`, error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        code: "VALIDATION_INTERNAL_ERROR",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
  };
};

/**
 * Middleware para validar parámetros de paginación
 * @param {string} serviceName - Nombre del servicio
 * @returns {Function} - Middleware de Express
 */
const validatePagination = (serviceName = 'unknown-service') => {
  return (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Validar rangos
      if (page < 1) {
        return res.status(400).json({
          success: false,
          message: "El número de página debe ser mayor a 0",
          code: "INVALID_PAGE",
          timestamp: new Date().toISOString(),
          service: serviceName
        });
      }

      if (limit < 1 || limit > 100) {
        return res.status(400).json({
          success: false,
          message: "El límite debe estar entre 1 y 100",
          code: "INVALID_LIMIT",
          timestamp: new Date().toISOString(),
          service: serviceName
        });
      }

      // Agregar al request
      req.pagination = {
        page,
        limit,
        offset: (page - 1) * limit
      };

      next();
    } catch (error) {
      console.error(`[${serviceName}] Error en validatePagination:`, error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        code: "PAGINATION_INTERNAL_ERROR",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
  };
};

/**
 * Middleware to sanitize input data
 * @param {Array} fields - Fields to sanitize
 * @param {string} serviceName - Service name for logging
 * @returns {Function} - Express middleware
 */
const sanitizeInput = (fields = [], serviceName = 'unknown-service') => {
  return (req, res, next) => {
    try {
      if (fields.length === 0) {
        //Sanitize all string fields in the body
        Object.keys(req.body).forEach(key => {
          if (typeof req.body[key] === 'string') {
            req.body[key] = sanitizeString(req.body[key]);
          }
        });
      } else {
        //Sanitize only specified fields
        fields.forEach(field => {
          if (req.body[field] && typeof req.body[field] === 'string') {
            req.body[field] = sanitizeString(req.body[field]);
          }
        });
      }

      next();
    } catch (error) {
      console.error(`[${serviceName}] Error en sanitizeInput:`, error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        code: "SANITIZE_INTERNAL_ERROR",
        timestamp: new Date().toISOString(),
        service: serviceName
      });
    }
  };
};

/**
 * Sanitizes a string by removing dangerous characters
 */
function sanitizeString(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#x5C;');
}

module.exports = {
  validateInput,
  validatePagination,
  sanitizeInput
};
