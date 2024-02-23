const swaggerDoc = require('swagger-jsdoc');


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