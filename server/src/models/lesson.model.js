import mongoose from "mongoose";

const lessonSchema =  new mongoose.Schema({
    title :  {
        type : String , 
        required :  true , 
        trim : true , 
    } , 
    courseId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref  : "Course"
    } , 
    content : {
        type : String ,             // url of the video or anything ...
        required : true 
    } , 
    order : {
        type : Number ,             // Order of the lesson in the course
        required : true
    }
} , {timestamps : true })




export default Lesson = mongoose.model("Lesson" , lessonSchema)