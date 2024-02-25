// connected our node with the database

const mongoose = require('mongoose');
const secure = require('./secure');
mongoose.connect(secure.mongoUrl);

// here we have conncted out db to the mongodb
const db = mongoose.connection;

// this the message if connection not stablished with database
db.on('error', console.error.bind(console, "Error in connecting to database!"))

// here is the success message when db connected to mongodb
db.once('open', ()=>{
    console.log("database successful connected to mongodb");
})

module.exports = db;