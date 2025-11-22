const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/authController');
const { 
  validateOTPGeneration, 
  validateOTPVerification 
} = require('../../../middleware/validation');

// OTP Routes
router.post('/otp/generate', validateOTPGeneration, (req, res) => {
  req.body.webappId = 'webapp2'; // Different webapp ID
  authController.generateOTP(req, res);
});

router.post('/otp/verify', validateOTPVerification, (req, res) => {
  req.body.webappId = 'webapp2'; // Different webapp ID
  authController.verifyOTP(req, res);
});

// Email/Password Routes
router.post('/signup', (req, res) => {
  req.body.webappId = 'webapp2';
  authController.signUp(req, res);
});

router.post('/signin', (req, res) => {
  req.body.webappId = 'webapp2';
  authController.signIn(req, res);
});

// Profile Routes
router.get('/profile/:firebaseUID', (req, res) => {
  req.params.webappId = 'webapp2';
  authController.getProfile(req, res);
});

module.exports = router;