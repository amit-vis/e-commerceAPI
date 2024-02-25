const Cart = require('../model/cart');
const Product = require('../model/product');

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: All the operation related cart
 */

/**
 * @swagger
 * /cart/add/{id}:
 *   post:
 *     summary: Add Item Into cart
 *     description: Add the Items into the cart
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         type: string
 *     responses:
 *       404:
 *         description: Product is not in stock or not available
 *       200:
 *         description: Cart Item updated or new Item added into the cart
 *       500:
 *         description: Internal Server Error in adding the item into the cart
 *     security:
 *       - jwt: []
 *     tags:
 *       - Cart
 */

// code for add the product into cart
module.exports.addCart = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id)
        const cart = await Cart.findOne({product: product._id})
        .populate('product')
        if(product.availability===false){
            return res.status(404).json({
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

/**
 * @swagger
 * /cart/view-cart:
 *   get:
 *     summary: view cart Item
 *     description: List of all the Item which are presents in the cart
 *     responses:
 *       200:
 *         description: success all the list items of the cart
 *       500:
 *         description: Internal Server Error to getting the data
 *     security:
 *       - jwt: []
 *     tags:
 *       - Cart
 */

// code for get the list of the cart items
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

/**
 * @swagger
 * /cart/update-quantity/{id}:
 *   put:
 *     summary: update cart item quantity
 *     description: update the quantity as well show the price according to quantity
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the cart item
 *         required: true
 *         type: string
 *       - name: quantity
 *         in: body
 *         description: New quantity for the cart item
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             quantity:
 *               type: integer
 *               minimum: 0
 *     responses:
 *       200:
 *         description: delete the Item when count update 0 and Item quantity and price updated
 *       400:
 *         description: Item does not found and not exist in the cart
 *       500:
 *         description: Internal server error in updating the data in the cart
 *     security:
 *       - jwt: []
 *     tags:
 *       - Cart
 */

// here is the code for update the quantity
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

/**
 * @swagger
 * /cart/delete-item/{id}:
 *   delete:
 *     summary: Delete Item
 *     description: Operation to delete an item from the cart
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the cart item to be deleted
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success, item deleted successfully
 *       400:
 *         description: Item does not exist or Item not found
 *       500:
 *         description: Internal Server error in deleting the cart item
 *     security:
 *       - jwt: []
 *     tags:
 *       - Cart
 */

// here is the code for delete the item from the cart
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