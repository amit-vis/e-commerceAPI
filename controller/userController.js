const User = require('../model/user');
const jwt = require('jsonwebtoken');
const secure = require('../config/secure');

/**
 * @swagger
 * tags:
 *  name: User
 *  description: All the operation User
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create user
 *     description: Register the user
 *     parameters:
 *       - name: user
 *         in: body
 *         description: User object to be registered
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully or user already exists
 *       500:
 *         description: Internal Server Error in creating the user
 *     tags:
 *      - User
 */

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

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Login user
 *     description: Login the user also generate the token
 *     parameters:
 *       - name: userCredentials
 *         in: body
 *         description: User credentials for login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: The email address of the user.
 *             password:
 *               type: string
 *               description: The password of the user.
 *     responses:
 *       400:
 *          description: Invalid User name or password!
 *       200:
 *         description: User signed in successfully
 *       500:
 *         description: Internal Server Error in login the user
 *     tags:
 *      - User
 */

module.exports.createSession = async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user || user.password !== req.body.password){
            return res.status(400).json({
                message: "Invalid User name or password!"
            })
        }else{
            console.log("It's working")
            return res.status(200).json({
                message: "Sign In Successfully!",
                success: true,
                data:{
                    token: jwt.sign(user.toJSON(), secure.secretKey, {expiresIn: 100*60*1000})
                }
            })
        }
    } catch (error) {
        console.log("Error in user signed in", error);
        return res.status(500).json({
            message: "Error in user signed in",
            error
        })
    }
}