const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderPlaceController');
const passport = require('passport');

router.post('/orderplace/:id', passport.authenticate('jwt', {session: false}) ,orderController.placeOrder);
router.get('/orderhistory',passport.authenticate('jwt', {session: false}) ,orderController.orderHistory);
router.get('/orderdetails/:id',passport.authenticate('jwt', {session: false}) ,orderController.orderDetails);

module.exports = router;