const express = require('express');
const router = express.Router();
const categoryCotroller = require('../controller/categoryController');

router.get('/view', categoryCotroller.view);
router.post('/add', categoryCotroller.createCategory);

module.exports = router;