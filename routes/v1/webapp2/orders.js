const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/orderController');

// Submit order
router.post('/submit', orderController.submitOrder);

// Get order status
router.get('/:orderId/status', orderController.getOrderStatus);

module.exports = router;