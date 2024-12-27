
import { ApiResponse } from "../utils/ApiResponse.util.js"


const isAdmin = async (req, res, next) => {
    const userRole = req.user.role

    if (!(userRole === "admin")) {
        return res.status(403).json(new ApiResponse (403 , null , "You are not an Admin"))
    }

    next()
}

const isInstructorOrAdmin = async (req, res, next) => {
    const userRole = req.user.role
    
    console.log(userRole)
    if (!(userRole === "instructor" || userRole ==="admin")) {
        return res.status(403).json( new ApiResponse (403 , null , "You are not an instructor or Admin") )
    }

    next()
}


export {
    isAdmin,
    isInstructorOrAdmin
}

