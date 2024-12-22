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
    progress : {
        type : Decimal
    }
} , {timestamps : true })