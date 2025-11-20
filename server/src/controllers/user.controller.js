import { ApiResponse } from "../utils/ApiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import * as userService from "../services/user.service.js"

const handleUserRegistration = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, name, password, role, skillLevel } = req.body
        const avatarLocalPath = req.file?.path

        const createdUser = await userService.registerUser({
            name,
            username,
            email,
            password,
            role,
            skillLevel,
            avatarLocalPath
        })

        res
            .status(200)
            .json(
                new ApiResponse(200, createdUser, "User Registered Successfully")
            )
    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(new ApiResponse(error.statusCode || 500, null, `Failed to register User ${error.message}`))
    }
})

const handleUserLogin = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body

        const { user, accessToken, refreshToken } = await userService.loginUser({
            username,
            email,
            password
        })

        const options = {
            httpOnly: true,
            secure: true
        }

        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, { user, accessToken, refreshToken }, "User Logged In Successfully")
            )
    } catch (error) {
        console.log("Login error:", error.message)
        res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `${error.message}`)
            )
    }
})

const handleUserLogout = asyncHandler(async (req, res) => {
    try {
        await userService.logoutUser(req.user._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, null, "User Logged Out Successfully"))
    } catch (error) {
        res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, null, `Error during logout: ${error.message}`))
    }
})

const handleUpdateUserProfile = asyncHandler(async (req, res) => {
    try {
        const { name, username, email, skillLevel, role } = req.body

        const updatedUser = await userService.updateUserProfile(req.user._id, {
            name,
            username,
            email,
            skillLevel,
            role
        })

        res
            .status(200)
            .json(new ApiResponse(200, updatedUser, "User Updated Successfully"))
    } catch (error) {
        res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, null, `Error updating profile: ${error.message}`))
    }
})

const handleChangePassword = asyncHandler(async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body

        await userService.changePassword(req.user._id, { oldPassword, newPassword })

        res
            .status(200)
            .json(new ApiResponse(200, null, "Password Updated Successfully"))
    } catch (error) {
        res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, null, `Error changing password: ${error.message}`))
    }
})

const getEnrolledCourses = asyncHandler(async (req, res) => {
    try {
        const enrolledCourses = await userService.getEnrolledCourses(req.user._id)

        if (!enrolledCourses.length) {
            new ApiResponse(400, {}, "Not Found any Enrolled Courses")
        }

        res
            .status(200)
            .json(new ApiResponse(200, enrolledCourses, "Enrolled Courses Retrieved Successfully"))
    } catch (error) {
        console.log(error.message)
        res
            .status(400)
            .json(
                new ApiResponse(400, null, "Error fetching enrolled courses")
            )
    }
})

const getYourCreatedCourses = asyncHandler(async (req, res) => {
    try {
        const courseStatics = await userService.getCreatedCourses(req.user._id)

        res
            .status(200)
            .json(new ApiResponse(200, courseStatics, "Created Courses Retrieved Successfully"))
    } catch (error) {
        console.log(error)
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Error fetching created courses"))
    }
})

export {
    handleUserRegistration,
    handleUserLogin,
    handleUserLogout,
    handleUpdateUserProfile,
    handleChangePassword,
    getEnrolledCourses,
    getYourCreatedCourses
}