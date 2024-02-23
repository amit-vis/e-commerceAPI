const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const passport = require('passport');
const limitter = require('../config/limitter');

router.use(limitter)
router.post('/add/:id',passport.authenticate('jwt', {session: false}),cartController.addCart);
router.get('/viewcart',passport.authenticate('jwt', {session: false}),cartController.viewCart);
router.put('/updatequantity/:id',passport.authenticate('jwt', {session: false}) ,cartController.updateQuntity);
router.delete('/deleteitem/:id',passport.authenticate('jwt', {session: false}) ,cartController.deleteItem);

module.exports = router