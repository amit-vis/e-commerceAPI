const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt');

app.use(express.json())

app.use('/', require('./routes'));
app.listen(port, (err)=>{
    if(err){
        console.log("Error In Listening the port", err)
    }
    console.log("Server is listen the port", port)
})