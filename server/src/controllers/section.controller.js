import { ApiResponse } from '../utils/ApiResponse.util.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import * as sectionService from '../services/section.service.js'

const handleCreateSection = asyncHandler(async (req, res) => {
    try {
        const { title, order } = req.body
        const { courseId } = req.params
        const userId = req.user._id

        const createdSection = await sectionService.createSection(courseId, userId, {
            title,
            order
        })

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
        const { title } = req.body
        const { courseId, sectionId } = req.params
        const userId = req.user._id

        const updatedSection = await sectionService.updateSection(courseId, sectionId, userId, {
            title
        })

        res
            .status(200)
            .json(new ApiResponse(200, updatedSection, "Section updated successfully"))
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
        const userId = req.user._id

        const deletedSection = await sectionService.deleteSection(courseId, sectionId, userId)

        res
            .status(200)
            .json(new ApiResponse(200, deletedSection, "Section deleted successfully"))
    } catch (error) {
        res
            .status(400)
            .json(
                new ApiResponse(400, null, `ERROR : Deleting Section : ${error.message}`)
            )
    }
})

export {
    handleCreateSection,
    handleDeleteSection,
    handleUpdateSectionDetails
}