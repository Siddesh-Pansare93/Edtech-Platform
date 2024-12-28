import { isValidObjectId } from "mongoose"
import { Enrollment } from "../models/enrollment.model.js"
import { ApiResponse } from "./ApiResponse.util.js"


const isEnrolled = async(courseId , userId , res )=> {
    try {
        if(!(isValidObjectId(courseId)|| isValidObjectId(userId))){
            throw new Error('Invalid Course or User Id')
        }
        const enrollment = await Enrollment.findOne({course:courseId , user:userId})
        console.log("Enrollement object : " , enrollment )
        return enrollment ? true : false

    } catch (error) {
        res
        .status(500)
        .json(
            new ApiResponse(error.statusCode || 400 , null , `ERROR : ${error.message}`)
        )
    }
}


export {
    isEnrolled
}