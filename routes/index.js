const express = require('express');
const router = express.Router();
const homeCotroller= require('../controller/homeController');

router.get('/', homeCotroller.home);
router.use('/category', require('./category'));
router.use('/product', require('./product'));

module.exports = router;