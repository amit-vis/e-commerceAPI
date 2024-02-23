const express = require('express');
const router = express.Router();
const productController = require('../controller/productCotroller');
const limitter = require('../config/limitter');

router.use(limitter)

router.get('/list', productController.getProduct);
router.post('/create', productController.createProduct);
router.get('/details/:id', productController.details);

module.exports = router;