// // check-collections.js
// const admin = require('firebase-admin');
// const serviceAccount = require('./service-account.json'); // Adjust path as needed

// // Initialize Admin SDK
// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
// console.log("admin log taken")
// }

// const db = admin.firestore();

// async function checkDatabaseAndCollections() {
//   console.log('🔍 CHECKING FIRESTORE DATABASE AND COLLECTIONS\n');
  
//   try {
//     // Test if database is accessible
//     console.log('1. Testing database connection...');
//     const testRef = db.collection('_health_check').doc('test');
//     await testRef.set({ 
//       check: true, 
//       timestamp: new Date().toISOString() 
//     });
//     await testRef.delete();
//     console.log('   ✅ Database connection: SUCCESS\n');

//     // List all top-level collections
//     console.log('2. Listing all collections...');
//     const collections = await db.listCollections();
    
//     if (collections.length === 0) {
//       console.log('   ℹ️ No collections found in the database');
//       console.log('   💡 This is normal for a new database');
//     } else {
//       console.log(`   📚 Found ${collections.length} collections:`);
//       collections.forEach((collection, index) => {
//         console.log(`      ${index + 1}. ${collection.id}`);
//       });
//     }

//     // Check if specific collections exist and have data
//     console.log('\n3. Checking specific collections...');
//     const collectionsToCheck = ['users', 'orders', 'webapps'];
    
//     for (const collectionName of collectionsToCheck) {
//       try {
//         const collectionRef = db.collection(collectionName);
//         const snapshot = await collectionRef.limit(1).get();
        
//         if (snapshot.empty) {
//           console.log(`   📁 ${collectionName}: EXISTS (empty)`);
//         } else {
//           const countSnapshot = await collectionRef.count().get();
//           console.log(`   📁 ${collectionName}: EXISTS (${countSnapshot.data().count} documents)`);
//         }
//       } catch (error) {
//         console.log(`   ❌ ${collectionName}: ERROR - ${error.message}`);
//       }
//     }

//     console.log('\n🎉 DATABASE CHECK COMPLETE');
//     console.log('💡 If you see collections above, your database is working!');

//   } catch (error) {
//     console.log('❌ DATABASE CHECK FAILED');
//     console.log('Error:', error.message);
//     console.log('Code:', error.code);
    
//     if (error.code === 5) {
//       console.log('\n💡 SOLUTION: Firestore database might not be created');
//       console.log('   1. Go to: https://console.firebase.google.com/project/ai-hub-b305b/firestore');
//       console.log('   2. Click "Create Database" if you see the button');
//       console.log('   3. Choose "Start in test mode"');
//       console.log('   4. Select a region and create');
//     }
//   }
// }

// checkDatabaseAndCollections();

// create-test-data.js
// const admin = require('firebase-admin');
// const serviceAccount = require('./service-account.json');

// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
// }

// const db = admin.firestore();

// async function createTestData() {
//   try {
//     console.log('🧪 CREATING TEST DATA...\n');
    
//     // Create a test user
//     const userRef = db.collection('users').doc('test-user-1');
//     await userRef.set({
//       name: 'Test User',
//       phone: '+911234567890',
//       email: 'test@example.com',
//       createdAt: new Date(),
//       role: 'customer'
//     });
//     console.log('✅ Test user created');

//     // Create a test order
//     const orderRef = db.collection('orders').doc('test-order-1');
//     await orderRef.set({
//       userId: 'test-user-1',
//       category: 'Basic',
//       specifications: ['Thermometer', 'Stethoscope'],
//       createdAt: new Date(),
//       status: 'pending'
//     });
//     console.log('✅ Test order created');

//     console.log('\n🎉 TEST DATA CREATED SUCCESSFULLY');
//     console.log('💡 Now run check-collections.js again to verify');

//   } catch (error) {
//     console.log('❌ Failed to create test data:', error.message);
//   }
// }

// createTestData();


// // test-complete-setup.js
// const admin = require('firebase-admin');
// const serviceAccount = require('./service-account.json');

// console.log('🧪 COMPLETE FIREBASE SETUP TEST\n');

// async function testCompleteSetup() {
//   try {
//     // 1. Test Admin SDK Initialization
//     console.log('1. Testing Firebase Admin SDK...');
//     if (admin.apps.length === 0) {
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount)
//       });
//       console.log('   ✅ Firebase Admin initialized');
//     } else {
//       console.log('   ✅ Firebase Admin already initialized');
//     }

//     // 2. Test Auth Service
//     console.log('\n2. Testing Firebase Auth...');
//     const auth = admin.auth();
//     try {
//       // Try to list users (just to test auth connection)
//       await auth.listUsers(1);
//       console.log('   ✅ Firebase Auth: WORKING');
//     } catch (authError) {
//       console.log('   ❌ Firebase Auth: FAILED -', authError.message);
//     }

//     // 3. Test Firestore Database
//     console.log('\n3. Testing Firestore Database...');
//     const db = admin.firestore();
    
//     try {
//       // Test basic operation
//       const testRef = db.collection('_setup_test').doc('connection');
//       await testRef.set({ test: true, timestamp: new Date() });
//       await testRef.delete();
//       console.log('   ✅ Firestore Database: WORKING');
//       console.log('   🎉 YOUR DATABASE EXISTS AND IS ACCESSIBLE!');
      
//       return { success: true, message: 'Everything is working!' };
      
//     } catch (firestoreError) {
//       console.log('   ❌ Firestore Database: FAILED');
//       console.log('   Error:', firestoreError.message);
//       console.log('   Code:', firestoreError.code);
      
//       if (firestoreError.code === 5) {
//         console.log('\n💥 CRITICAL: FIRESTORE DATABASE NOT CREATED');
//         console.log('\n📋 IMMEDIATE ACTION REQUIRED:');
//         console.log('   1. Go to: https://console.firebase.google.com/project/ai-hub-b305b/firestore');
//         console.log('   2. Click "Create Database" button');
//         console.log('   3. Choose "Start in test mode"');
//         console.log('   4. Select region (us-central recommended)');
//         console.log('   5. Click "Create"');
//         console.log('   6. Wait 2 minutes, then run this test again');
//       }
      
//       return { success: false, error: firestoreError.message };
//     }

//   } catch (error) {
//     console.log('❌ SETUP TEST FAILED:', error.message);
//     return { success: false, error: error.message };
//   }
// }

// testCompleteSetup().then(result => {
//   console.log('\n📊 TEST RESULT:', result.success ? 'PASSED' : 'FAILED');
//   if (!result.success) {
//     process.exit(1);
//   }
// });

// test-aihub-database.js
// const admin = require('firebase-admin');
// const serviceAccount = require('./service-account.json');

// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
// }

// const db = admin.firestore(); // ← Use your database name

// async function testAihubDatabase() {
//   console.log('🧪 TESTING AIHUB DATABASE CONNECTION\n');
  
//   try {
//     // 1. Test basic operations
//     console.log('1. Testing basic operations...');
//     const testRef = db.collection('_test').doc('connection');
//     await testRef.set({ 
//       test: true, 
//       database: 'aihub',
//       timestamp: new Date().toISOString() 
//     });
//     console.log('   ✅ Write: SUCCESS');

//     const doc = await testRef.get();
//     console.log('   ✅ Read: SUCCESS');
//     console.log('   📄 Document:', doc.data());

//     await testRef.delete();
//     console.log('   ✅ Delete: SUCCESS');

//     // 2. Check existing collections
//     console.log('\n2. Checking existing collections...');
//     const collections = await db.listCollections();
    
//     if (collections.length === 0) {
//       console.log('   ℹ️ No collections found');
//     } else {
//       console.log(`   📚 Found ${collections.length} collections:`);
//       collections.forEach((collection, index) => {
//         console.log(`      ${index + 1}. ${collection.id}`);
//       });
//     }

//     // 3. Test users collection (which exists in your URL)
//     console.log('\n3. Testing users collection...');
//     const usersRef = db.collection('users');
//     const usersSnapshot = await usersRef.limit(5).get();
    
//     if (usersSnapshot.empty) {
//       console.log('   📁 users: EXISTS (empty)');
      
//       // Add a test user
//       const testUserRef = db.collection('users').doc('test-user');
//       await testUserRef.set({
//         name: 'Test User',
//         phone: '+911234567890',
//         createdAt: new Date()
//       });
//       console.log('   👤 Added test user to users collection');
      
//     } else {
//       console.log(`   📁 users: EXISTS (${usersSnapshot.size} documents)`);
//       usersSnapshot.forEach(doc => {
//         console.log(`      - ${doc.id}:`, doc.data());
//       });
//     }

//     console.log('\n🎉 AIHUB DATABASE IS FULLY OPERATIONAL!');
//     console.log('💡 Your OTP authentication will now work!');

//   } catch (error) {
//     console.log('❌ AIHUB DATABASE TEST FAILED:');
//     console.log('   Error:', error.message);
//     console.log('   Code:', error.code);
    
//     if (error.code === 5) {
//       console.log('\n💡 The database name might be different');
//       console.log('   Try these database names:');
//       console.log('   - aihub (your current choice)');
//       console.log('   - (default)');
//       console.log('   - Check Firebase Console for exact name');
//     }
//   }
// }

// testAihubDatabase();



// diagnose-databases.js
// const admin = require('firebase-admin');
// const serviceAccount = require('./service-account.json');

// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
// }

// async function diagnoseDatabases() {
//   console.log('🔍 DIAGNOSING FIREBASE DATABASES\n');
  
//   // Test 1: Default database
//   console.log('1. Testing DEFAULT database...');
//   try {
//     const defaultDb = admin.firestore(); // NO NAME
//     const testRef = defaultDb.collection('_diagnostic').doc('default_test');
//     await testRef.set({ test: 'default', timestamp: new Date() });
//     await testRef.delete();
//     console.log('   ✅ DEFAULT DATABASE: WORKING');
//     console.log('   🎯 Use this in your code: admin.firestore()');
    
//     // Check collections in default database
//     const collections = await defaultDb.listCollections();
//     console.log(`   📚 Collections in default database: ${collections.length}`);
//     collections.forEach(col => console.log(`      - ${col.id}`));
    
//   } catch (error) {
//     console.log('   ❌ DEFAULT DATABASE: NOT WORKING');
//     console.log('   Error:', error.message);
//     console.log('   Code:', error.code);
//   }

//   console.log('\n2. Database Configuration:');
//   console.log('   - Named databases (aihub) are NOT supported in Admin SDK');
//   console.log('   - You MUST use the default database');
//   console.log('   - Your URL shows collections exist, but in named database');
  
//   console.log('\n🚀 SOLUTION:');
//   console.log('   Use the DEFAULT database in your Firebase config:');
//   console.log('   const firestore = admin.firestore(); // NO database name');
// }

// diagnoseDatabases();

// diagnose-databases.js
// const admin = require('firebase-admin');
// const serviceAccount = require('./service-account.json');

// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
// }

// async function diagnoseDatabases() {
//   console.log('🔍 DIAGNOSING FIREBASE DATABASES\n');
  
//   // Test 1: Default database
//   console.log('1. Testing DEFAULT database...');
//   try {
//     const defaultDb = admin.firestore(); // NO NAME
//     const testRef = defaultDb.collection('_diagnostic').doc('default_test');
//     await testRef.set({ test: 'default', timestamp: new Date() });
//     await testRef.delete();
//     console.log('   ✅ DEFAULT DATABASE: WORKING');
//     console.log('   🎯 Use this in your code: admin.firestore()');
    
//     // Check collections in default database
//     const collections = await defaultDb.listCollections();
//     console.log(`   📚 Collections in default database: ${collections.length}`);
//     collections.forEach(col => console.log(`      - ${col.id}`));
    
//   } catch (error) {
//     console.log('   ❌ DEFAULT DATABASE: NOT WORKING');
//     console.log('   Error:', error.message);
//     console.log('   Code:', error.code);
//   }

//   console.log('\n2. Database Configuration:');
//   console.log('   - Named databases (aihub) are NOT supported in Admin SDK');
//   console.log('   - You MUST use the default database');
//   console.log('   - Your URL shows collections exist, but in named database');
  
//   console.log('\n🚀 SOLUTION:');
//   console.log('   Use the DEFAULT database in your Firebase config:');
//   console.log('   const firestore = admin.firestore(); // NO database name');
// }

// diagnoseDatabases();

// check-firebase-setup.js
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

console.log('🔍 CHECKING FIREBASE PROJECT SETUP\n');

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function checkSetup() {
  try {
    console.log('📊 Project Information:');
    console.log('   - Project ID: ai-hub-b305b');
    console.log('   - Service Account: ', serviceAccount.client_email);
    
    // Test if we can access any Firestore database
    console.log('\n🔧 Testing Firestore Access...');
    
    try {
      const db = admin.firestore(); // Default database
      const testRef = db.collection('_probe').doc('test');
      await testRef.set({ test: true });
      await testRef.delete();
      console.log('   ✅ DEFAULT DATABASE: EXISTS AND ACCESSIBLE');
      console.log('   🎯 Your code will work with admin.firestore()');
      
    } catch (defaultError) {
      console.log('   ❌ DEFAULT DATABASE: DOES NOT EXIST');
      console.log('   Error:', defaultError.message);
      
      if (defaultError.code === 5) {
        console.log('\n💥 CRITICAL ISSUE:');
        console.log('   You have a NAMED database (aihub) but no DEFAULT database');
        console.log('   Firebase Admin SDK can only access DEFAULT database');
        
        console.log('\n📋 IMMEDIATE ACTION REQUIRED:');
        console.log('   1. Go to: https://console.firebase.google.com/project/ai-hub-b305b/firestore');
        console.log('   2. Check if you see multiple databases');
        console.log('   3. If you only see "aihub", you need to CREATE A DEFAULT DATABASE');
        console.log('   4. Click "Create Database" to create the default database');
        console.log('   5. Choose "Start in test mode" and create');
      }
    }
    
    // Test Auth (should work regardless)
    console.log('\n🔐 Testing Firebase Auth...');
    try {
      const auth = admin.auth();
      // Just test if auth is accessible
      await auth.listUsers(1); 
      console.log('   ✅ Firebase Auth: WORKING');
    } catch (authError) {
      console.log('   ❌ Firebase Auth: FAILED -', authError.message);
    }
    
  } catch (error) {
    console.log('❌ Setup check failed:', error.message);
  }
}

checkSetup();



if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function verifyDefaultDB() {
  console.log('🧪 VERIFYING DEFAULT DATABASE WORKS\n');
  
  try {
    // Test basic operations
    console.log('1. Testing basic operations...');
    const testRef = db.collection('_verification').doc('test');
    await testRef.set({ 
      status: 'working', 
      timestamp: new Date().toISOString() 
    });
    console.log('   ✅ Write: SUCCESS');

    const doc = await testRef.get();
    console.log('   ✅ Read: SUCCESS');
    console.log('   📄 Data:', doc.data());

    await testRef.delete();
    console.log('   ✅ Delete: SUCCESS');

    // Create a test user (your main use case)
    console.log('\n2. Testing user creation...');
    const userRef = db.collection('users').doc('test-user-' + Date.now());
    await userRef.set({
      name: 'Test User',
      phone: '+918608214689',
      email: 'test@example.com',
      createdAt: new Date(),
      role: 'customer'
    });
    console.log('   ✅ User creation: SUCCESS');

    // List collections
    console.log('\n3. Checking collections...');
    const collections = await db.listCollections();
    console.log(`   📚 Collections found: ${collections.length}`);
    collections.forEach(col => console.log(`      - ${col.id}`));

    console.log('\n🎉 DEFAULT DATABASE IS WORKING PERFECTLY!');
    console.log('🚀 Your OTP authentication will now work!');

  } catch (error) {
    console.log('❌ Verification failed:', error.message);
    console.log('💡 Default database might not be created yet');
    console.log('📋 Action: Create default database in Firebase Console');
  }
}

verifyDefaultDB();
















