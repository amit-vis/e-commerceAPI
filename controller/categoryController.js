const Category = require('../model/category');
const Product = require('../model/product');

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: operation related to Category add and get
 */

/**
 * @swagger
 * /category/view:
 *   get:
 *     summary: List of categories
 *     description: Operation related to fetch the list of categories
 *     responses:
 *       200:
 *         description: Success, lists of categories are showing
 *       400:
 *         description: Category list not found
 *       500:
 *         description: Internal Server error finding the category list
 *     tags:
 *       - Category
 */

// check the list of the category
module.exports.view = async (req,res)=>{
    try {
        const categoryList = await Category.find({});
        if(categoryList){
            return res.status(200).json({
                message: "Here is the category list!",
                success: true,
                categoryList
            })
        }else{
            return res.status(400).json({
                message: "Category list not found",
                success: false
            })
        }
    } catch (error) {
        console.log("Error in finding the category lists!", error);
        return res.status(500).json({
            message: "Error in finding the category lists!",
            error
        })
    }
}

/**
 * @swagger
 * /category/add:
 *   post:
 *     summary: Add the category
 *     description: Operation related to add the categories
 *     parameters:
 *       - name: category
 *         in: body
 *         description: Category object to be added
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category created successfully or category already exists
 *       500:
 *         description: Internal server error adding the categories
 *     tags:
 *       - Category
 */

// here code for create the category
module.exports.createCategory = async (req, res)=>{
    try {
        const category = await Category.findOne({category: req.body.category});
        if(!category){
            const addCategory= await Category.create({
                category: req.body.category
            })
            return res.status(200).json({
                message: "Cateogory created successfully",
                success: true,
                addCategory
            })
        }else{
            return res.status(200).json({
                message: "Category already exist",
                success: true,
                category
            })
        }
    } catch (error) {
        console.log("Error in creating the category!", error);
        return res.status(500).json({
            message: "Error in creating the category !",
            error
        })
    }
},

/**
 * @swagger
 * /category/productcate/{id}:
 *   get:
 *     summary: Product with category
 *     description: Fetch the product details that come with the category
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the category
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: All product list by category
 *       400:
 *         description: Product not found or no product in this category
 *       500:
 *         description: Internal Server error getting the product details
 *     tags:
 *       - Category
 */

// here get the products categorywise
module.exports.categoryWise = async (req, res)=>{
    try {
        const categoryId = await Category.findById(req.params.id);
        const productCategory = await Product.find({category: categoryId});
        if(categoryId && productCategory.length>0){
            return res.status(200).json({
                message: "all product list by category",
                success: true,
                productCategory
            })
        }else{
            return res.status(400).json({
                message: "product not found and no product in this category",
                success: false
            })
        }
    } catch (error) {
        console.log("Error in finding the category data", error);
        return res.status(500).json({
            message:"Error in finding the category data",
            error
        })
    }
}