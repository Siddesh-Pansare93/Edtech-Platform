import mongoose from "mongoose";

const enrollmentSchema  = new mongoose.Schema({
    courseId :  {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Course"
    } , 
    userId : { 
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User"
    },
    status : {
        type : String ,
        enum : ["completed" , "inProgress"]
        }
} , {timestamps : true })


export const Enrollment = mongoose.model("Enrollment" , enrollmentSchema)