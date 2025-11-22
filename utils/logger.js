// Simple logging utility
class Logger {
  static info(message, data = null) {
    console.log(`ℹ️  [INFO] ${new Date().toISOString()}: ${message}`, data || '');
  }

  static error(message, error = null) {
    console.error(`❌ [ERROR] ${new Date().toISOString()}: ${message}`, error || '');
  }

  static warn(message, data = null) {
    console.warn(`⚠️  [WARN] ${new Date().toISOString()}: ${message}`, data || '');
  }

  static success(message, data = null) {
    console.log(`✅ [SUCCESS] ${new Date().toISOString()}: ${message}`, data || '');
  }

  // Webapp-specific logging
  static webapp(webappId, message, data = null) {
    console.log(`🌐 [${webappId?.toUpperCase()}] ${new Date().toISOString()}: ${message}`, data || '');
  }

  // OTP-specific logging
  static otp(phone, action, data = null) {
    const maskedPhone = phone ? `${phone.substring(0, 6)}...` : 'unknown';
    console.log(`📱 [OTP] ${action} for ${maskedPhone}`, data || '');
  }

  // Order-specific logging
  static order(orderId, action, data = null) {
    console.log(`📦 [ORDER] ${action} - ${orderId}`, data || '');
  }
}

module.exports = Logger;