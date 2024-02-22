const mongoose = require('mongoose');

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