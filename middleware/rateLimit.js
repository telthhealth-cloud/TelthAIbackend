// const rateLimit = require('express-rate-limit');
// const constants = require('../config/constants');

// // OTP generation rate limiting
// const otpGenerationLimiter = rateLimit({
//   windowMs: constants.RATE_LIMIT.OTP_GENERATION.windowMs,
//   max: constants.RATE_LIMIT.OTP_GENERATION.max,
//   message: {
//     success: false,
//     message: 'Too many OTP generation attempts. Please try again later.'
//   },
//   standardHeaders: true,
//   legacyHeaders: false
// });

// // OTP verification rate limiting
// const otpVerificationLimiter = rateLimit({
//   windowMs: constants.RATE_LIMIT.OTP_VERIFICATION.windowMs,
//   max: constants.RATE_LIMIT.OTP_VERIFICATION.max,
//   message: {
//     success: false,
//     message: 'Too many OTP verification attempts. Please try again later.'
//   },
//   standardHeaders: true,
//   legacyHeaders: false
// });

// // General API rate limiting
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: {
//     success: false,
//     message: 'Too many requests from this IP. Please try again later.'
//   }
// });

// module.exports = {
//   otpGeneration: otpGenerationLimiter,
//   otpVerification: otpVerificationLimiter,
//   api: apiLimiter
// };

const rateLimit = require('express-rate-limit');
const constants = require('../config/constants');

const api = rateLimit({
  windowMs: constants.RATE_LIMIT.API.windowMs,
  max: constants.RATE_LIMIT.API.max,
  message: { success: false, message: 'Too many requests' },
  standardHeaders: true,
  legacyHeaders: false
});

const otpGeneration = rateLimit({
  windowMs: constants.RATE_LIMIT.OTP_GENERATION.windowMs,
  max: constants.RATE_LIMIT.OTP_GENERATION.max,
  message: { success: false, message: 'Too many OTP attempts' },
  standardHeaders: true,
  legacyHeaders: false
});

const contactSubmission = rateLimit({
  windowMs: 5 * 60 * 60 * 1000, // 5 hours
  max: 5, // 5 requests per IP
  message: { 
    success: false, 
    message: 'Maximum 5 contact submissions allowed per 5 hours. Please try again later.' 
  },
  standardHeaders: true,
  legacyHeaders: false
});
module.exports = { api, otpGeneration,contactSubmission };
