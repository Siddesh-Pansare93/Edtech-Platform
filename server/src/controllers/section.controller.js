import { isValidObjectId } from 'mongoose'
import { Section } from '../models/section.model.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Course } from "../models/course.model.js"
import { isInstructorOfCourse } from '../utils/isInstructor.util.js'
import { ApiError } from '../utils/ApiError.util.js'


const handleCreateSection = asyncHandler(async (req, res) => {
    try {
        const { title, order } = req.body
        const { courseId } = req.params

        if (!isValidObjectId(courseId)) {
            throw new ApiError(400, "Invalid Course Id")
        }

        //Checking if user is instructor of this course
        const isInstructor = await isInstructorOfCourse(courseId, req.user._id)
        if (!isInstructor) {
            throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
        }


        const course = await Course.findById(courseId)
        if (!course) {
            throw new ApiError(400, "Course not Found")
        }




        const createdSection = await Section.create({
            title,
            order,
        })

        if (!createdSection) {
            throw new ApiError(400, "Failed to create section")
        }

        course.sections.push(createdSection._id)
        await course.save()

        res
            .status(200)
            .json(new ApiResponse(200, createdSection, "Section created successfully"))


    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `ERROR Creating Section : ${error.message}`)
            )
    }
})


const handleUpdateSectionDetails = asyncHandler(async (req, res) => {
    try {
        const { title, order } = req.body
        const { courseId, sectionId } = req.params

        if (!(isValidObjectId(courseId) || isValidObjectId(sectionId))) {
            throw new ApiError(400, "Invalid Course Id or Section Id")
        }

        //Checking if user is instructor of this course
        const isInstructor = isInstructorOfCourse(courseId, req.user._id)
        if (!isInstructor) {
            throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
        }

        const course = await Course.findById(courseId)
        if (!course) {
            throw new ApiError(400, "Course not Found")
        }




        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $set: {
                    title,
                    order
                }
            },
            {
                new: true
            }
        )

        if (!updatedSection) {
            throw new ApiError(404, "Failed to update section")
        }



        res
            .status(200)
            .json(new ApiResponse(200, createdSection, "Section created successfully"))


    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `ERROR updating Section : ${error.message}`)
            )
    }
})


const handleDeleteSection = asyncHandler(async (req, res) => {
    try {
        const { sectionId, courseId } = req.params


        if (!(isValidObjectId(sectionId) || isValidObjectId(courseId))) {
            throw new ApiError(400, "Invalid Section Id or Course Id")
        }

        //Checking if user is instructor of this course
        const isInstructor = isInstructorOfCourse(courseId, req.user._id)
        if (!isInstructor) {
            throw new ApiError(403, "You are not the instructor of this course hence not allowed to perform action")
        }

        const section = await Section.findById(sectionId)
        if (!section) {
            throw new ApiError(404, "Section not found")
        }

        //deleting section in from sections array in course
        const updateCourse = Course.findByIdAndUpdate(
            courseId,
            {
                $pull: { sections: sectionId }
            }
        )

        if (!updateCourse) {
            throw new ApiError(404, "Course not found or error in deleting section from course")
        }


        //deleting section document 
        const deletedSection = await Section.findByIdAndDelete(sectionId)
        res
            .status(200)
            .json(new ApiResponse(200, deletedSection, "Section deleted successfully"))


    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, `ERROR : Deleting Section : ${error.message}`)
            )
    }
})


export {
    handleCreateSection,
    handleDeleteSection,
    handleUpdateSectionDetails
}