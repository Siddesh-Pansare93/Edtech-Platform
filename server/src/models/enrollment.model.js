import mongoose from "mongoose";

const enrollmentSchema  = new mongoose.Schema({
    course :  {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Course",
        required : true
    } , 
    user : { 
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User",
        required : true
    },
    status : {
        type : String ,
        enum : ["completed" , "inProgress"]
        }
} , {timestamps : true })


export const Enrollment = mongoose.model("Enrollment" , enrollmentSchema)