const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - totalPrice
 *       properties:
 *         product:
 *           type: string
 *           description: The ID of the associated product.
 *         quantity:
 *           type: number
 *           description: The quantity of the product in the cart.
 *         totalPrice:
 *           type: number
 *           description: The total price for the quantity of the product.
 *       example:
 *         product: 609c4349e9a6b5256020e9b1
 *         quantity: 2
 *         totalPrice: 30.99
 */

// here is the cart schema
const cartSchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    }
},{
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;