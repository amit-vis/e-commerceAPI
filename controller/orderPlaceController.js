const Order = require('../model/orderplace');
const Cart = require('../model/cart');

module.exports.placeOrder = async (req, res)=>{
    try {
        const cart = await Cart.findById(req.params.id);
        let order = await Order.findOne({cart: cart._id})
        .populate({
            path: 'cart',
            select: 'totalPrice quantity',
            populate:{
                path: 'product',
                select: 'title price description availability',
                populate:{
                    path:'category',
                    select:'category'
                }
            }
        });
        if(order){
            return res.status(200).json({
                message: "Item already exist",
                success: true,
                order
            })
        }else{
            order = await Order.create(req.body);
            return res.status(200).json({
                message: "Order placed successfully!",
                success: true,
                order
            })
        }

    } catch (error) {
        console.log("Error in placing the order", error);
        return res.status(500).json({
            message: "Error in placing the order",
            error
        })
    }
}

module.exports.orderHistory = async (req, res)=>{
    try {
        const order = await Order.find({})
        .populate({
            path: 'cart',
            select: 'totalPrice quantity',
            populate:{
                path: 'product',
                select: 'title price description availability',
                populate:{
                    path: 'category',
                    select: 'category'
                }
            }
        })
        return res.status(200).json({
            message: "Order History!",
            success: true,
            order
        })
    } catch (error) {
        console.log("Error in finding the order History", error);
        return res.status(500).json({
            message: "Error in finding the order History",
            error
        })
    }
}

module.exports.orderDetails = async (req, res)=>{
    try {
        const findOrder = await Order.findById(req.params.id)
        .populate({
            path: 'cart',
            select: 'totalPrice quantity',
            populate:{
                path: 'product',
                select: 'title price description availability',
                populate:{
                    path: 'category',
                    select: 'category'
                }
            }
        })
        if(findOrder){
            return res.status(200).json({
                message: "Order Details",
                success: true,
                findOrder
            })
        }else{
            return res.status(400).json({
                message: "Order does not exist",
                success: false
            })
        }
    } catch (error) {
        console.log("Error in Finding the order details", error);
        return res.status(500).json({
            message: "Error in Finding the order details",
            error
        })
    }
}
