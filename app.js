const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('./middleware/rateLimit');
require('dotenv').config();
const webapp1ContactRoutes = require('./routes/v1/webapp1/contact');


// Import routes
const webapp1AuthRoutes = require('./routes/v1/webapp1/auth');
const webapp1OrderRoutes = require('./routes/v1/webapp1/orders');
// const webapp2AuthRoutes = require('./routes/v1/webapp2/auth'); // Comment out for now
// const webapp2OrderRoutes = require('./routes/v1/webapp2/orders'); // Comment out for now

const app = express();

// Security middleware
app.use(helmet());
const allowedOrigins = [
  "https://telth.ai",
  "https://www.telth.ai",
  "https://accounts.google.com/o/oauth2/auth",
];
// CORS configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.set('trust proxy', true); // ← ADD THIS LINE

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// General rate limiting
app.use(rateLimit.api);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Medical Backend Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ✅ CORRECT: API routes with base paths
app.use('/api/v1/webapp1/auth', webapp1AuthRoutes);
app.use('/api/v1/webapp1/orders', webapp1OrderRoutes);
app.use('/api/v1/webapp1/contact', webapp1ContactRoutes);

// app.use('/api/v1/webapp2/auth', webapp2AuthRoutes); // Comment out for now
// app.use('/api/v1/webapp2/orders', webapp2OrderRoutes); // Comment out for now

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Medical Backend API',
    version: '1.0.0',
    endpoints: {
      webapp1: {
        auth: '/api/v1/webapp1/auth',
        orders: '/api/v1/webapp1/orders'
      },
      webapp2: {
        auth: '/api/v1/webapp2/auth - COMING SOON',
        orders: '/api/v1/webapp2/orders - COMING SOON'
      },
      health: '/health'
    }
  });
});

// Remove the debug console.log statements that might be causing issues
// console.log('Checking route imports:'); // Remove these
// console.log('webapp1AuthRoutes:', webapp1AuthRoutes); // Remove these

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  // CORS error
  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS policy: Origin not allowed'
    });
  }

  // Default error
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

module.exports = app;