const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create', userController.create);
router.post('/create-session', userController.createSession);

module.exports = router;