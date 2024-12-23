import mongoose from "mongoose";


const reviewSchema =  new mongoose.Schema({
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
    rating : {
        type : Number ,
        required : true
    },
    content : {
        type : String ,
        required : true
    }        
} , {timestamps : true})


export const Review = mongoose.model("Review" , reviewSchema)