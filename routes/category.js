const express = require('express');
const router = express.Router();
const categoryCotroller = require('../controller/categoryController');

router.get('/view', categoryCotroller.view);
router.post('/add', categoryCotroller.createCategory);
router.get('/productcate/:id', categoryCotroller.categoryWise);

module.exports = router;