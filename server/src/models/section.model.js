import mongoose from "mongoose";

const sectionSchema =  new mongoose.Schema({
    title :  {
        type : String , 
        required :  true , 
        trim : true , 
    } ,  
    lessons : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "Lesson"
        }
    ] , 
    order : {
        type : Number ,             // Order of the section in the course
        required : true
    }
} , {timestamps : true })




export const Section = mongoose.model("Section" , sectionSchema)