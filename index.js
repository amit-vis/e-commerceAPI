// main index file here we have imported all the required data
const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// we have use express for json performance
app.use(express.json());

// here we have use swagger to setup the docs about the api routes
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerSpec));

// we have connted to our routes
app.use('/', require('./routes'));

// here we have listen the port
app.listen(port, (err)=>{
    if(err){
        console.log("Error In Listening the port", err)
    }
    console.log("Server is listen the port", port)
})