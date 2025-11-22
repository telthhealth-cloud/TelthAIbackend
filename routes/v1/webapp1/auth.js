const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/authController');

const { 
  validateOTPGeneration, 
  validateOTPVerification 
} = require('../../../middleware/validation');

// OTP Routes
router.post('/otp/generate', validateOTPGeneration, (req, res) => {
  req.body.webappId = 'webapp1'; // Inject webapp ID
  authController.generateOTP(req, res);
});

router.post('/otp/verify', validateOTPVerification, (req, res) => {
  req.body.webappId = 'webapp1'; // Inject webapp ID
  authController.verifyOTP(req, res);
});
// ADD THIS ROUTE to connect frontend to backend
// router.post('/phone/verify', (req, res) => {
//   req.body.webappId = 'webapp1';
//   authController.verifyPhoneAuth(req, res); // Use existing method
// });

// Email/Password Routes
router.post('/signup', (req, res) => {
  req.body.webappId = 'webapp1';
  authController.signUp(req, res);
}); 

router.post('/phone/verify', (req, res) => {
  console.log('📞 Phone verify route hit!');
  req.body.webappId = 'webapp1';
  authController.verifyPhoneAuth(req, res);
});

// Add a test route to verify the router is working
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});


router.post('/signin', (req, res) => {
  req.body.webappId = 'webapp1';
  authController.signIn(req, res);
});

// Profile Routes
router.get('/profile/:firebaseUID', (req, res) => {
  req.params.webappId = 'webapp1';
  authController.getProfile(req, res);
});

module.exports = router;