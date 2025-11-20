import { ApiError } from "../utils/ApiError.util.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import logger from "../logger.js"
import { User } from '../models/user.model.js'
import { Enrollment } from "../models/enrollment.model.js"
import { Course } from "../models/course.model.js"

/**
 * Generate Access and Refresh Token for a user
 * @param {string} userId - User ID
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
const generateAccessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save()

    return { accessToken, refreshToken }
}

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's name
 * @param {string} userData.username - User's username
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @param {string} userData.role - User's role
 * @param {string} userData.skillLevel - User's skill level
 * @param {string} [userData.avatarLocalPath] - Local path to avatar file
 * @returns {Promise<Object>} Created user object
 */
const registerUser = async ({ name, username, email, password, role, skillLevel, avatarLocalPath }) => {
    console.log("request received for registering user")

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
        avatar: avatarDetails?.url
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(400, "Failed to create User in Database")
    }

    return createdUser
}

/**
 * Login a user
 * @param {Object} credentials - Login credentials
 * @param {string} [credentials.username] - User's username
 * @param {string} [credentials.email] - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<{user: Object, accessToken: string, refreshToken: string}>}
 */
const loginUser = async ({ username, email, password }) => {
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

    return { user: loggedInUser, accessToken, refreshToken }
}

/**
 * Logout a user by clearing their refresh token
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
const logoutUser = async (userId) => {
    await User.findByIdAndUpdate(
        userId,
        {
            $set: { "refreshToken": "" }
        },
        {
            new: true
        }
    )
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updateData - Data to update
 * @param {string} [updateData.name] - User's name
 * @param {string} [updateData.username] - User's username
 * @param {string} [updateData.email] - User's email
 * @param {string} [updateData.skillLevel] - User's skill level
 * @param {string} [updateData.role] - User's role
 * @returns {Promise<Object>} Updated user object
 */
const updateUserProfile = async (userId, { name, username, email, skillLevel, role }) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
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
        throw new ApiError(404, "User Not Found")
    }

    return updatedUser
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {Object} passwords - Password data
 * @param {string} passwords.oldPassword - Old password
 * @param {string} passwords.newPassword - New password
 * @returns {Promise<void>}
 */
const changePassword = async (userId, { oldPassword, newPassword }) => {
    if (oldPassword === newPassword) {
        throw new ApiError(400, "Old Password and New Password cannot be the same. Please choose a different password")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    user.password = newPassword
    await user.save()
}

/**
 * Get courses enrolled by a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of enrolled courses
 */
const getEnrolledCourses = async (userId) => {
    const enrolledCourses = await Enrollment.find({
        user: userId
    }).select("course").populate({
        path: "course",
        populate: {
            path: "instructor",
            select: "name"
        }
    })

    return enrolledCourses
}

/**
 * Get courses created by an instructor
 * @param {string} userId - Instructor's user ID
 * @returns {Promise<Object>} Course statistics and list
 */
const getCreatedCourses = async (userId) => {
    const instructorCourses = await Course.aggregate([
        {
            $match: {
                instructor: userId
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

    return courseStatics
}

export {
    generateAccessAndRefreshToken,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    getEnrolledCourses,
    getCreatedCourses
}
