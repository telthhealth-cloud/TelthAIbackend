const app = require('./app');
const Logger = require('./utils/logger');
const otpService = require('./services/otpService');
const firebaseService = require('./services/firebaseService');


const PORT = process.env.PORT || 8000;

// Start server
const server = app.listen(PORT, () => {
  Logger.success(`🚀 Medical Backend Server started on port ${PORT}`);
  Logger.info(`📍 Health check: http://localhost:${PORT}/health`);
  Logger.info(`📍 WebApp1 API: http://localhost:${PORT}/api/v1/webapp1`);
  Logger.info(`📍 WebApp2 API: http://localhost:${PORT}/api/v1/webapp2`);
  
  // Log environment
  Logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  Logger.info(`Firebase Project: ${process.env.FIREBASE_PROJECT_ID || 'Not configured'}`);
  Logger.info(`Freshdesk Domain: ${process.env.FRESHDESK_DOMAIN || 'Not configured'}`);
});

// Cleanup OTP store every hour
setInterval(() => {
  // otpService.cleanupExpiredOTPs();
  Logger.info('🧹 Cleaned up expired OTPs');
}, 60 * 60 * 1000);

// Graceful shutdown
process.on('SIGTERM', () => {
  Logger.info('SIGTERM received, shutting down gracefully');   
  server.close(() => {
    Logger.success('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  Logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    Logger.success('Server closed');
    process.exit(0);
  });
});

// Unhandled promise rejection
process.on('unhandledRejection', (err) => {
  Logger.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});


// Uncaught exception
process.on('uncaughtException', (err) => {
  Logger.error('Uncaught Exception:', err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;