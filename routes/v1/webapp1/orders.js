// routes/v1/webapp1/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/orderController');

// router.post('/', (req, res) => {
//   req.params.webappId = 'webapp1';
//   orderController.submitOrder(req, res);
// });
router.post('/', (req, res) => {
  req.params.webappId = 'webapp1'; // ← THIS FIXES YOUR ERROR
  orderController.submitOrder(req, res);
});


// router.post('/', orderController.submitOrder);

module.exports = router;