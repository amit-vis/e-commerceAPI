const swaggerDoc = require('swagger-jsdoc');

// here we have setup our options for swagger documents
const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'E-commerce APi Projects',
            version: '1.0.0'
        },
        servers:[
            {
                url: 'http://localhost:8000'
            }
        ]
    },

    // we have given apis to document each and every operation
    apis: ['./model/product.js',
            './model/user.js',
            './model/orderplace.js',
            './model/category.js',
            './model/cart.js',
        './controller/homeController.js', 
            './controller/cartController.js',
            './controller/categoryController.js',
            './controller/orderPlaceController.js',
            './controller/productCotroller.js',
            './controller/userController.js']
}
const swaggerSpec = swaggerDoc(options);

module.exports = swaggerSpec;