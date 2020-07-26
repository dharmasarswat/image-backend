const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Auth = require('../middleware/auth')

/*
*@desc Login for user
*/
const login = async (req,res)=> {
    try{
        const { email, password } = req.body

        // validate user data
        if(!email || !password ){
            res.send({
                success: false, 
                message: "Please enter all the fields." 
            })
        }else{
            const user = await User.findOne({email})
            if(!user){
                res.send({
                    success: false, 
                    message: "User not found." 
                })
            }
            else{
                const isMatch = await bcrypt.compare(password , user.password)
                if(isMatch){
                    // Sign the token and assign to user
                    const token = jwt.sign({
                            id: user._id,
                            email: user.email
                        }, 
                        process.env.SESSION_SECRET
                    )
                    
                    // send response
                    res.status(200).json({
                        success: true,
                        message:"Logged In SuccessFully.",
                        token: `Bearer ${token}`,
                        user: user
                    })

                }else{
                    res.send({
                        success: false, 
                        message: "Password Incorrect." 
                    })
                }
            }
        }
    }catch(err){
        // if error occurs
        res.status(500).send({
            success: false, 
            message: "Something went wrong. Try again." 
        })
    }
}


/*
*@desc Sign up for user (takes params as req,res,role)
*/
const register = async (req,res)=> {
    try{
        const { name, email, password , confirmPassword , role } = req.body

        // Validate User
        if(!name || !email || !password || !confirmPassword || !role){
            return res.send({ 
                success: false, 
                message: "All fields must be filled." 
            })
        }

        // match passwords
        if(password !== confirmPassword ){
            return res.send({ 
                success: false, 
                message: "Password did not match." 
            })
        }

        // validate password
        if(password.length < 5 ){
            return res.send({ 
                success: false, 
                message: "Password must be 5 character long." 
            })
        }else{
            
            // check if user already exists
            const existingUser = await User.findOne({email})
            if(existingUser){
                res.send({ 
                    success: false,
                    message: "This email is already assigned to another user." 
                })
            }else{
                // hash password
                const hashedPassword = await bcrypt.hash(password , 12)

                // create new user
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword,
                    role
                })

                // save user
                await newUser.save()

                return res.status(201).json({
                    success: true,
                    message: "You are Successfully registered. Try Logging in.",
                })
            }
        }   
    }catch(err){
        // if error occurs
        res.status(500).send({
            success: false, 
            message: "Something went wrong. Try again." 
        })
    }
}




module.exports = {
    login,
    register
}