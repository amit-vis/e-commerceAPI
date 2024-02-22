const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose')

app.use(express.json())

app.use('/', require('./routes'));
app.listen(port, (err)=>{
    if(err){
        console.log("Error In Listening the port", err)
    }
    console.log("Server is listen the port", port)
})