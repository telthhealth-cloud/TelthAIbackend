module.exports = {
  OTP: {
    LENGTH: 6,
    EXPIRY_MINUTES: 10,
    MAX_ATTEMPTS: 3
  },
  RATE_LIMIT: {
    API: { windowMs: 15 * 60 * 1000, max: 100 }, // 100 requests per 15 minutes
    OTP_GENERATION: { windowMs: 1 * 60 * 1000, max: 3 },
    OTP_VERIFICATION: { windowMs: 5 * 60 * 1000, max: 10 }
  },
  FRESHDESK: {
    PRIORITY: 2,
    STATUS: 2,
    SOURCE: 2
  }
};
