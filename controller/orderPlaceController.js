const Order = require('../model/orderplace');
const Cart = require('../model/cart');

/**
 * @swagger
 * tags:
 *  name: Order
 *  description: All the operation Order placement
 */

/**
 * @swagger
 * /order/place/{id}:
 *   post:
 *     summary: Place the order
 *     description: Place the order from the cart
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the cart to place the order
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order placed successfully or Order already placed
 *       500:
 *         description: Internal Server Error in Placing the order
 *     security:
 *       - jwt: []
 *     tags:
 *      - Order
 */

// here place the by cart id
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
        if(order || cart._id){
            return res.status(200).json({
                message: "Order already Placed",
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

/**
 * @swagger
 * /order/history:
 *   get:
 *     summary: Placed order history
 *     description: History of all the placed orders
 *     responses:
 *       200:
 *         description: List of all the past orders
 *       500:
 *         description: Internal Server Error Getting the order History list
 *     security:
 *       - jwt: []
 *     tags:
 *      - Order
 */

// check the order history
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

/**
 * @swagger
 * /order/details/{id}:
 *   get:
 *     summary: Order details
 *     description: Fetch the order details by the order ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order
 *         required: true
 *         type: string
 *     responses:
 *       400:
 *          description: Order does not exist or not found
 *       200:
 *         description: Success, order details successfully
 *       500:
 *         description: Internal Server Error Getting the order details
 *     security:
 *       - jwt: []
 *     tags:
 *      - Order
 */

// check the order details by the order id
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
