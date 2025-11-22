// services/otpService.js
const { auth } = require('../config/firebase');

class OTPService {
  constructor() {
    // We'll use Firebase's built-in phone auth, no need to store OTPs
  }

  // // Generate OTP - Actually sends SMS via Firebase
  // async generateOTP(phoneNumber) {
  //   try {
  //     console.log('📱 Firebase sending OTP to:', phoneNumber);
      
  //     // In a real implementation, you would:
  //     // 1. Use Firebase Admin to create a custom token
  //     // 2. Or use Firebase Client SDK on frontend to send OTP
      
  //     // For now, we'll simulate successful OTP send
  //     // In production, this would integrate with Firebase Phone Auth
      
  //     return {
  //       success: true,
  //       message: 'OTP sent successfully',
  //       expiresIn: 120, // 2 minutes
  //       // Note: Actual OTP verification happens on frontend with Firebase Client SDK
  //     };
  //   } catch (error) {
  //     console.error('OTP generation error:', error);
  //     throw new Error(`Failed to send OTP: ${error.message}`);
  //   }
  // }

  // // Verify OTP - This would normally be handled by Firebase Client SDK
  // // We'll use this to verify the Firebase ID token from frontend
  // async verifyOTP(phoneNumber, idToken) {
  //   try {
  //     // Verify the Firebase ID token
  //     const decodedToken = await auth.verifyIdToken(idToken);
      
  //     console.log('✅ Firebase OTP verified for:', decodedToken.phone_number);
      
  //     if (decodedToken.phone_number !== phoneNumber) {
  //       return {
  //         success: false,
  //         message: 'Phone number mismatch'
  //       };
  //     }

  //     return {
  //       success: true,
  //       message: 'OTP verified successfully',
  //       uid: decodedToken.uid
  //     };
  //   } catch (error) {
  //     console.error('OTP verification error:', error);
  //     return {
  //       success: false,
  //       message: 'Invalid OTP or token'
  //     };
  //   }
  // }

  // // Alternative simple OTP verification for testing
  // async verifyTestOTP(phoneNumber, otp) {
  //   // For testing/demo - accept any 6-digit OTP
  //   if (otp.length === 6 && /^\d+$/.test(otp)) {
  //     return {
  //       success: true,
  //       message: 'OTP verified successfully (test mode)'
  //     };
  //   } else {
  //     return {
  //       success: false,
  //       message: 'Invalid OTP format'
  //     };
  //   }
  // }
  // REPLACE the verifyPhoneAuth method with this:
async verifyPhoneAuth(idToken, phoneNumber) {
  try {
    console.log('🔐 Verifying Firebase ID token for:', phoneNumber);
    
    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    console.log('✅ Firebase token verified for:', decodedToken.phone_number);
    
    // Verify phone number matches
    if (decodedToken.phone_number !== phoneNumber) {
      return {
        success: false,
        message: 'Phone number mismatch'
      };
    }

    return {
      success: true,
      uid: decodedToken.uid,
      phoneNumber: decodedToken.phone_number
    };
  } catch (error) {
    console.error('Firebase token verification error:', error);
    return {
      success: false,
      message: 'Invalid or expired token'
    };
  }
}


}

module.exports = new OTPService();