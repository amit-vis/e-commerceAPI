const Product = require('../model/product');
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
                message: "Product List not found",
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
                message: "Same product already exist",
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

module.exports.details = async (req, res)=>{
    try {
        const findProduct = await Product.findById(req.params.id);
        if(findProduct){
            return res.status(200).json({
                message: "Product Details",
                success: true,
                findProduct
            })
        }else{
            return res.status(400).json({
                message: "Product is not exist",
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