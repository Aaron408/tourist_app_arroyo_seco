# @mono-repo/shared-middleware

Shared middleware for mono-repo microservices. Provides standardized JWT authentication, validation, security, logging, and error handling.

## Table of Contents

- [Installation](#installation)
- [How createMiddleware Works](#how-createmiddleware-works)
- [Basic Usage](#basic-usage)
- [Configuration](#configuration)
- [CORS & Frontend Integration](#cors--frontend-integration)
- [Available Middlewares](#available-middlewares)
- [Utilities](#utilities)
- [Migration from Existing Middleware](#migration-from-existing-middleware)
- [Troubleshooting](#troubleshooting)
- [Development](#development)

## Installation

```bash
# In the package directory
npm install

# In each microservice
npm install file:../shared/middleware-package
```

## How createMiddleware Works

The `createMiddleware` function is a factory that creates a complete middleware configuration for your microservice. It centralizes authentication, security, logging, and validation in a single, reusable configuration.

### Architecture Overview

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Your Microservice │───▶│  createMiddleware   │───▶│  Database Pool      │
│                     │    │                     │    │  (JWT Validation)   │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
                                       │
                                       ▼
                           ┌─────────────────────┐
                           │ Configured          │
                           │ Middleware Suite:   │
                           │ • Authentication    │
                           │ • Security Headers  │
                           │ • Rate Limiting     │
                           │ • Logging           │
                           │ • Error Handling    │
                           │ • Validation        │
                           └─────────────────────┘
```

### Database Connection Flow

1. **Initial Setup**: The middleware is created with `databasePool: null`
2. **Database Connection**: Your service connects to the database
3. **Pool Assignment**: The database pool is assigned to `middleware.config.auth.databasePool`
4. **Token Validation**: JWT tokens are validated against the database for user status and permissions

```javascript
//Step 1: Create middleware (before DB connection)
const middleware = createMiddleware({
  serviceName: 'security-service',
  jwtSecret: process.env.JWT_SECRET,
  databasePool: null //Initially null
});

//Step 2: Connect to database
const dbConnected = await connectDatabase();

//Step 3: Assign database pool so middleware can validate tokens
if (dbConnected) {
  const { pool } = require("./config/database");
  middleware.config.auth.databasePool = pool;
}
```

### JWT Token Validation Process

When a request with a JWT token arrives:

1. **Token Extraction**: Extracts Bearer token from Authorization header
2. **JWT Verification**: Verifies token signature with `jwtSecret`
3. **Database Validation** (if pool provided):
   - Checks if user is active in database
   - Updates user's last activity timestamp
   - Validates user permissions for protected routes
4. **Request Enhancement**: Adds user info to `req.user` object

```javascript
//Token validation flow
req.headers.authorization
    ↓
JWT.verify(token, jwtSecret) //Verify signature
    ↓
Database.checkUserActive(userId) //Check if user is active
    ↓
Database.updateLastActivity(userId) //Update activity
    ↓
req.user = { userId, email, sessionId, ... } //Enhance request
```

## Basic Usage

### Option 1: Factory Configuration (Recommended)

```javascript
const { createMiddleware } = require('@mono-repo/shared-middleware');

//Configure middleware for your service
const middleware = createMiddleware({
  serviceName: 'security-service',
  jwtSecret: process.env.JWT_SECRET,
  databasePool: require('./config/database').pool,
  corsOrigin: true,
  rateLimitMax: 100
});

const express = require('express');
const app = express();

//Automatic Express configuration
const expressHelper = middleware.setupExpressApp({
  enableCompression: true,
  enableSecurity: true,
  enableLogging: true
});

const { app: configuredApp, addAuthenticatedRoutes, addPublicRoutes, setupErrorHandling, listen } = expressHelper;

//Public routes
const publicRoutes = express.Router();
publicRoutes.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'security-service' });
});
addPublicRoutes('/api', publicRoutes);

//Authenticated routes
const authRoutes = express.Router();
authRoutes.get('/profile', (req, res) => {
  res.json({ user: req.user });
});
addAuthenticatedRoutes('/api/auth', authRoutes, ['Owner', 'Leader']);

//Setup error handling
setupErrorHandling();

//Start server
listen(process.env.PORT || 3000);
```

### Option 2: Individual Middleware

```javascript
const { 
  createMiddleware,
  ResponseUtils,
  ValidationUtils 
} = require('@mono-repo/shared-middleware');

const express = require('express');
const app = express();

//Create configured middleware
const middleware = createMiddleware({
  serviceName: 'my-service',
  jwtSecret: process.env.JWT_SECRET,
  databasePool: myDatabasePool
});

//Use individual middlewares
app.use(middleware.securityHeaders());
app.use(middleware.requestLogger());

//Route with authentication
app.get('/protected', 
  middleware.authenticateToken(['Owner']),
  (req, res) => {
    ResponseUtils.success(res, 200, 'Access granted', {
      user: req.user
    });
  }
);

//Route with validation
app.post('/register',
  middleware.validateInput(ValidationUtils.validateUserRegistration),
  middleware.sanitizeInput(['firstName', 'lastName']),
  (req, res) => {
    //Registration logic
    ResponseUtils.created(res, 'User created', { id: 123 });
  }
);

//Error handling
app.use(middleware.notFoundHandler());
app.use(middleware.errorHandler());
```

## Configuration

### Configuration Options

```javascript
const config = {
  //Authentication (required)
  serviceName: 'my-service',           //Service name
  jwtSecret: 'your-jwt-secret',        //JWT secret (required)
  sessionTimeout: '24h',               //Session duration
  databasePool: postgresPool,          //Database pool (optional)

  //Security & CORS
  corsOrigin: [                        //CORS configuration (specific origins recommended)
    'http://localhost:5173',           //Vite dev server
    'http://localhost:3000',           //React dev server
    'http://127.0.0.1:5173',          //Alternative localhost
    'http://127.0.0.1:3000'           //Alternative localhost
  ],
  rateLimitWindow: 15,                 //Rate limit window (minutes)
  rateLimitMax: 100,                   //Max requests per window
  maxFileSize: 10 * 1024 * 1024,      //Maximum file size
  helmetOptions: {},                   //Additional Helmet options

  //Logging
  loggingFormat: 'combined',           //Log format
  enableMetrics: false,                //Enable basic metrics
  skipHealthChecks: true               //Skip logs for health checks
};
```

### Database Integration

The middleware integrates with your database through a connection pool. Here's how to set it up properly:

#### Step 1: Initialize Middleware (Before DB Connection)

```javascript
//server.js
const { createMiddleware } = require('@mono-repo/shared-middleware');

const middleware = createMiddleware({
  serviceName: 'security-service',
  jwtSecret: process.env.JWT_SECRET,
  databasePool: null //Initially null, will be set after DB connection
});
```

#### Step 2: Connect to Database

```javascript
//Connect to your database
const { connectDatabase } = require("./services/database.service");

async function startServer() {
  const dbConnected = await connectDatabase();
  
  if (dbConnected) {
    //Assign the database pool to middleware
    const { pool } = require("./config/database");
    middleware.config.auth.databasePool = pool;
    console.log("✅ Middleware configured with database connection");
  }
}
```

#### Step 3: Database Schema Requirements

Your database should have the following structure for user validation:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'inactive', 'suspended'
  rol VARCHAR(100) DEFAULT 'User',     -- 'Owner', 'Leader', 'User', etc.
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table (optional, for session management)
CREATE TABLE login_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);
```

#### Step 4: Token Validation Flow

When a protected route is accessed:

```javascript
//1. Extract token from header
const token = req.headers.authorization; //"Bearer eyJhbGciOiJIUzI1NiIs..."

//2. Verify JWT signature
const decoded = jwt.verify(token, jwtSecret);
//decoded = { userId: 123, email: 'user@example.com', sessionId: 'abc123', ... }

//3. Check user status in database (if pool provided)
const query = 'SELECT status, rol FROM users WHERE id = $1 AND status = $2';
const result = await pool.query(query, [decoded.userId, 'active']);

//4. Update last activity
const updateQuery = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1';
await pool.query(updateQuery, [decoded.userId]);

//5. Add user info to request
req.user = {
  userId: decoded.userId,
  email: decoded.email,
  rol: result.rows[0].rol,
  sessionId: decoded.sessionId
};
```

## CORS & Frontend Integration

### Setting up CORS for Frontend Communication

The middleware package includes comprehensive CORS support for seamless frontend-backend communication. Here's how to configure it properly:

#### Recommended CORS Configuration

```javascript
//server.js
const middleware = createMiddleware({
  serviceName: 'security-service',
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: [
    'http://localhost:5173',    //Vite dev server
    'http://127.0.0.1:5173',   //Alternative localhost
    //Here should be microservices URL's (Analytics, Security, Device-manager, etc.)
  ]
});

//Additional CORS handling for preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});
```

#### Frontend Axios Configuration

```javascript
//Api.jsx
import axios from "axios";

const getToken = () => {
  const userData = JSON.parse(localStorage.getItem("monoRepoUserData"));
  return userData ? userData.token : null;
};

export const SecurityApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

//Setup interceptors for automatic token handling
const setupInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && 
          !error.config.url.includes("/api/login")) {
        localStorage.removeItem("monoRepoUserData");
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );
};

setupInterceptors(SecurityApi);
```

#### Common CORS Issues and Solutions

1. **"CORS policy error"**: Ensure your frontend origin is included in `corsOrigin` array
2. **Preflight requests failing**: Add the `app.options('*', ...)` handler shown above
3. **Token not being sent**: Check that Authorization header is properly set in Axios interceptors
4. **Cookies not working**: Set `withCredentials: true` if you need cookie support

### Testing CORS Setup

Create a simple test endpoint to verify CORS is working:

```javascript
//In your routes file
router.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello from Security Service",
    timestamp: new Date().toISOString(),
    service: "security-service"
  });
});
```

Test from frontend:
```javascript
//Dashboard.jsx
useEffect(() => {
  const testConnection = async () => {
    try {
      const response = await SecurityApi.get('/api/hello');
      console.log('CORS test successful:', response.data);
    } catch (error) {
      console.error('CORS test failed:', error);
    }
  };
  testConnection();
}, []);
```

## Available Middlewares

### Authentication

```javascript
//JWT authentication with optional user types
middleware.authenticateToken(['Owner', 'Leader'])

//Check if user is active
middleware.checkUserActive(userId, pool)

//Update last activity
middleware.updateLastActivity(userId, pool)
```

### Validation

```javascript
//Validate input with custom function
middleware.validateInput(validationFunction)

//Validate pagination parameters
middleware.validatePagination()

//Sanitize specific fields
middleware.sanitizeInput(['firstName', 'lastName'])
```

### Security

```javascript
//Complete security setup
middleware.setupSecurity()

//Custom security headers
middleware.securityHeaders()

//Custom rate limiting
middleware.rateLimiter({ max: 50, windowMs: 10 * 60 * 1000 })
```

### Logging

```javascript
//Basic logging
middleware.requestLogger()

//Error logging
middleware.errorLogger()

//Basic metrics
middleware.metricsLogger()
```

### Error Handling

```javascript
//Global error handler
middleware.errorHandler()

//Handler for not found routes
middleware.notFoundHandler()

//Wrapper for async functions
middleware.asyncHandler(async (req, res) => {
  //Your async code here
})
```

## Utilities

### ResponseUtils

```javascript
const { ResponseUtils } = middleware;

//Successful responses
ResponseUtils.success(res, 200, 'Operation successful', { data: 'value' });
ResponseUtils.created(res, 'Resource created', { id: 123 });

//Error responses
ResponseUtils.error(res, 500, 'Internal error');
ResponseUtils.validationError(res, 'Invalid data', ['email required']);
ResponseUtils.unauthorized(res, 'Invalid token');
ResponseUtils.forbidden(res, 'Access denied');
ResponseUtils.notFound(res, 'Resource not found');
ResponseUtils.conflict(res, 'Resource already exists');
```

### ValidationUtils

```javascript
const { ValidationUtils } = middleware;

//Basic validations
ValidationUtils.isValidEmail('test@example.com');
ValidationUtils.validatePassword('password123', { minLength: 8 });
ValidationUtils.validateRequiredFields(data, ['email', 'password']);

//Complex validations
ValidationUtils.validateUserRegistration(userData);
ValidationUtils.sanitizeInput('<script>alert("xss")</script>');
```

## Migration from Existing Middleware

### Step 1: Install shared package

```bash
npm install file:../shared/middleware-package
```

### Step 2: Update imports

```javascript
//Before
const { authenticateToken } = require('./middleware/middleware');
const ResponseUtils = require('./utils/responseUtils');

//After
const { createMiddleware } = require('@mono-repo/shared-middleware');
const middleware = createMiddleware({
  serviceName: 'security-service',
  jwtSecret: process.env.JWT_SECRET,
  databasePool: require('./config/database').pool
});
```

### Step 3: Update usage

```javascript
//Before
app.use(authenticateToken());

//After
app.use(middleware.authenticateToken());
```

### Complete Migration Example

Here's a complete example of migrating the security microservice:

```javascript
//Before migration - server.js
const express = require('express');
const cors = require('cors');
const { authenticateToken } = require('./middleware/middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authenticateToken(), authRoutes);

//After migration - server.js
const { createMiddleware } = require('@mono-repo/shared-middleware');
const { connectDatabase } = require("./services/database.service");

//Configure shared middleware
const middleware = createMiddleware({
  serviceName: 'security-service',
  jwtSecret: process.env.JWT_SECRET,
  databasePool: null,
  corsOrigin: [
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  rateLimitMax: 100,
  loggingFormat: 'combined'
});

//Automatic Express configuration
const expressHelper = middleware.setupExpressApp({
  enableCompression: true,
  enableSecurity: true,
  enableLogging: process.env.NODE_ENV !== 'test'
});

const { app, addPublicRoutes, addAuthenticatedRoutes, setupErrorHandling, listen } = expressHelper;

//Routes configuration
addPublicRoutes("/api", publicRoutes);
addAuthenticatedRoutes("/api/auth", authRoutes, ['Owner', 'Leader']);

//Setup error handling
setupErrorHandling();

//Start server with database connection
async function startServer() {
  const dbConnected = await connectDatabase();
  if (dbConnected) {
    const { pool } = require("./config/database");
    middleware.config.auth.databasePool = pool;
  }
  
  const server = listen(8000, () => {
    console.log('✅ Security Service running on port 8000');
  });
  return server;
}

startServer();
```

### Frontend Integration Example

```javascript
//Api.jsx - Frontend configuration
import axios from "axios";

const SecurityApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

//Component usage - Dashboard.jsx
import { SecurityApi } from '../../../Api';

const testSecurityService = async () => {
  try {
    const response = await SecurityApi.get('/api/hello');
    console.log('Connection successful:', response.data.message);
  } catch (error) {
    console.error('Connection failed:', error);
  }
};
```

## Troubleshooting

### Common Issues and Solutions

#### CORS Errors
- **Error**: "CORS policy: Cross origin requests are blocked"
- **Solution**: Ensure frontend origin is added to `corsOrigin` array in middleware configuration
- **Example**: Add `'http://localhost:5173'` for Vite development server

#### Authentication Issues  
- **Error**: "Token not provided" or "Invalid token"
- **Solution**: Check that Axios interceptors are properly configured to send Authorization header
- **Verify**: Token is being stored correctly in localStorage as `"monoRepoUserData"`

#### Database Connection Issues
- **Error**: Database middleware not working
- **Solution**: Ensure database pool is assigned after connection: `middleware.config.auth.databasePool = pool`
- **Check**: Database connection is established before assigning to middleware

#### Rate Limiting Issues
- **Error**: "Too many requests" on development
- **Solution**: Increase rate limit for development or disable in test environment
- **Config**: Set higher `rateLimitMax` value or skip rate limiting in development

#### Logging Issues
- **Error**: No logs appearing
- **Solution**: Ensure logging is enabled: `enableLogging: process.env.NODE_ENV !== 'test'`
- **Check**: Logging format is set correctly in middleware configuration

### Development Tips

1. **Enable detailed error messages in development**:
   ```javascript
   const middleware = createMiddleware({
     serviceName: 'my-service',
     //... other config
   });
   
   //In development, log more details
   if (process.env.NODE_ENV === 'development') {
     app.use((err, req, res, next) => {
       console.error('Detailed error:', err);
       next(err);
     });
   }
   ```

2. **Test CORS quickly**:
   ```bash
   curl -H "Origin: http://localhost:5173" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: X-Requested-With" \
        -X OPTIONS \
        http://localhost:8000/api/hello
   ```

3. **Verify middleware order**:
   - CORS should be first
   - Authentication before protected routes
   - Error handling should be last

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build (if needed)
npm run build
```

## Project Structure

```
src/
├── authentication.js    # JWT authentication middleware
├── validation.js       # Validation middleware
├── security.js         # Security middleware
├── logging.js          # Logging middleware
├── errorHandling.js    # Error handling
├── utils.js           # Utilities (ResponseUtils, ValidationUtils)
├── config.js          # Centralized configuration
└── expressSetup.js    # Helper to configure Express
```
