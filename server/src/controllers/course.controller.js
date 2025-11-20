import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from "../utils/ApiResponse.util.js"
import * as courseService from "../services/course.service.js"

const handleCourseCreation = asyncHandler(async (req, res) => {
    try {
        const { title, description, paid, price, validity, curriculum, preRequisites } = req.body
        const instructor = req.user._id
        const thumbnailLocalPath = req.files?.thumbnail[0].path

        console.log(req.body)

        const createdCourse = await courseService.createCourse({
            title,
            description,
            paid,
            price,
            validity,
            curriculum,
            preRequisites,
            instructor,
            thumbnailLocalPath
        })

        res
            .status(200)
            .json(
                new ApiResponse(200, createdCourse, "Course created Successfully")
            )
    } catch (error) {
        return res.status(400).json(
            new ApiResponse(400, null, error.message)
        )
    }
})

const handleCourseDetailsUpdate = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params
        const userId = req.user._id
        const { title, description, paid, price, validity, curriculum, preRequisites } = req.body

        const updatedCourse = await courseService.updateCourse(courseId, userId, {
            title,
            description,
            paid,
            price,
            validity,
            curriculum,
            preRequisites
        })

        res
            .status(200)
            .json(
                new ApiResponse(200, updatedCourse, "Course details updated successfully")
            )
    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `Error Updating Course Details : ${error.message}`)
            )
    }
})

const handleCourseDeletion = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params
        const userId = req.user._id

        await courseService.deleteCourse(courseId, userId)

        res
            .status(200)
            .json(
                new ApiResponse(200, null, "Course Deleted Successfully")
            )
    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `Error Deleting Course : ${error.message}`)
            )
    }
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params
        const userId = req.user._id

        const publishedCourse = await courseService.togglePublishStatus(courseId, userId)

        res
            .status(200)
            .json(
                new ApiResponse(200, publishedCourse, "Course Published Successfully")
            )
    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `Error Publishing Course : ${error.message}`)
            )
    }
})

const getAllCourses = asyncHandler(async (req, res) => {
    try {
        const courses = await courseService.getAllPublishedCourses()

        res
            .status(200)
            .json(
                new ApiResponse(200, courses, "Succesfully fetched course Details")
            )
    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `ERROR while fetching Courses : ${error.message} `)
            )
    }
})

const getCourseDetails = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params

        const course = await courseService.getCourseDetails(courseId)

        res
            .status(200)
            .json(
                new ApiResponse(200, course, "Course Details Fetched Successfully")
            )
    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `ERROR while fetching Course Details : ${error.message} `)
            )
    }
})

const getCourseContent = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params
        const userId = req.user._id

        const courseContent = await courseService.getCourseContent(courseId, userId)

        res
            .status(200)
            .json(
                new ApiResponse(200, courseContent, "Course Content Fetched Successfully")
            )
    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `Error while fetching Course Sections : ${error.message} `)
            )
    }
})

export {
    handleCourseCreation,
    handleCourseDetailsUpdate,
    handleCourseDeletion,
    togglePublishStatus,
    getAllCourses,
    getCourseDetails,
    getCourseContent
}