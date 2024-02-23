const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStratergy = require('passport-jwt').Strategy;
const User = require('../model/user')
const secure = require('./secure');

const opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secure.secretKey
}

passport.use(new JWTStratergy(opts, async (jwt_payload, done)=>{
    try {
        const user = await User.findById(jwt_payload._id);
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    } catch (error) {
        console.log("Error in finding the user in passport", error);
        return done(error, false)
    }
}));

module.exports = passport;