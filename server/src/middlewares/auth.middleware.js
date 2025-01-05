import { ApiError } from "../utils/ApiError.util.js"
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.util.js"




const verifyJwt = async (req, res, next) => {
   try {
      
      const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1]

      if (!token) {
         throw new ApiError(400, "Access Token not Present : Please Login to get Token")
      }

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      console.log(decodedToken)

      if (!decodedToken) {
         throw new ApiError(400, "Invalid Access Token")
      }

      const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

      if (!user) {
         throw new ApiError(400, "Invalid Token  : Not able to find user with token")
      }


      req.user = user
      next()
   } catch (error) {
      res
         .status(400)
         .json(
            new ApiResponse(400, null ,  `Unauthorized : ${error.message}`)
         )
   }
}

export default verifyJwt