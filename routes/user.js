const router = require('express').Router()
const Auth = require('../middleware/auth')
const path = require('path')
const { Assignment , Submission } = require('../models/Assignment')


// to verify token
router.get('/' , Auth, (req,res)=>{
    res.json({success: true , user: req.user})
})

// Add Assignment Teacher
router.post('/add-assignment' , Auth, (req,res)=>{

    const { name , details , lastDate } = req.body
    const image = req.files.image
    const rand = Math.random()*100
    const uploadpath = `${path.join(__dirname , '../client/public/uploads/Assignments' , `${rand+image.name}`)}`
    

    if(!name || !details || !image || !lastDate ){
        res.json({success: false , message: "Please Enter All the fields"})
    }

    else{
        image.mv(uploadpath, async function() {
            try{
                const newAssignment = new Assignment({
                    teacherId: req.user._id,
                    name,
                    details,
                    url: uploadpath,
                    lastDate
                })
    
                await newAssignment.save()
                res.status(201).json({
                    success: true,
                    message: "Assignment has been saved SuccessFully.",
                    uploadpath
                })
            }catch(err){
                res.status(500).json({
                    success: false,
                    message: "Someting went wrong try Again.",
                })
            }
          });
    }
})

// get Assignment 
router.get('/assignments', Auth , (req,res)=>{
    const teacherId = req.user._id
    Assignment
        .find(teacherId)
        .then(assignment=>{
            res.json({
                success: true,
                assignment
            })
        })
        .catch(err=> console.log(err))
})


module.exports =  router