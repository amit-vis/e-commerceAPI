const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - category
 *       properties:
 *         category:
 *           type: string
 *           description: The name of the category.
 *       example:
 *         category: Electronics
 */

const categorySchema = mongoose.Schema({
    category:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;