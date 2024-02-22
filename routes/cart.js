const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.post('/add/:id', cartController.cartController);
router.get('/viewcart', cartController.viewCart);
router.put('/updatequantity/:id', cartController.updateQuntity);
router.delete('/deleteitem/:id', cartController.deleteItem);

module.exports = router