const mongoose = require('mongoose')

const SubmissionSchema = mongoose.Schema({
    studentId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
    },
    marks:{
        type: Number
    }
} , {timestamps: true})

const AssignmentSchema = mongoose.Schema({
    teacherId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    lastDate:{
        type: Date,
        required: true,
    },
    url:{
        type: String,
        required: true,
    },  
    submission: [SubmissionSchema]
} , {timestamps: true})

const Assignment = mongoose.model('Assignment' , AssignmentSchema)
const Submission = mongoose.model('Submission' , SubmissionSchema)

module.exports = {  
    Assignment, 
    Submission
}