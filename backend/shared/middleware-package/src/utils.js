// Importar y re-exportar las utilidades existentes
// Estas clases pueden ser copiadas desde tu proyecto actual o importadas

/**
 * Class to handle HTTP responses with standards
 */
class ResponseUtils {
  /**
   * Generic success response
   */
  static success(res, statusCode = 200, message = 'Operation successful', data = {}) {
    return res.status(statusCode).json({
      success: true,
      message,
      timestamp: new Date().toISOString(),
      ...data
    });
  }

  /**
   * Generic error response
   */
  static error(res, statusCode = 500, message = 'Internal server error', error = null, additionalData = {}) {
    const response = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
      ...additionalData
    };

    if (process.env.NODE_ENV === 'development' && error) {
      response.error = error instanceof Error ? error.message : error;
      if (error instanceof Error && error.stack) {
        response.stack = error.stack;
      }
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Validation failed response
   */
  static validationError(res, message = 'Invalid input data', validationErrors = []) {
    return res.status(400).json({
      success: false,
      message,
      errors: validationErrors,
      code: "VALIDATION_ERROR",
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Unauthorized response
   */
  static unauthorized(res, message = 'Unauthorized', shouldLogout = true) {
    return res.status(401).json({
      success: false,
      message,
      code: "UNAUTHORIZED",
      timestamp: new Date().toISOString(),
      shouldLogout
    });
  }

  /**
   * Forbidden access response
   */
  static forbidden(res, message = 'Access denied') {
    return res.status(403).json({
      success: false,
      message,
      code: "FORBIDDEN",
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Resource not found response
   */
  static notFound(res, message = 'Resource not found') {
    return res.status(404).json({
      success: false,
      message,
      code: "NOT_FOUND",
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Conflict response
   */
  static conflict(res, message = 'Conflict with current resource state') {
    return res.status(409).json({
      success: false,
      message,
      code: "CONFLICT",
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Async handler wrapper
   */
  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

/**
 * Class to handle common validations
 */
class ValidationUtils {
  /**
   * Sanitizes text input to prevent XSS
   */
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Validates email format
   */
  static isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const hasConsecutiveDots = /\.\./.test(email);
    const hasInvalidDots = /^\.|\.$|@\.|\.\@/.test(email);

    return typeof email === 'string' &&
      emailRegex.test(email.trim()) &&
      !hasConsecutiveDots &&
      !hasInvalidDots;
  }

  /**
   * Validates password according to security criteria
   */
  static validatePassword(password, options = {}) {
    const {
      minLength = 6,
      requireUppercase = false,
      requireLowercase = false,
      requireNumbers = false,
      requireSpecialChars = false
    } = options;

    const errors = [];

    if (!password || typeof password !== 'string') {
      errors.push('Password is required');
      return { isValid: false, errors };
    }

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }

    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validates required fields
   */
  static validateRequiredFields(data, requiredFields) {
    const missingFields = requiredFields.filter(field => {
      const value = data[field];
      return value === undefined || value === null || value === '';
    });

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  }

  /**
   * Validates user registration data
   */
  static validateUserRegistration(userData) {
    const errors = [];
    const sanitizedData = {};

    // Required fields validation
    const requiredFields = ['email', 'password', 'firstName', 'lastName'];
    const requiredValidation = this.validateRequiredFields(userData, requiredFields);
    
    if (!requiredValidation.isValid) {
      errors.push(...requiredValidation.missingFields.map(field => `${field} is required`));
    }

    // Email validation
    if (userData.email) {
      if (!this.isValidEmail(userData.email)) {
        errors.push('Invalid email format');
      } else {
        sanitizedData.email = userData.email.toLowerCase().trim();
      }
    }

    // Password validation
    if (userData.password) {
      const passwordValidation = this.validatePassword(userData.password);
      if (!passwordValidation.isValid) {
        errors.push(...passwordValidation.errors);
      }
    }

    // Name validation and sanitization
    if (userData.firstName) {
      sanitizedData.firstName = this.sanitizeInput(userData.firstName.trim());
    }
    
    if (userData.lastName) {
      sanitizedData.lastName = this.sanitizeInput(userData.lastName.trim());
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData
    };
  }

  /**
   * Validates login data
   */
  static validateLogin(loginData) {
    const errors = [];
    const sanitizedData = {};

    // Required fields validation
    const requiredFields = ['email', 'password'];
    const requiredValidation = this.validateRequiredFields(loginData, requiredFields);
    
    if (!requiredValidation.isValid) {
      errors.push(...requiredValidation.missingFields.map(field => `${field} is required`));
    }

    // Email validation
    if (loginData.email) {
      if (!this.isValidEmail(loginData.email)) {
        errors.push('Invalid email format');
      } else {
        sanitizedData.email = loginData.email.toLowerCase().trim();
      }
    }

    // Password validation (basic - just required)
    if (loginData.password && loginData.password.length < 1) {
      errors.push('Password is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData
    };
  }

  /**
   * Validates profile update data
   */
  static validateProfileUpdate(profileData) {
    const errors = [];
    const sanitizedData = {};

    // Optional fields validation and sanitization
    if (profileData.firstName) {
      if (typeof profileData.firstName !== 'string' || profileData.firstName.trim().length < 1) {
        errors.push('First name must be a non-empty string');
      } else {
        sanitizedData.firstName = this.sanitizeInput(profileData.firstName.trim());
      }
    }
    
    if (profileData.lastName) {
      if (typeof profileData.lastName !== 'string' || profileData.lastName.trim().length < 1) {
        errors.push('Last name must be a non-empty string');
      } else {
        sanitizedData.lastName = this.sanitizeInput(profileData.lastName.trim());
      }
    }

    if (profileData.phone) {
      if (typeof profileData.phone !== 'string') {
        errors.push('Phone must be a string');
      } else {
        sanitizedData.phone = this.sanitizeInput(profileData.phone.trim());
      }
    }

    if (profileData.rol) {
      const validRoles = ['Propietario', 'Lider', 'Encargado'];
      if (!validRoles.includes(profileData.rol)) {
        errors.push('Invalid role. Must be one of: ' + validRoles.join(', '));
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData
    };
  }
}

module.exports = {
  ResponseUtils,
  ValidationUtils
};
