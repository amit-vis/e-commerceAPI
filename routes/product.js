const express = require('express');
const router = express.Router();
const productController = require('../controller/productCotroller');
const limitter = require('../config/limitter');

// set the limitter
router.use(limitter)

// given the routes to the product controller
router.get('/list', productController.getProduct);
router.post('/create', productController.createProduct);
router.get('/details/:id', productController.details);
router.put('/update-stock/:id', productController.updateStock);

module.exports = router;