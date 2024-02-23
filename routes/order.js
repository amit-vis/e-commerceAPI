const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderPlaceController');
const passport = require('passport');
const limitter = require('../config/limitter');

router.use(limitter)

router.post('/place/:id', passport.authenticate('jwt', {session: false}) ,orderController.placeOrder);
router.get('/history',passport.authenticate('jwt', {session: false}) ,orderController.orderHistory);
router.get('/details/:id',passport.authenticate('jwt', {session: false}) ,orderController.orderDetails);

module.exports = router;