const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const passport = require('passport')

router.post('/add/:id',passport.authenticate('jwt', {session: false}) ,cartController.cartController);
router.get('/viewcart',passport.authenticate('jwt', {session: false}) ,cartController.viewCart);
router.put('/updatequantity/:id',passport.authenticate('jwt', {session: false}) ,cartController.updateQuntity);
router.delete('/deleteitem/:id',passport.authenticate('jwt', {session: false}) ,cartController.deleteItem);

module.exports = router