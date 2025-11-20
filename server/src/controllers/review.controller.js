import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'
import * as reviewService from '../services/review.service.js'

const handleAddReview = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params
        const { rating, review } = req.body
        const userId = req.user._id

        const createdReview = await reviewService.addReview(courseId, userId, {
            rating,
            review
        })

        res
            .status(200)
            .json(
                new ApiResponse(200, createdReview, "Review created successfully")
            )
    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Creating Review :${error.message}`)
            )
    }
})

const handleUpdateReview = asyncHandler(async (req, res) => {
    try {
        const { courseId, reviewId } = req.params
        const { rating, review } = req.body
        const userId = req.user._id

        const updatedReview = await reviewService.updateReview(courseId, reviewId, userId, {
            rating,
            review
        })

        res
            .status(200)
            .json(
                new ApiResponse(200, updatedReview, "Review updated successfully")
            )
    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Updating Review :${error.message}`)
            )
    }
})

const handleDeleteReview = asyncHandler(async (req, res) => {
    try {
        const { courseId, reviewId } = req.params
        const userId = req.user._id

        const deletedReview = await reviewService.deleteReview(courseId, reviewId, userId)

        res
            .status(200)
            .json(
                new ApiResponse(200, deletedReview, "Review deleted successfully")
            )
    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Deleting Review :${error.message}`)
            )
    }
})

const getAllReviews = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params

        const fetchedReviews = await reviewService.getAllReviews(courseId)

        res
            .status(200)
            .json(new ApiResponse(200, fetchedReviews, "Reviews fetched successfully"))
    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Getting All Reviews :${error.message}`)
            )
    }
})

export {
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
    getAllReviews
}