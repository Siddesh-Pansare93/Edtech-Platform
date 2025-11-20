import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.util.js"
import * as lessonService from "../services/lesson.service.js"

const handleAddLesson = asyncHandler(async (req, res) => {
    try {
        console.log("request received")
        const { courseId, sectionId } = req.params
        const { title, content, order } = req.body
        const videoLocalPath = req.file?.path

        console.log("body : ", req.body)
        console.log("content: ", req.file)

        const createdLesson = await lessonService.addLesson(courseId, sectionId, {
            title,
            content,
            order,
            videoLocalPath
        })

        res
            .status(201)
            .json(
                new ApiResponse(200, createdLesson, "Lesson Created Successfully")
            )
    } catch (error) {
        res
            .status(500)
            .json(new ApiResponse(400, null, `ERROR : Failed to create Lesson : ${error.message}`))
    }
})

const handleUpdateLesson = asyncHandler(async (req, res) => {
    try {
        const { courseId, lessonId } = req.params
        const { title } = req.body
        const videoLocalPath = req.file?.path

        const updatedLesson = await lessonService.updateLesson(courseId, lessonId, {
            title,
            videoLocalPath
        })

        res.status(200).json(new ApiResponse(200, updatedLesson, "Lesson Updated Successfully"))
    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, `ERROR: Failed to update Lesson: ${error.message}`))
    }
})

const handleDeleteLesson = asyncHandler(async (req, res) => {
    try {
        const { courseId, sectionId, lessonId } = req.params

        const deletedLesson = await lessonService.deleteLesson(courseId, sectionId, lessonId)

        res
            .status(200)
            .json(new ApiResponse(200, deletedLesson, "Lesson Deleted Successfully"))
    } catch (error) {
        res
            .status(400)
            .json(new ApiResponse(400, null, `ERROR : Failed to delete Lesson : ${error.message}`))
    }
})

export {
    handleAddLesson,
    handleUpdateLesson,
    handleDeleteLesson
}