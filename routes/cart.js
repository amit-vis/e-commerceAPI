const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const passport = require('passport');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

// given the route and what operation need to be performed
router.post('/add/:id',passport.authenticate('jwt', {session: false}),cartController.addCart);
router.get('/view-cart',passport.authenticate('jwt', {session: false}),cartController.viewCart);
router.put('/update-quantity/:id',passport.authenticate('jwt', {session: false}) ,cartController.updateQuntity);
router.delete('/delete-item/:id',passport.authenticate('jwt', {session: false}) ,cartController.deleteItem);

module.exports = router