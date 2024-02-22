const express = require('express');
const router = express.Router();
const homeCotroller= require('../controller/homeController');

router.use('/', homeCotroller.home);

module.exports = router;