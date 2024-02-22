const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    availability:{
        type: Boolean,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;