const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const limitter = require('../config/limitter');

// set limmiter
router.use(limitter)

// set the routes for thr user controller
router.post('/create', userController.create);
router.post('/signin', userController.createSession);

module.exports = router;