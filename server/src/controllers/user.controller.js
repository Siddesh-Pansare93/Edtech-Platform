import { ApiError } from "../utils/ApiError.util.js"
import { ApiResponse } from "../utils/ApiResponse.util.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import logger from "../logger.js"
import { User } from '../models/user.model.js'
import { Enrollment } from "../models/enrollment.model.js"
import { Course } from "../models/course.model.js"
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
        console.log("request received for registering user")
        console.log(req.body)
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
        res
            .status(error.statusCode || 400)
            .json(new ApiResponse(error.statusCode || 500, null, `Failed to register User ${error.message}`))
    }
})

const handleUserLogin = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Check if at least one identifier is provided (username OR email)
        if ((!username && !email) || !password) {
            throw new ApiError(400, "Please provide username/email and password")
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
                new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User Logged In Successfully")
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
    } catch (error) {
        res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, null, `Error during logout: ${error.message}`))
    }
})

const handleUpdateUserProfile = asyncHandler(async (req, res) => {
    try {
        const { name, username, email, skillLevel, role } = req.body

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    name,
                    email,
                    username,
                    skillLevel,
                    role
                }
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
    } catch (error) {
        res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, null, `Error updating profile: ${error.message}`))
    }
})

const handleChangePassword = asyncHandler(async (req, res) => {
    try {
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
    } catch (error) {
        res
            .status(error.statusCode || 500)
            .json(new ApiResponse(error.statusCode || 500, null, `Error changing password: ${error.message}`))
    }
})

const getEnrolledCourses = asyncHandler(async (req, res) => {
    try {
        const enrolledCourses = await Enrollment.find({
            user: req.user._id
        }).select("course").populate({
            path: "course",
            populate: {
                path: "instructor",
                select: "name"
            }
        })

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
        const instructorCourses = await Course.aggregate([
            {
                $match: {
                    instructor: req.user._id
                }
            },
            {
                $lookup: {
                    from: "enrollments",
                    localField: "_id",
                    foreignField: "course",
                    as: "enrolledStudents",
                }
            },
            {
                $addFields: {
                    enrolledStudents: { $size: "$enrolledStudents" }
                }
            },
        ])

        const courseStatics = {
            totalCourses: instructorCourses.length,
            totalEnrolledStudents: instructorCourses.reduce((acc, course) => acc + course.enrolledStudents, 0),
            instructorCourses
        }

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