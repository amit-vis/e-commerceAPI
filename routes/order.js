const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderPlaceController');
const passport = require('passport');
const limitter = require('../config/limitter');

// set the limmiter to the api
router.use(limitter)

// give the routes to controller
router.post('/place/:id', passport.authenticate('jwt', {session: false}) ,orderController.placeOrder);
router.get('/history',passport.authenticate('jwt', {session: false}) ,orderController.orderHistory);
router.get('/details/:id',passport.authenticate('jwt', {session: false}) ,orderController.orderDetails);

module.exports = router;