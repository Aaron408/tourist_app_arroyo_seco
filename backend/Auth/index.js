require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase, pool, closeDatabase } = require('./config/database');
const { router: authRoutes, middleware } = require('./routes/auth.routes');
const { setupSwagger } = require('./docs/swagger');
const DatabaseUtils = require('./utils/database.utils');

/**
 * Express Application Setup
 */
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware Configuration
 */
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Request Logger Middleware
 */
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/**
 * Setup Swagger Documentation
 */
setupSwagger(app);

/**
 * Health Check Endpoint
 * @route GET /health
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Auth Service is running',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * Root Endpoint
 * @route GET /
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Auth Service API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      health: '/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      logout: 'POST /api/auth/logout',
      profile: 'GET /api/auth/me',
      verify: 'GET /api/auth/verify'
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);

/**
 * 404 Handler - Route not found
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    code: 'NOT_FOUND',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    code: err.code || 'INTERNAL_ERROR',
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Connect to database
    const dbConnected = await connectDatabase();
    
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Server not started.');
      process.exit(1);
    }

    // Assign database pool to middleware for JWT validation
    middleware.config.auth.databasePool = pool;
    console.log('✅ Middleware configured with database connection');

    // Initialize database sequences (fix auto-increment issues)
    await DatabaseUtils.initializeSequences();

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🚀 Auth Service Started Successfully');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📡 Server running on: http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
      console.log('Available Endpoints:');
      console.log(`  POST   /api/auth/register    - Register new user`);
      console.log(`  POST   /api/auth/login       - Login user`);
      console.log(`  POST   /api/auth/logout      - Logout user (requires auth)`);
      console.log(`  GET    /api/auth/me          - Get current user (requires auth)`);
      console.log(`  GET    /api/auth/verify      - Verify token (requires auth)`);
      console.log('');
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('\n🛑 SIGTERM signal received: closing HTTP server');
      server.close(async () => {
        console.log('✅ HTTP server closed');
        await closeDatabase();
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('\n🛑 SIGINT signal received: closing HTTP server');
      server.close(async () => {
        console.log('✅ HTTP server closed');
        await closeDatabase();
        process.exit(0);
      });
    });

    return server;
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
