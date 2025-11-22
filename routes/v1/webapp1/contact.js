const express = require('express');
const router = express.Router();
const contactController = require('../../../controllers/contactController');
const { contactSubmission } = require('../../../middleware/rateLimit'); // ← ADD THIS


// POST /api/v1/webapp1/contact
router.post('/', contactSubmission, (req, res) => {  // ← ADD MIDDLEWARE HERE
  req.params.webappId = 'webapp1';
  contactController.submitContact(req, res);
});

// GET contact status (optional)
router.get('/:contactId', (req, res) => {
  req.params.webappId = 'webapp1';
  contactController.getContactStatus(req, res);
});

module.exports = router;