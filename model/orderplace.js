const mongoose = require('mongoose');

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