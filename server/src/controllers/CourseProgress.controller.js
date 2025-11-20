import { ApiResponse } from "../utils/ApiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import * as courseProgressService from "../services/courseProgress.service.js"

const updateCourseProgress = asyncHandler(async (req, res) => {
    try {
        const { courseId, lessonId } = req.params
        const userId = req.user._id

        const result = await courseProgressService.updateProgress(courseId, lessonId, userId)

        return res
            .status(200)
            .json(
                new ApiResponse(200, result.progress, result.message)
            )
    } catch (error) {
        return res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Updating Course Progress : ${error.message}`)
            )
    }
})

const getCourseProgress = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params
        const userId = req.user._id

        const progress = await courseProgressService.getProgress(courseId, userId)

        return res
            .status(200)
            .json(
                new ApiResponse(200, progress, "Course Progress fetched Successfully")
            )
    } catch (error) {
        return res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Getting Course Progress : ${error.message}`)
            )
    }
})

export {
    updateCourseProgress,
    getCourseProgress
}