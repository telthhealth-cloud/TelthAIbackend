const webapps = {
  webapp1: {
    name: 'Medical Hub',
    freshdesk: { // ✅ This must exist
      subjectPrefix: 'Medical Device Order -',
      groupId:  null
    },
    features: {
      otpEnabled: true,
      orderTracking: true
    }
  },
  // webapp2: {
  //   name: 'Second WebApp', 
  //   freshdesk: { // ✅ This must exist
  //     subjectPrefix: 'WebApp2 Order -',
  //     groupId: process.env.FRESHDESK_GROUP_ID_WEBAPP2 || null
  //   },
  //   features: {
  //     otpEnabled: true,
  //     orderTracking: true
  //   }
  // }
};

module.exports = webapps;   



