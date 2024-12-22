import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const userSchema  = new mongoose.Schema({
    name : {
        type : String , 
        required : true  , 
    } , 
    username :  {
        type : String , 
        required  : [true  , "Username is required"] , 
        lowercase : true ,
        trim : true   , 
        unique  : true 
    } , 
    email :{
        type : String , 
        required : true , 
        lowercase : true , 
        trim : true , 
        unique : true
    } , 
    password : { 
        type : String , 
        required : true ,   
    },
    role : {
        type : String , 
        required :  true  ,
        enum : ["student" , "instructor" , "admin"]
    },
    skillLevel : {
        type: String , 
        required: true
    } , 
    avatar : {
        type : String , 
    }
} ,{timestamps : true})


userSchema.pre("save" , async function (params) {
    if(!this.isModified("password")) return next() ; 

    this.password = await bcrypt.hash(this.password , 10)
})


userSchema.methods.isPassWordCorrect = async function (password) {
   return  await bcrypt.compare( password , this.password )
}


export default User = mongoose.model("User" , userSchema)