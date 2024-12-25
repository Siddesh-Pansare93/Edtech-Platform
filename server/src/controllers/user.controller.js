import { ApiError } from "../utils/ApiError.util.js"
import { ApiResponse } from "../utils/ApiResponse.util.js"
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js"
import logger from "../logger.js"
import { User } from '../models/user.model.js'
import { asyncHandler } from "../utils/asyncHandler.js"

const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId)

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()


    user.refreshToken = refreshToken
    await user.save()




    return { accessToken, refreshToken }


}


const handleUserRegistration = asyncHandler(async (req, res) => {
    try {

        const { username, email, name, password, role, skillLevel } = req.body

        if ([name, username, email, password, role, skillLevel].some(field => (!field || field.trim() === ""))) {
            throw new ApiError(400, "All Fields are required")
        }

        const existingUser = await User.findOne({
            $or: [{ username, email }]
        })

        console.log(existingUser)

        if (existingUser) {
            throw new ApiError(400, "User with Username or Email already exists")
        }

        const avatarLocalPath = req.file?.path
        logger.info(avatarLocalPath)
        let avatarDetails



        if (avatarLocalPath) {
            avatarDetails = await uploadOnCloudinary(avatarLocalPath)
        }


        const user = await User.create({
            name,
            username,
            email,
            password,
            skillLevel,
            role,
            avatar: avatarDetails.url
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if (!createdUser) {
            throw new ApiError(400, "Failed to create User in Database")
        }


        res
            .status(200)
            .json(
                new ApiResponse(200, createdUser, "User Registered Successfully")
            )
    } catch (error) {
        throw new ApiError(400, `ERROR : ${error.message}`)
    }
})


const handleUserLogin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if ([username, email].some(field => (!field || field.trim() === ""))) {
        throw new ApiError(400, "Please fill all fields")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    })

    if (!user) {
        throw new ApiError(400, "User Not Found")
    }

    const isPassWordCorrect = await user.isPassWordCorrect(password)

    if (!isPassWordCorrect) {
        throw new ApiError(400, "Invalid Password")
    }



    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    if (!accessToken || !refreshToken) {
        throw new ApiError(400, "Failed to generate Access and Refresh Token")
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: false,
        secure: true
    }

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInUser, "User Logged In Successfully")
        )

})


const handleUserLogout = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { "refreshToken": "" }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: false,
        secure: true
    }

    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User Logged Out Successfully"))
})

const handleUpdateUserProfile = asyncHandler(async (req, res) => {

    const { name, username, email, skillLevel, role } = req.body

    const updatedUser = User.findByIdAndUpdate(
        req.user._id,
        {
            name,
            email,
            username,
            skillLevel,
            role
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!updatedUser) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "User Not Found"))
    }

    res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "User Updated Successfully"))

})


const handleChangePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if (oldPassword === newPassword) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Old Password and New Password cannot be the same. Please choose a different password"))
    }



    const user = await User.findById(req.user._id)
    if (!user) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "User Not Found"))
    }

    user.password = newPassword
    await user.save()



    res
        .status(200)
        .json(new ApiResponse(200, null, "Password Updated Successfully"))
})


const getEnrolledCourses = asyncHandler(async(req,  res )=>{

    // logic goes here
})






export {
    handleUserRegistration,
    handleUserLogin,
    handleUserLogout,
    handleUpdateUserProfile,
    handleChangePassword
}