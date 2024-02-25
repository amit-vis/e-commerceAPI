const express = require('express');
const router = express.Router();
const homeCotroller= require('../controller/homeController');

router.get('/', homeCotroller.home);
// here we have use the file of the routes
router.use('/category', require('./category'));
router.use('/product', require('./product'));
router.use('/cart', require('./cart'));
router.use('/order', require('./order'));
router.use('/user', require('./user'));

module.exports = router;