import { isValidObjectId } from 'mongoose'
import { Section } from '../models/section.model.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { Course } from "../models/course.model.js"


const handleCreateSection = asyncHandler(async (req, res) => {
    try {
        const { title, order, courseId } = req.body

        if (!isValidObjectId) {
            throw new ApiError(400, "Course not Found")
        }

        const course = await Course.findById(courseId)
        if (!course) {
            throw new ApiError(400, "Course not Found")
        }

        if (!(course.instructor === req.user._id)) {
            throw new ApiError(403, "You are not authorized to create a section for this course")
        }


        const createdSection = await Section.create({
            title,
            order,
            courseId,
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
        const { title, order, courseId } = req.body
        const sectionId = req.params

        if (!isValidObjectId(courseId)) {
            throw new ApiError(400, "Invalid Course Id")
        }
        if (!isValidObjectId(sectionId)) {
            throw new ApiError(400, "Invalid Section Id")
        }

        const course = await Course.findById(courseId)
        if (!course) {
            throw new ApiError(400, "Course not Found")
        }

        if (!(course.instructor === req.user._id)) {
            throw new ApiError(403, "You are not authorized to update a section for this course")
        }


        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                title,
                order,
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
                new ApiResponse(400, null, `ERROR Creating Section : ${error.message}`)
            )
    }
})


const handleDeleteSection = asyncHandler(async (req, res) => {
    try {
        const sectionId = req.params
        const {courseId} = req.query

        if (!isValidObjectId(sectionId)) {
            throw new ApiError(400, "Invalid Section Id")
        }

        const section = await Section.findById(sectionId)
        if (!section) {
            throw new ApiError(404, "Section not found")
        }

        
        
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
    handleCreateSection , 
    handleDeleteSection , 
    handleUpdateSectionDetails

}