const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const { connect } =  require('mongoose')
const fileUpload = require('express-fileupload')

// setting env variable path
require('dotenv').config({
    path: './config/config.js'
})

const app = express();

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())
app.use(passport.initialize())

require('./middleware/passport')(passport)


// User Routes middleware
app.use('/api', require('./routes/index'))
app.use('/api/user', require('./routes/user'))

// start the app
const startApp = async ()=>{
    try {
        // connect to database
        await connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            },
            ()=> console.log("db connected")
            ),
        
        // start server
        app.listen(process.env.PORT , ()=>{
            console.log("server Started")
        })
    }catch(err){
        console.log(err)
        // try restarting app if error occurs
        startApp()
    }
}

startApp()