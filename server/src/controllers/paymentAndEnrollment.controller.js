import { ApiResponse } from '../utils/ApiResponse.util.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import * as paymentService from '../services/paymentAndEnrollment.service.js'

const purchaseCourse = asyncHandler(async (req, res) => {
    try {
        const { courses } = req.body
        const userId = req.user._id

        const result = await paymentService.purchaseCourses(userId, courses)

        if (result.sessionUrl) {
            return res.status(200).json(new ApiResponse(200, result.sessionUrl, result.message))
        }

        res.status(200).json(new ApiResponse(200, null, result.message))
    } catch (error) {
        res.status(error.statusCode || 400).json(new ApiResponse(error.statusCode || 500, null, `Error: ${error.message}`))
    }
})

const verifyAndEnroll = asyncHandler(async (req, res) => {
    try {
        const { success, courseIds } = req.body
        const userId = req.user._id

        const result = await paymentService.verifyAndEnroll(userId, { success, courseIds })

        if (result.success) {
            res
                .status(200)
                .json(new ApiResponse(200, null, result.message))
        } else {
            res.json(result.message)
        }
    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(new ApiResponse(error.statusCode, null, `ERROR : ${error.message}`))
    }
})

const checkEnrollment = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params
        const userId = req.user._id

        const isEnrolled = await paymentService.checkEnrollmentStatus(courseId, userId)

        if (isEnrolled) {
            res.json({ enrolled: true })
        } else {
            res.json({ enrolled: false })
        }
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, `ERROR : ${error.message}`))
    }
})

export {
    purchaseCourse,
    verifyAndEnroll,
    checkEnrollment
}
