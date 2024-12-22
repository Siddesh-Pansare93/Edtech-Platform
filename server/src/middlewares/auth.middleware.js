import { ApiError } from "../utils/ApiError.util.js"
import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'




const verifyJwt = async(req , next)=>{
   try {
     const token  =  req.cookies?.accessToken || req.headers("Authorization").split(" ")[1]
 
     if(!token){
        throw new ApiError(400 , "Access Token not Present")
     }

     const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
     console.log(decodedToken)

     if(!decodedToken){
        throw new ApiError(400 , "Invalid Access Token")
     }

     const user = User.findById(decodedToken?._id).select("-password -refreshToken")

     if(!user){
        throw new ApiError(400 , "Invalid Token  : Not able to find user with token")
     }

     req.user = user
     next()
 }catch (error) {
    throw new ApiError(400 , `Unauthorized : ${error.message}`)
   }
}