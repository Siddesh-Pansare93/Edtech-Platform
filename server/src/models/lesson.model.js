import mongoose from "mongoose";

const lessonSchema =  new mongoose.Schema({
    title :  {
        type : String , 
        required :  true , 
        trim : true , 
    } , 
    content : {
        type : String ,             // url of the video or anything ...
        required : true 
    } , 
    order : {
        type : Number ,             // Order of the lesson in the section
        required : true
    }
} , {timestamps : true })




export default Lesson = mongoose.model("Lesson" , lessonSchema)