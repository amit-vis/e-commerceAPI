const express = require('express');
const router = express.Router();
const categoryCotroller = require('../controller/categoryController');
const limitter = require('../config/limitter');

router.use(limitter)

router.get('/view', categoryCotroller.view);
router.post('/add', categoryCotroller.createCategory);
router.get('/category-wise/:id', categoryCotroller.categoryWise);

module.exports = router;