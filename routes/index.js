const router = require('express').Router()
const {  register , login } = require('../controllers/auth')
const Auth = require('../middleware/auth')


//login route
router.post('/login', login)


//register route
router.post('/register', register)



module.exports = router