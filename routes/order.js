const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderPlaceController');

router.post('/orderplace/:id', orderController.placeOrder);
router.get('/orderhistory', orderController.orderHistory);
router.get('/orderdetails/:id', orderController.orderDetails);

module.exports = router;