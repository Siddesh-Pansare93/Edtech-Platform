import mongoose from "mongoose";


const certificateSchema =  new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User" , 
        required : true 
    },
    course : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Course" , 
        required : true 
    },
    IssueDate : {
        type : Date ,
        required : true
    },
    certificateUrl : {
        type : String ,
        required : true
    }        
} , {timestamps : true})


export const Certificate = mongoose.model("Certificate" , certificateSchema)