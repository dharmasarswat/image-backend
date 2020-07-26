const User = require('../models/User')
const { Strategy, ExtractJwt } = require("passport-jwt")


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SESSION_SECRET
}

module.exports = passport => {
    passport.use(
        new Strategy(options , async (payload , done) => {
            await User.findById(payload.id)
                .then(user =>{
                    if(user){
                        return done(null , user)
                    }else{
                        return done(null ,false)
                    }
                })
                .catch(err=>{
                    return done(null , false)
                })
        })
    )
}       