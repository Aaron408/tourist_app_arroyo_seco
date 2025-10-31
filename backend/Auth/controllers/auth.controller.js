const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

/**
 * Auth Controller
 * Handles authentication operations: register, login, logout
 */
class AuthController {
  /**
   * Register a new user
   * @route POST /api/auth/register
   */
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos',
          code: 'MISSING_FIELDS',
          timestamp: new Date().toISOString()
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Formato de email inválido',
          code: 'INVALID_EMAIL',
          timestamp: new Date().toISOString()
        });
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres',
          code: 'WEAK_PASSWORD',
          timestamp: new Date().toISOString()
        });
      }

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'El email ya está registrado',
          code: 'EMAIL_EXISTS',
          timestamp: new Date().toISOString()
        });
      }

      // Create new user
      const user = await UserModel.create({ name, email, password });

      // Generate JWT token (30 days)
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          name: user.name 
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Calculate expiration date (30 days from now)
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 30);

      // Save session token in database
      await UserModel.createSessionToken(user.id, token, expireDate.toISOString());

      return res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status
          },
          token,
          expiresAt: expireDate.toISOString()
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error in register:', error);
      
      // Handle unique constraint violation (duplicate email)
      if (error.code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'El email ya está registrado',
          code: 'EMAIL_EXISTS',
          timestamp: new Date().toISOString()
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Error al registrar usuario',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Login user
   * @route POST /api/auth/login
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email y contraseña son requeridos',
          code: 'MISSING_FIELDS',
          timestamp: new Date().toISOString()
        });
      }

      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas',
          code: 'INVALID_CREDENTIALS',
          timestamp: new Date().toISOString()
        });
      }

      // Check if user is active
      if (!UserModel.isActive(user.status)) {
        const statusLabel = UserModel.getStatusLabel(user.status);
        return res.status(403).json({
          success: false,
          message: `Usuario ${statusLabel}`,
          code: user.status === UserModel.STATUS.SUSPENDED ? 'USER_SUSPENDED' : 'USER_INACTIVE',
          timestamp: new Date().toISOString()
        });
      }

      // Verify password
      const isPasswordValid = await UserModel.verifyPassword(password, user.hashed_password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas',
          code: 'INVALID_CREDENTIALS',
          timestamp: new Date().toISOString()
        });
      }

      // Generate JWT token (30 days)
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          name: user.name 
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Calculate expiration date (30 days from now)
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 30);

      // Save session token in database
      await UserModel.createSessionToken(user.id, token, expireDate.toISOString());

      return res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status
          },
          token,
          expiresAt: expireDate.toISOString()
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error in login:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Logout user (requires authentication)
   * @route POST /api/auth/logout
   */
  static async logout(req, res) {
    try {
      // Extract token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'Token no proporcionado',
          code: 'TOKEN_REQUIRED',
          timestamp: new Date().toISOString()
        });
      }

      const token = authHeader.substring(7);

      // Verify token exists in database
      const sessionToken = await UserModel.findSessionToken(token);
      if (!sessionToken) {
        return res.status(404).json({
          success: false,
          message: 'Sesión no encontrada',
          code: 'SESSION_NOT_FOUND',
          timestamp: new Date().toISOString()
        });
      }

      // Delete session token
      await UserModel.deleteSessionToken(token);

      return res.status(200).json({
        success: true,
        message: 'Sesión cerrada exitosamente',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error in logout:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al cerrar sesión',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Get current user profile (requires authentication)
   * @route GET /api/auth/me
   */
  static async getCurrentUser(req, res) {
    try {
      // User data is added by authentication middleware
      const userId = req.user?.userId || req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
          code: 'UNAUTHORIZED',
          timestamp: new Date().toISOString()
        });
      }

      const user = await UserModel.findById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
          code: 'USER_NOT_FOUND',
          timestamp: new Date().toISOString()
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Perfil de usuario obtenido',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status
          }
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener perfil',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Verify if token is valid (requires authentication)
   * @route GET /api/auth/verify
   */
  static async verifyToken(req, res) {
    try {
      // If middleware passes, token is valid
      return res.status(200).json({
        success: true,
        message: 'Token válido',
        data: {
          user: req.user
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error in verifyToken:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al verificar token',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = AuthController;
