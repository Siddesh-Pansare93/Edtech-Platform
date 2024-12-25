import { Course } from '../models/course.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from "../utils/ApiResponse.util.js"
import { ApiError } from "../utils/ApiError.util.js"
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js"
import { isValidObjectId } from 'mongoose'


const handleCourseCreation = asyncHandler(async (req, res) => {

    //gather data ,
    //validation 
    //thumbnail from req.file 
    //save to db
    //push courses to category 


    try {
        const { title, description, paid, price, validity, curriculum } = req.body

        const instructor = req.user._id
        let preRequisites = JSON.parse(req.body.preRequisites)

        if ([title, description, paid, price, validity, curriculum].some(field => !field || field.trim() === "")) {
            throw new ApiError(400, "ALL fields are required")
        }


        const pricing = parseFloat(price)
        const courseCurriculum = curriculum.split(",").map(index => index.trim())
        console.log(courseCurriculum)
        const thumbnailLocalPath = req.files?.thumbnail[0].path


        if (!thumbnailLocalPath) {
            throw new ApiError(400, "Thumnail file is required")
        }

        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

        console.log(thumbnail)

        const createdCourse = await Course.create({
            title,
            description,
            paid,
            price: pricing,
            validity,
            preRequisites,
            thumbnail: thumbnail.url,
            instructor,
            curriculum: courseCurriculum

        })

        console.log(createdCourse)

        if (!createdCourse) {
            throw new ApiError(500, "Failed to create course")
        }

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
        const user = req.user._id

        const course = Course.findOne(courseId)
        if (!course) {
            throw new ApiError(404, "Course not found")
        }

        if (course.instructor.toString() !== user.toString()) {
            throw new ApiError(403, "You are not authorized to update this course")
        }

        const { title, description, paid, price, validity, curriculum } = req.body
        let preRequisites = JSON.parse(req.body.preRequisites)

        if (!isValidObjectId) {
            throw new ApiError(400, "Invalid course id")
        }



        if ([title, description, paid, price, validity, curriculum].some(field => !field || field.trim() === "")) {
            throw new ApiError(400, "ALL fields are required")
        }

        const pricing = parseFloat(price)


        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                title,
                description,
                paid,
                price: pricing,
                validity,
                preRequisites: preRequisites,
                curriculum
            },
            {
                new: true
            }
        )

        if (!updatedCourse) {
            throw new ApiError(404, "Course not found")
        }

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
        console.log(courseId)

        if (!isValidObjectId(courseId)) {
            throw new ApiError(400, "Invalid Course Id")
        }
        const user = req.user._id


        const course = await Course.findById(courseId)
        console.log(course)
        if (!course) {
            throw new ApiError(404, "Course not found")
        }


        if (course.instructor?.toString() !== user?.toString()) {
            throw new ApiError(403, "You are not authorized to delete this course")
        }

        const deletedCourse = await Course.findByIdAndDelete(courseId)

        if (!deletedCourse) {
            throw new ApiError(404, "Error in deleting Course")
        }

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
        if(!isValidObjectId(courseId)){
            throw new ApiError(400, "Invalid Course Id")
        }
        const user = req.user._id
        const course = await Course.findById(courseId)

        if (!course.instructor === user) {
            throw new ApiError(403, "You are not authorized to publish this course")
        }

        course.isPublished = !course.isPublished
        const publishedCourse = await course.save()

        console.log(publishedCourse)

        if (!publishedCourse) {
            throw new ApiError(404, "Error in publishing Course")
        }

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
        const courses = await Course.find({
            isPublished: true
        })

        console.log(courses)
        if (!courses?.length) {
            throw new ApiError(404, "No Courses Found")
        }

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
        if(!isValidObjectId(courseId)){
            throw new ApiError(400, "Invalid Course Id")
        }
        console.log(courseId)

        const course = await Course.findById(courseId).populate({
            path: 'instructor',
            select: 'name   email'
        })

        if (!course) {
            throw new ApiError(404, "Course Not Found")
        }


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








export {
    handleCourseCreation,
    handleCourseDetailsUpdate,
    handleCourseDeletion,
    togglePublishStatus,
    getAllCourses ,
    getCourseDetails
}