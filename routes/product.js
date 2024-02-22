const express = require('express');
const router = express.Router();
const productController = require('../controller/productCotroller');

router.get('/productlist', productController.getProduct);
router.post('/create', productController.createProduct);
router.get('/details/:id', productController.details);

module.exports = router;