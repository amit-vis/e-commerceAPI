const User = require('../model/user');
const jwt = require('jsonwebtoken');
const secure = require('../config/secure');

module.exports.create = async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(200).json({
                message: "User already exist",
                success: true,
                user
            })
        }else{
            const newUser = await User.create(req.body);
            return res.status(200).json({
                message: "Register Successfully!",
                success: true,
                newUser
            })
        }
    } catch (error) {
        console.log("Error in registring the user", error);
        return res.status(500).json({
            message: "Error in registring the user",
            error
        })
    }
}

module.exports.createSession = async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user || user.password !== req.body.password){
            return res.status(400).json({
                message: "Invalid User name and password!"
            })
        }else{
            return res.status(200).json({
                message: "Sign In Successfully!",
                success: true,
                data:{
                    token: jwt.sign(user.toJSON(), secure.secretKey, {expiresIn: "1000*60*100"})
                }
            })
        }
    } catch (error) {
        
    }
}