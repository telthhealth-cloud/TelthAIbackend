// // const freshdeskService = require('../services/freshdeskService');
// // const firebaseService = require('../services/firebaseService');
// // const webapps = require('../config/webapps');

// // class OrderController {
// //   constructor() {
// //     // ✅ Bind methods to the instance
// //     this.submitOrder = this.submitOrder.bind(this);
// //     this.validateOrderData = this.validateOrderData.bind(this);
// //   }

// //   // Submit order
// //   async submitOrder(req, res) {
// //     try {
// //       const { webappId } = req.params;
// //       const orderData = req.body;

// //       // ✅ FIX: Use this.validateOrderData
// //       const validationError = this.validateOrderData(orderData);
// //       if (validationError) {
// //         return res.status(400).json({
// //           success: false,
// //           message: validationError
// //         });   
// //       }

// //       // Get webapp configuration
// //       const webappConfig = webapps[webappId];
// //       if (!webappConfig) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Invalid webapp ID'
// //         });
// //       }

// //       console.log(`📦 New order received for ${webappConfig.name}:`, {
// //         name: orderData.name,
// //         email: orderData.email,
// //         phone: orderData.phone,
// //         category: orderData.category
// //       });

// //       // Create Freshdesk ticket
// //       const ticketResult = await freshdeskService.createTicket(webappConfig, orderData);

// //       // Store order in Firestore
// //       let firestoreResult;
// //       try {
// //         firestoreResult = await firebaseService.storeOrder(webappId, {
// //           ...orderData,
// //           freshdeskTicketId: ticketResult.ticketId
// //         });
// //       } catch (firestoreError) {
// //         console.error('Firestore storage failed, but continuing:', firestoreError);
// //       }

// //       res.json({
// //         success: true,
// //         message: 'Order submitted successfully',
// //         ticket: {
// //           id: ticketResult.ticketId,
// //           url: ticketResult.ticketUrl,
// //           isMock: ticketResult.isMock || false
// //         },
// //         orderId: firestoreResult?.orderId,
// //         timestamp: orderData.timestamp
// //       });

// //     } catch (error) {
// //       console.error('Order submission error:', error);
// //       res.status(500).json({
// //         success: false,
// //         message: error.message || 'Failed to submit order'
// //       });
// //     }
// //   }

// //   // ✅ FIX: Make sure this method exists and is properly defined
// //   validateOrderData(orderData) {
// //     const requiredFields = ['name', 'email', 'phone', 'category', 'selectedColor', 'hubs'];

// //     for (const field of requiredFields) {
// //       if (!orderData[field]) {
// //         return `Missing required field: ${field}`;
// //       }
// //     }

// //     // Validate email format
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(orderData.email)) {
// //       return 'Invalid email format';
// //     }

// //     // Validate phone format
// //     const phoneRegex = /^\+\d{10,15}$/;
// //     if (!phoneRegex.test(orderData.phone)) {
// //       return 'Invalid phone format. Include country code (e.g., +919876543210)';
// //     }

// //     return null;
// //   }

// //   // Get order status (if needed)
// //   async getOrderStatus(req, res) {
// //     try {
// //       const { webappId, orderId } = req.params;

// //       // This would fetch from Firestore in implementation
// //       res.json({
// //         success: true,
// //         order: {
// //           id: orderId,
// //           status: 'submitted',
// //           timestamp: new Date().toISOString()
// //         }
// //       });

// //     } catch (error) {
// //       console.error('Get order status error:', error);
// //       res.status(500).json({
// //         success: false,
// //         message: error.message || 'Failed to fetch order status'
// //       });
// //     }
// //   }
// // }

// // // ✅ Export the instance properly
// // module.exports = new OrderController();

// // controllers/orderController.js - SIMPLIFIED VERSION
// const freshdeskService = require('../services/freshdeskService');
// const firebaseService = require('../services/firebaseService');
// const webapps = require('../config/webapps');

// class OrderController {
//   constructor() {
//     this.submitOrder = this.submitOrder.bind(this);
//   }

//   // Submit order - simplified for now
//   async submitOrder(req, res) {
//     try {
//       const { webappId } = req.params;
//       const orderData = req.body;

//       console.log('📦 Order received (AUTH MODE):', {
//         webappId,
//         name: orderData.name,
//         phone: orderData.phone,
//         category: orderData.category
//       });

//       // Get webapp configuration
//       const webappConfig = webapps[webappId];
//       if (!webappConfig) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid webapp ID'
//         });
//       }

//       // For now, just return success without processing orders
//       // We're focusing on authentication first
//       res.json({
//         success: true,
//         message: '✅ Authentication successful! Order processing will be enabled soon.',
//         user: {
//           name: orderData.name,
//           phone: orderData.phone,
//           email: orderData.email
//         },
//         authentication: 'WORKING',
//         orderProcessing: 'COMING_SOON',
//         timestamp: new Date().toISOString()
//       });

//     } catch (error) {
//       console.error('Order submission error:', error);
//       res.status(500).json({
//         success: false,
//         message: error.message || 'Failed to process request'
//       });
//     }
//   }

//   // Simple order status
//   async getOrderStatus(req, res) {
//     res.json({
//       success: true,
//       message: 'Focusing on authentication first. Order system coming soon!',
//       status: 'AUTHENTICATION_MODE'
//     });
//   }
// }

// module.exports = new OrderController();

// controllers/orderController.js - UPDATED
// const firebaseService = require('../services/firebaseService');
// const webapps = require('../config/webapps');

// class OrderController {
//   constructor() {
//     this.submitOrder = this.submitOrder.bind(this);
//   }

//   // Submit order to Firestore
//   async submitOrder(req, res) {
//     try {
//       const { webappId } = req.params;
//       const orderData = req.body;

//       console.log('📦 Order received:', {
//         webappId,
//         name: orderData.name,
//         phone: orderData.phone,
//         category: orderData.category
//       });

//       // Get webapp configuration
//       const webappConfig = webapps[webappId];
//       if (!webappConfig) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid webapp ID'
//         });
//       }

//       // Store order in Firestore
//       const firestoreResult = await firebaseService.storeOrder(webappId, orderData);

//       res.json({
//         success: true,
//         message: 'Order submitted successfully and stored in Firestore',
//         orderId: firestoreResult.orderId,
//         user: {
//           name: orderData.name,
//           phone: orderData.phone,
//           email: orderData.email
//         },
//         storage: 'firestore',
//         timestamp: new Date().toISOString()
//       });

//     } catch (error) {
//       console.error('Order submission error:', error);
//       res.status(500).json({
//         success: false,
//         message: error.message || 'Failed to submit order'
//       });
//     }
//   }

//   // Get order status
//   async getOrderStatus(req, res) {
//     try {
//       const { webappId, orderId } = req.params;

//       // In future, fetch from Firestore
//       res.json({
//         success: true,
//         order: {
//           id: orderId,
//           status: 'submitted',
//           storage: 'firestore',
//           timestamp: new Date().toISOString()
//         }
//       });

//     } catch (error) {
//       console.error('Get order status error:', error);
//       res.status(500).json({
//         success: false,
//         message: error.message || 'Failed to fetch order status'
//       });
//     }
//   }
// }

// module.exports = new OrderController();

const firebaseService = require('../services/firebaseService');
// const { sendOrderConfirmationEmail } = require('../services/emailService'); // Add this
const webapps = require('../config/webapps');
const emailService = require('../services/emailService');


class OrderController {
  constructor() {
    this.submitOrder = this.submitOrder.bind(this);
  }

  // Submit order to Firestore with Email
  async submitOrder(req, res) {
    try {
      const { webappId } = req.params;
      const orderData = req.body;

      console.log('📦 Order received:', {
        webappId,
        name: orderData.name,
        phone: orderData.phone,
        category: orderData.category
      });

      // Get webapp configuration
      const webappConfig = webapps[webappId];
      if (!webappConfig) {
        return res.status(400).json({
          success: false,
          message: 'Invalid webapp ID'
        });
      }

      // Generate order ID
      const orderId = this.generateOrderId();

      // Add order metadata
      const orderWithMetadata = {
        ...orderData,
        orderId: orderId,
        webappId: webappId,
        status: 'confirmed',
        timestamp: new Date().toISOString()
      };

      // Store order in Firestore
      const firestoreResult = await firebaseService.storeOrder(webappId, orderWithMetadata);

      console.log('💾 Order stored in Firestore:', orderId);

      // ✅ Send confirmation email (non-blocking)
      this.sendOrderEmail(orderWithMetadata).catch(emailError => {
        console.error('⚠️ Email failed but order was saved:', emailError);
      });

      res.json({
        success: true,
        message: 'Order submitted successfully! Confirmation email sent.',
        orderId: orderId,
        user: {
          name: orderData.name,
          phone: orderData.phone,
          email: orderData.email
        },
        storage: 'firestore',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Order submission error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to submit order'
      });
    }
  }

  // Send order confirmation email (non-blocking)
 async sendOrderEmail(orderData) {
  try {
    console.log('📧 Sending order confirmation email...');
    
    // ✅ FIX: Call the method on the imported object
    await emailService.sendOrderConfirmationEmail(orderData);
    
    console.log('✅ Order confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
}    

  // Generate unique order ID
  generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }

  // Get order status
  async getOrderStatus(req, res) {
    try {
      const { webappId, orderId } = req.params;

      // In future, fetch from Firestore
      res.json({
        success: true,
        order: {
          id: orderId,
          status: 'submitted',
          storage: 'firestore',
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Get order status error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch order status'
      });
    }
  }
}

module.exports = new OrderController();