const jwt = require("jsonwebtoken");

/**
 * Configuration object for authentication middleware
 */
class AuthConfig {
  constructor(options = {}) {
    this.jwtSecret = options.jwtSecret || process.env.JWT_SECRET;
    this.sessionTimeout = options.sessionTimeout || process.env.SESSION_TIMEOUT || "24h";
    this.databasePool = options.databasePool || null;
    this.serviceName = options.serviceName || 'unknown-service';
    
    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET is required for authentication middleware');
    }
  }
}

/**
 * Enhanced JWT authentication middleware factory
 * @param {Object} config - Configuration object
 * @param {Array} allowedTypes - Tipos de usuario permitidos (opcional)
 * @returns {Function} - Middleware de Express
 */
const authenticateToken = (config, allowedTypes = []) => {
  const authConfig = new AuthConfig(config);
  
  return async (req, res, next) => {
    try {
      const token = extractTokenFromHeader(req);
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token de acceso requerido",
          code: "TOKEN_REQUIRED",
          timestamp: new Date().toISOString(),
          service: authConfig.serviceName
        });
      }

      // Verificar JWT
      let decoded;
      try {
        decoded = jwt.verify(token, authConfig.jwtSecret);
      } catch (jwtError) {
        return handleJWTError(res, jwtError, authConfig.serviceName);
      }

      // Check if user is active (if DB pool is provided)
      if (authConfig.databasePool && decoded.userId) {
        console.log(`[${authConfig.serviceName}] Checking user in DB for userId: ${decoded.userId}`);
        const userInfo = await getUserInfo(decoded.userId, authConfig.databasePool);
        console.log(`[${authConfig.serviceName}] User info from DB:`, userInfo);
        
        if (!userInfo || !userInfo.is_active) {
          console.log(`[${authConfig.serviceName}] User is inactive or not found`);
          return res.status(401).json({
            success: false,
            message: "Usuario inactivo",
            code: "USER_INACTIVE",
            timestamp: new Date().toISOString(),
            service: authConfig.serviceName
          });
        }

        // Add user information to request including role
        req.user = {
          id: decoded.userId,
          userId: decoded.userId,
          email: decoded.email,
          role: userInfo.rol,
          sessionId: decoded.sessionId,
          iat: decoded.iat,
          exp: decoded.exp
        };
        console.log(`[${authConfig.serviceName}] User authenticated with role:`, userInfo.rol);
      } else {
        console.log(`[${authConfig.serviceName}] No DB pool or userId, using token data only`);
        // Add basic user information without DB validation
        req.user = {
          id: decoded.userId,
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role, // From token if available
          sessionId: decoded.sessionId,
          iat: decoded.iat,
          exp: decoded.exp
        };
        console.log(`[${authConfig.serviceName}] User authenticated with token role:`, decoded.role);
      }

      // Check role permissions if allowedTypes is provided
      if (allowedTypes.length > 0) {
        if (!req.user.role) {
          return res.status(401).json({
            success: false,
            message: "Usuario sin rol asignado",
            code: "NO_USER_ROLE",
            timestamp: new Date().toISOString(),
            service: authConfig.serviceName
          });
        }

        if (!allowedTypes.includes(req.user.role)) {
          return res.status(403).json({
            success: false,
            message: `Acceso denegado. Rol requerido: ${allowedTypes.join(', ')}. Rol actual: ${req.user.role}`,
            code: "FORBIDDEN_ROLE",
            allowedRoles: allowedTypes,
            userRole: req.user.role,
            timestamp: new Date().toISOString(),
            service: authConfig.serviceName
          });
        }

        console.log(`[${authConfig.serviceName}] Role validation passed: ${req.user.role} in [${allowedTypes.join(', ')}]`);
      }

      next();
    } catch (error) {
      console.error(`[${authConfig.serviceName}] Error en authenticateToken:`, error);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        code: "INTERNAL_ERROR",
        timestamp: new Date().toISOString(),
        service: authConfig.serviceName
      });
    }
  };
};

/**
 * Extrae el token del header Authorization
 */
function extractTokenFromHeader(req) {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) return null;
  
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  
  return authHeader;
}

/**
 * Handle JWT-specific errors
 */
function handleJWTError(res, jwtError, serviceName) {
  let message = "Token inválido";
  let code = "INVALID_TOKEN";

  switch (jwtError.name) {
    case 'TokenExpiredError':
      message = "Token expirado";
      code = "TOKEN_EXPIRED";
      break;
    case 'JsonWebTokenError':
      message = "Token malformado";
      code = "MALFORMED_TOKEN";
      break;
    case 'NotBeforeError':
      message = "Token no válido aún";
      code = "TOKEN_NOT_ACTIVE";
      break;
  }

  return res.status(401).json({
    success: false,
    message,
    code,
    timestamp: new Date().toISOString(),
    service: serviceName,
    shouldLogout: true
  });
}

/**
 * Get user information including role and status
 */
async function getUserInfo(userId, pool) {
  try {
    const result = await pool.query(
      'SELECT is_active, rol FROM users WHERE id = $1',
      [userId]
    );
    
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}

/**
 * Check if user is active (legacy function for compatibility)
 */
async function checkUserActive(userId, pool) {
  try {
    const userInfo = await getUserInfo(userId, pool);
    return userInfo && userInfo.is_active;
  } catch (error) {
    console.error('Error checking user active status:', error);
    return false;
  }
}

/**
 * Check user permissions
 */
async function checkUserPermissions(userId, allowedTypes, pool) {
  try {
    const result = await pool.query(
      'SELECT rol FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) return false;
    
    const userRole = result.rows[0].rol;
    return allowedTypes.includes(userRole);
  } catch (error) {
    console.error('Error checking user permissions:', error);
    return false;
  }
}

/**
 * Helper function to create middleware with specific roles
 * @param {Object} config - Configuration object
 * @param {Array} allowedRoles - Array of allowed roles
 * @returns {Function} - Express middleware
 */
const requireRoles = (config, allowedRoles = []) => {
  return authenticateToken(config, allowedRoles);
};

/**
 * Helper function to create admin-only middleware
 * @param {Object} config - Configuration object
 * @returns {Function} - Express middleware
 */
const requireAdmin = (config) => {
  return authenticateToken(config, ['Organization', 'Manager', 'Cluster manager']);
};

/**
 * Helper function to create owner-only middleware
 * @param {Object} config - Configuration object
 * @returns {Function} - Express middleware
 */
const requireOwner = (config) => {
  return authenticateToken(config, ['Organization', 'Cluster manager']);
};

/**
 * Helper function to create basic auth middleware (no role restriction)
 * @param {Object} config - Configuration object
 * @returns {Function} - Express middleware
 */
const requireAuth = (config) => {
  return authenticateToken(config, []);
};

module.exports = {
  authenticateToken,
  checkUserActive,
  getUserInfo,
  AuthConfig,
  requireRoles,
  requireAdmin,
  requireOwner,
  requireAuth
};
