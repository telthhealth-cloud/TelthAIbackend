const firebaseService = require('../services/firebaseService');
const emailService = require('../services/emailService');

class ContactController {
  constructor() {
    this.submitContact = this.submitContact.bind(this);
  }

  // Submit contact form
  async submitContact(req, res) {
    try {
      const { webappId } = req.params;
      const contactData = req.body;

      console.log('📧 Contact form received:', {
        webappId,
        name: contactData.name, 
        email: contactData.email,
        company: contactData.company
      });

      // Validate required fields
      const validationError = this.validateContactData(contactData);
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: validationError
        });
      }

      // Generate contact ID
      const contactId = this.generateContactId();

      // Add contact metadata
      const contactWithMetadata = {
        ...contactData,
        contactId: contactId,
        webappId: webappId,
        status: 'new',
        timestamp: new Date().toISOString()
      };

      // Store contact in Firestore
      const firestoreResult = await firebaseService.storeContact(webappId, contactWithMetadata);
      console.log('💾 Contact stored in Firestore:', contactId);

      // Send emails (non-blocking)
      this.sendContactEmails(contactWithMetadata).catch(emailError => {
        console.error('⚠️ Emails failed but contact was saved:', emailError);
      });

      res.json({
        success: true,
        message: 'Thank you for contacting us! We\'ll get back to you soon.',
        contactId: contactId,
        user: {
          name: contactData.name,
          email: contactData.email,
          company: contactData.company
        },
        storage: 'firestore',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Contact submission error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to submit contact form'
      });
    }
  }

  // Validate contact data
  validateContactData(contactData) {
    const requiredFields = ['name', 'email', 'message'];

    for (const field of requiredFields) {
      if (!contactData[field] || !contactData[field].trim()) {
        return `Missing required field: ${field}`;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return 'Invalid email format';
    }

    return null;
  }

  // Send both internal and confirmation emails
  async sendContactEmails(contactData) {
    try {
      console.log('📧 Sending contact emails...');
      
      // Send internal notification to your team
      await emailService.sendInternalContactNotification(contactData);
      
      // Send confirmation email to customer
      await emailService.sendContactConfirmationEmail(contactData);
      
      console.log('✅ Both contact emails sent successfully');
      return true;
    } catch (error) {
      console.error('❌ Contact emails failed:', error);
      throw error;
    }
  }

  // Generate unique contact ID
  generateContactId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `CONTACT-${timestamp}-${random}`.toUpperCase();
  }

  // Get contact status (optional)
  async getContactStatus(req, res) {
    try {
      const { webappId, contactId } = req.params;

      // In future, fetch from Firestore
      res.json({
        success: true,
        contact: {
          id: contactId,
          status: 'received',
          storage: 'firestore',
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Get contact status error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch contact status'
      });
    }
  }
}

module.exports = new ContactController();