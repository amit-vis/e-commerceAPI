const Cart = require('../model/cart');
const Product = require('../model/product');

module.exports.cartController = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id)
        const cart = await Cart.findOne({product: product._id})
        .populate('product')
        if(product.availability===false){
            return res.status(200).json({
                message: "product is not in stock or product not available",
                cart
            })
        }
        if(cart){
            cart.quantity +=1
            cart.totalPrice = product.price*cart.quantity;
            await cart.save();
            return res.status(200).json({
                message: "Cart Item updated",
                success: true,
                cart
            })
        }else{
            const newItem = await Cart.create({
                product: product._id,
                quantity: 1,
                totalPrice: product.price
            })
            return res.status(200).json({
                message: "new Cart Item added",
                success: true,
                newItem
            })
        }

    } catch (error) {
        console.log("Error in adding the product in the cart", error);
        return res.status(500).json({
            message: "Error in adding the product in the cart",
            error
        })
    }
}

module.exports.viewCart = async (req, res)=>{
    try {
        const cart = await Cart.find({})
        .populate({
            path: 'product',
            select: 'title price description availability',
            populate:{
                path: 'category',
                select: 'category'
            }
        });
        return res.status(200).json({
            message: "List of cart Items",
            cart
        })
    } catch (error) {
        console.log("Error in fetching the cart item", error);
        return res.status(500).json({
            message: "Error in fetching the cart item",
            error
        })
    }
}

module.exports.updateQuntity = async (req, res)=>{
    try {
        const cartId = await Cart.findById(req.params.id)
        .populate('product');
        if(cartId.quantity===0){
            await Cart.findOneAndDelete({_id: cartId});
            return res.status(200).json({
                message: "Item is deleted successfuly",
                success: true,
                cartId
            })
        }
        if(cartId){
            const newQuantity= req.body.quantity;
            cartId.quantity = newQuantity;
            await cartId.save();
            const newTotalPrice = cartId.product.price * newQuantity;
            cartId.totalPrice = newTotalPrice;
            await cartId.save()
            return res.status(200).json({
                message: "Quantity updated successfully",
                cartId
            })
        }else{
            return res.status(400).json({
                message: "Item does not exist or not found item",
                success: false
            })
        }
    } catch (error) {
        console.log("Error in updating the quantity", error)
        return res.status(500).json({
            message: "Error in updating the quantity",
            error
        })
    }
}

module.exports.deleteItem = async (req, res)=>{
    try {
        const findItem = await Cart.findById(req.params.id);
        if(findItem){
            const deletedItem = await Cart.deleteOne({_id: findItem._id})
            return res.status(200).json({
                message: "Item delted successfully!",
                success: true,
                deletedItem
            })
        }else{
            return res.status(400).json({
                message: "Item not found or Item does not exist",
                success: false,
            })
        }
    } catch (error) {
        console.log("Error in deleting the cart Item", error);
        return res.status(500).json({
            message: "Error in deleting the cart Item",
            error
        })
    }
}