const Category = require('../model/category');
const Product = require('../model/product')

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