const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - cart
 *         - status
 *       properties:
 *         cart:
 *           type: string
 *           description: The ID of the associated Cart.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the order (default is current date).
 *         status:
 *           type: string
 *           description: The status of the order.
 *       example:
 *         cart: 609c4349e9a6b5256020e9b1
 *         date: "2022-05-15T10:00:00Z"
 *         status: "Pending"
 */

const orderSchema = mongoose.Schema({
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;