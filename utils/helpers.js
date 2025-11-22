// Common utility functions
class Helpers {
  // Format phone number
  static formatPhone(phone) {
    if (!phone) return null;
    // Ensure phone starts with +
    return phone.startsWith('+') ? phone : `+${phone}`;
  }

  // Generate unique ID
  static generateId(prefix = '') {
    return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  }

  // Validate email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone
  static isValidPhone(phone) {
    const phoneRegex = /^\+\d{10,15}$/;
    return phoneRegex.test(phone);
  }

  // Format order data for logging (remove sensitive info)
  static sanitizeOrderData(orderData) {
    const sanitized = { ...orderData };
    // Remove sensitive fields if any
    delete sanitized.otp;
    delete sanitized.verificationId;
    return sanitized;
  }

  // Calculate OTP expiry time
  static getOTPExpiry(minutes = 10) {
    return new Date(Date.now() + minutes * 60 * 1000);
  }

  // Delay function
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Helpers;