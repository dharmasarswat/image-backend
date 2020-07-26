const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },  
    role:{
        type: String,
        required: true,
        default: 'student',
        emun: ['student', 'teacher']
    } 
} , {timestamps: true})


module.exports = User = mongoose.model('User' , UserSchema)