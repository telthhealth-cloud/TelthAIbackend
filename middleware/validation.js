const Joi = require('joi');

// OTP generation validation
const otpGenerationSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^\+\d{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must include country code (e.g., +919876543210)',
      'any.required': 'Phone number is required'
    }),
  webappId: Joi.string().valid('webapp1', 'webapp2').required()
});

// OTP verification validation
const otpVerificationSchema = Joi.object({ 
  phoneNumber: Joi.string()
    .pattern(/^\+\d{10,15}$/)        
    .required(),
  otp: Joi.string()
    .length(6)
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.length': 'OTP must be 6 digits',
      'string.pattern.base': 'OTP must contain only numbers'
    }),
  webappId: Joi.string().valid('webapp1', 'webapp2').required(),
  userData: Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^\+\d{10,15}$/).optional(),
    otherFields: Joi.any().optional()
  }).optional()
});

// Order submission validation
const orderSubmissionSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+\d{10,15}$/).required(),
  category: Joi.string().valid('Basic', 'Advanced', 'Multispecialty').required(),
  selectedColor: Joi.string().required(),
  hubs: Joi.object().required(),
  selectedDevices: Joi.array().optional(),
  timestamp: Joi.string().isoDate().required()

});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    next();
  };
};

module.exports = {
  validateOTPGeneration: validate(otpGenerationSchema),
  validateOTPVerification: validate(otpVerificationSchema),
  validateOrderSubmission: validate(orderSubmissionSchema)
};