// services/firebaseService.js
const { auth, firestore } = require('../config/firebase');

class FirebaseService {
  // Initialize collections for webapp
  async initializeWebappCollections(webappId) {
    try {
      // Collections will be created automatically when we write data
      console.log(`✅ Collections ready for ${webappId}`);
      return { success: true };
    } catch (error) {
      console.error('Collection initialization error:', error);
      throw new Error('Failed to initialize collections');
    }
  }
       
    //  contact form
  async storeContact(webappId, contactData) {
  try {
    const contactsRef = firestore.collection(`webapp1_contacts`);
    const contactRef = contactsRef.doc(); // Auto-generated ID
    
    const contactRecord = {
      ...contactData,
      id: contactRef.id,
      webapp: webappId,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    await contactRef.set(contactRecord);
    console.log('✅ Contact stored in Firestore:', contactRef.id);
    
    return { 
      success: true, 
      contactId: contactRef.id 
    };
  } catch (error) {
    console.error('Firestore contact storage error:', error);
    throw new Error('Failed to store contact');
  }
}

  // OTP Sign In - Main authentication method
async otpSignIn(webappId, phoneNumber, userData) {
    try {
      console.log(`🔐 OTP Sign In for: ${phoneNumber}`);

      // Check if user exists in our Firestore
      const userRef = firestore.collection(`webapp1_users`).doc(phoneNumber);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        // Existing user - return user data
        const user = userDoc.data();
        console.log('✅ Existing user found:', user.phone);
        
        return {
          success: true,
          user: user,
          isNewUser: false,
          message: 'Welcome back!'
        };
      } else {
        // New user - create in Firebase Auth and Firestore
        console.log('👤 Creating new user:', phoneNumber);
        
        // Create user in Firebase Authentication
        let firebaseUser;
        try {
          firebaseUser = await auth.createUser({
            phoneNumber: phoneNumber,
            displayName: userData.name,
            email: userData.email
          });
          console.log('✅ Firebase Auth user created:', firebaseUser.uid);
        } catch (authError) {
          // User might already exist in Auth but not in Firestore
          if (authError.code === 'auth/phone-number-already-exists') {
            // Get existing user by phone number
            const users = await auth.getUsers([{ phoneNumber }]);
            firebaseUser = users.users[0];
            console.log('✅ Existing Firebase Auth user found:', firebaseUser.uid);
          } else {
            throw authError;
          }
        }

        // Create user record in Firestore
        const userRecord = {
          uid: firebaseUser.uid,
          phone: phoneNumber,
          name: userData.name || '',
          email: userData.email || '',
          webapp: webappId,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        await userRef.set(userRecord);
        console.log('✅ Firestore user record created');

        return {
          success: true,
          user: userRecord,
          isNewUser: true,
          message: 'Account created successfully!'
        };
      }

    } catch (error) {
      console.error('OTP Sign In error:', error);
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  // Store order in Firestore
  async storeOrder(webappId, orderData) {
    try {
      const ordersRef = firestore.collection(`webapp1_orders`);
      const orderRef = ordersRef.doc(); // Auto-generated ID
      
      const orderRecord = {
        ...orderData,
        id: orderRef.id,
        webapp: webappId,
        userPhone: orderData.phone, // Link to user's phone
        createdAt: new Date().toISOString(),
        status: 'submitted'
      };

      await orderRef.set(orderRecord);
      console.log('✅ Order stored in Firestore:', orderRef.id);
      
      return { 
        success: true, 
        orderId: orderRef.id 
      };
    } catch (error) {
      console.error('Firestore order storage error:', error);
      throw new Error('Failed to store order');
    }
  }

  // Get user by phone
  async getUserByPhone(phoneNumber) {
    try {
      const userRef = firestore.collection(`webapp1_users`).doc(phoneNumber);
      const userDoc = await userRef.get();
      
      if (userDoc.exists) {
        return { 
          success: true, 
          user: userDoc.data() 
        };
      } else {
        return { 
          success: false, 
          message: 'User not found' 
        };
      }
    } catch (error) {
      console.error('Get user error:', error);
      throw new Error('Failed to get user');
    }
  }

  // Update user profile (if needed later)
  async updateUserProfile(webappId, phoneNumber, updates) {
    try {
      const userRef = firestore.collection(`webapp1_users`).doc(phoneNumber);
      await userRef.update({
        ...updates,
        lastUpdated: new Date().toISOString()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Failed to update user');
    }
  }
}

module.exports = new FirebaseService();



// ----------------

// Add to your existing FirebaseService class

// Store contact in Firestore
