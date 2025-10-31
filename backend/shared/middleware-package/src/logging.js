const morgan = require("morgan");

/**
 * Sets up custom logging
 * @param {Object} options - Configuration options
 * @returns {Function} - Logging middleware
 */
const setupLogging = (options = {}) => {
  const {
    format = 'combined',
    serviceName = 'unknown-service',
    skip = null,
    stream = null
  } = options;

  // Custom format that includes service name
  const customFormat = `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" [${serviceName}] :response-time ms`;

  return morgan(format === 'custom' ? customFormat : format, {
    skip: skip || ((req, res) => {
      // Skip health checks and static assets by default
      return req.url === '/health' || 
             req.url.startsWith('/static') || 
             req.url.startsWith('/favicon');
    }),
    stream: stream || process.stdout
  });
};

/**
 * Middleware for custom request logging
 * @param {string} serviceName - Service name
 * @returns {Function} - Express middleware
 */
const requestLogger = (serviceName = 'unknown-service') => {
  return (req, res, next) => {
    const startTime = Date.now();
    
    // Log incoming request
    console.log(`[${serviceName}] ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    
    // Capture response
    const originalSend = res.send;
    res.send = function(body) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log(`[${serviceName}] ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`);
      
      return originalSend.call(this, body);
    };
    
    next();
  };
};

/**
 * Middleware for error logging
 * @param {string} serviceName - Service name
 * @returns {Function} - Express middleware
 */
const errorLogger = (serviceName = 'unknown-service') => {
  return (err, req, res, next) => {
    console.error(`[${serviceName}] ERROR: ${new Date().toISOString()}`);
    console.error(`[${serviceName}] Request: ${req.method} ${req.originalUrl}`);
    console.error(`[${serviceName}] IP: ${req.ip}`);
    console.error(`[${serviceName}] User-Agent: ${req.get('User-Agent')}`);
    console.error(`[${serviceName}] Error:`, err.stack || err.message);
    
    next(err);
  };
};

/**
 * Middleware for basic metrics logging
 * @param {string} serviceName - Service name
 * @returns {Function} - Express middleware
 */
const metricsLogger = (serviceName = 'unknown-service') => {
  let requestCount = 0;
  let errorCount = 0;
  const startupTime = Date.now();
  
  return (req, res, next) => {
    requestCount++;
    
    const originalSend = res.send;
    res.send = function(body) {
      if (res.statusCode >= 400) {
        errorCount++;
      }
      
      // Log metrics every 100 requests
      if (requestCount % 100 === 0) {
        const uptime = Date.now() - startupTime;
        console.log(`[${serviceName}] METRICS: Requests: ${requestCount}, Errors: ${errorCount}, Uptime: ${Math.round(uptime/1000)}s, Error Rate: ${((errorCount/requestCount)*100).toFixed(2)}%`);
      }
      
      return originalSend.call(this, body);
    };
    
    next();
  };
};

module.exports = {
  setupLogging,
  requestLogger,
  errorLogger,
  metricsLogger
};
