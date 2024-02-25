const Product = require('../model/product');
/**
 * @swagger
 * tags:
 *  name: Product
 *  description: All the operation related to product details
 */

/**
 * @swagger
 * /product/list:
 *   get:
 *     summary: list of all products
 *     description: get the list of all the product
 *     responses:
 *       200:
 *         description: success list of order details
 *       400:
 *          description: Products not found or product does not exist
 *       500:
 *         description: Internal Server Error in finding the product lista
 *     tags:
 *      - Product
 */
module.exports.getProduct = async (req, res)=>{
    try {
        const ProductList = await Product.find({});
        if(ProductList){
            return res.status(200).json({
                message: "List of the product",
                success: true,
                ProductList
            })
        }else{
            return res.status(400).json({
                message: "Products not found or product does not exist",
                success: false,
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Error in finding the products",
            error
        })
    }
}

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     description: Operation related to creating a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product created successfully
 *       500:
 *         description: Internal server error creating the product
 *     tags:
 *       - Product
 */

module.exports.createProduct = async (req, res)=>{
    try {
        const product = await Product.findOne({title: req.body.title});
        if(!product){
            const addProduct = await Product.create(req.body)
            return res.status(200).json({
                message: "product created successfully",
                success: true,
                addProduct
            })
        }else{
            return res.status(200).json({
                message: "product already exist",
                success: true,
                product
            })
        }
    } catch (error) {
        console.log("Error in creating the product", error);
        return res.status(500).json({
            message:"Error in creating the product",
            error
        })
    }
}

/**
 * @swagger
 * /product/update-stock/{id}:
 *   put:
 *     summary: update the stock or availability
 *     description: update the stock if stock is out you can easily you availability.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         type: string
 *       - name: availability
 *         in: body
 *         description: Stock or availibity for the products
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             availability:
 *               type: boolean
 *     responses:
 *       200:
 *         description: stock updated successfully
 *       400:
 *         description: Porduct does not exist or product not fount
 *       500:
 *         description: Internal server error in updating the stock of the products
 *     tags:
 *       - Product
 */

module.exports.updateStock = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id)
        .populate('category');

        if(product){
            product.availability = !product.availability;
            await product.save();
            return res.status(200).json({
                message: "Stock updated successfully!",
                success: true,
                product
            })
        }else{
            return res.status(400).json({
                message: "Porduct does not exist or product not fount",
                success: false
            })
        }
    } catch (error) {
        console.log("Internal server Error in updating the stock of the product", error);
        return res.status(500).json({
            message: "Internal server Error in updating the stock of the product",
            error
        })
    }
}

/**
 * @swagger
 * /product/details/{id}:
 *   get:
 *     summary: Product details
 *     description: Fetch the order details by using product id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       400:
 *          description: Product does not exist or product not found
 *       200:
 *         description: Success, check the product details
 *       500:
 *         description: Internal Server Error in fetching the details of the product
 *     tags:
 *      - Product
 */


module.exports.details = async (req, res)=>{
    try {
        const findProduct = await Product.findById(req.params.id)
        .populate('category', 'category')
        .exec();
        if(findProduct){
            return res.status(200).json({
                message: "check the Product Details",
                success: true,
                findProduct
            })
        }else{
            return res.status(400).json({
                message: "Product does not exist",
                success: false,

            })
        }
    } catch (error) {
        console.log("Error in the finding the product details!", error);
        return res.status(500).json({
            message: "Error in the finding the product details!",
            error
        })
    }
}