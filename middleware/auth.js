const passport = require('passport')

module.exports =  Auth = passport.authenticate('jwt' , { session: false })

