// controllers/authController.js
const otpService = require('../services/otpService');
const firebaseService = require('../services/firebaseService');

class AuthController {
  
 
  //   try {
  //     const { phoneNumber, idToken, webappId, userData = {} } = req.body;

  //     console.log('🔐 Verifying Phone Auth for:', phoneNumber);

  //     // 1. Verify the Firebase ID Token
  //     const authResult = await otpService.verifyPhoneAuth(idToken, phoneNumber);
      
  //     if (!authResult.success) {
  //       return res.status(401).json(authResult);
  //     }

  //     console.log('✅ Phone verified by Firebase:', authResult.phoneNumber);

  //     // 2. Create/Get user in our system
  //     const userResult = await firebaseService.otpSignIn(
  //       webappId, 
  //       phoneNumber, 
  //       userData,
  //       authResult.uid
  //     );

  //     res.json({
  //       success: true,
  //       message: userResult.message,
  //       user: userResult.user,
  //       isNewUser: userResult.isNewUser,
  //       firebaseUID: authResult.uid,
  //       phoneVerified: true
  //     });

  //   } catch (error) {
  //     console.error('verifyPhoneAuth error:', error);
  //     res.status(500).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }
  // UPDATE the verifyPhoneAuth method to handle order data
async verifyPhoneAuth(req, res) {
  try {
    const { phoneNumber, idToken, webappId, userData = {}, orderData } = req.body;

    console.log('🔐 Verifying Phone Auth for:', phoneNumber);

    // 1. Verify the Firebase ID Token
    const authResult = await otpService.verifyPhoneAuth(idToken, phoneNumber);
    
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    console.log('✅ Phone verified by Firebase:', authResult.phoneNumber);

    // 2. Create/Get user in our system
    const userResult = await firebaseService.otpSignIn(
      webappId, 
      phoneNumber, 
      userData,
      authResult.uid
    );

    // 3. If order data provided, process the order
    let orderResult = null;
    if (orderData) {
      console.log('📦 Processing order along with authentication');
      const orderController = require('./orderController');
      
      // Create mock request/response for order controller
      const orderReq = {
        params: { webappId },
        body: { ...orderData, phone: phoneNumber }
      };
      
      const orderRes = {
        json: (result) => {
          orderResult = result;
        }
      };
      
      await orderController.submitOrder(orderReq, orderRes);
    }

    res.json({
      success: true,
      message: userResult.message,
      user: userResult.user,
      isNewUser: userResult.isNewUser,
      firebaseUID: authResult.uid,
      phoneVerified: true,
      order: orderResult // Include order result if processed
    });

  } catch (error) {
    console.error('verifyPhoneAuth error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
}

module.exports = new AuthController();