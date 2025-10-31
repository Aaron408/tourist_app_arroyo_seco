const express = require('express');
const compression = require('compression');

/**
 * Helper para configurar una aplicación Express completa con todos los middlewares
 */
module.exports = (serviceConfig) => {
  return (options = {}) => {
    const {
      enableCompression = true,
      enableJsonParsing = true,
      jsonLimit = '10mb',
      enableUrlEncoded = true,
      enableCors = true,
      enableRateLimit = true,
      enableLogging = true,
      enableSecurity = true,
      enableErrorHandling = true,
      customMiddlewares = []
    } = options;

    const app = express();

    // Importar middlewares
    const security = require('./security');
    const logging = require('./logging');
    const errorHandling = require('./errorHandling');

    // Compression
    if (enableCompression) {
      app.use(compression());
    }

    // Security middlewares
    if (enableSecurity) {
      const securityMiddlewares = security.setupSecurity({
        ...serviceConfig.security,
        serviceName: serviceConfig.serviceName
      });
      securityMiddlewares.forEach(middleware => app.use(middleware));
      
      app.use(security.securityHeaders(serviceConfig.serviceName));
    }

    // Logging
    if (enableLogging && serviceConfig.logging.format) {
      app.use(logging.setupLogging({
        ...serviceConfig.logging,
        serviceName: serviceConfig.serviceName
      }));
    }

    // Body parsing
    if (enableJsonParsing) {
      app.use(express.json({ limit: jsonLimit }));
    }

    if (enableUrlEncoded) {
      app.use(express.urlencoded({ 
        extended: true, 
        limit: jsonLimit 
      }));
    }

    // Custom middlewares
    customMiddlewares.forEach(middleware => {
      if (typeof middleware === 'function') {
        app.use(middleware);
      }
    });

    return {
      app,
      
      // Helper to add routes with authentication middleware
      addAuthenticatedRoutes: (path, router, allowedTypes = []) => {
        const authentication = require('./authentication');
        app.use(path, 
          authentication.authenticateToken(serviceConfig.auth, allowedTypes),
          router
        );
      },

      // Helper to add public routes
      addPublicRoutes: (path, router) => {
        app.use(path, router);
      },

      // Helper para configurar manejo de errores al final
      setupErrorHandling: () => {
        if (enableErrorHandling) {
          // 404 handler
          app.use('*', errorHandling.notFoundHandler(serviceConfig.serviceName));
          
          // Global error handler
          app.use(errorHandling.errorHandler(serviceConfig.serviceName));
        }
      },

      // Helper para iniciar el servidor
      listen: (port, callback) => {
        const server = app.listen(port, () => {
          console.log(`🚀 ${serviceConfig.serviceName} iniciado en puerto ${port}`);
          console.log(`📊 Health check: http://localhost:${port}/health`);
          if (callback) callback(server);
        });

        // Graceful shutdown
        const gracefulShutdown = (signal) => {
          console.log(`🛑 ${serviceConfig.serviceName} recibió ${signal}. Cerrando...`);
          server.close(() => {
            console.log(`✅ ${serviceConfig.serviceName} cerrado correctamente`);
            process.exit(0);
          });
        };

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

        return server;
      }
    };
  };
};
