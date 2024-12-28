import { isValidObjectId } from 'mongoose'
import { Review } from '../models/review.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.util.js'
import { ApiResponse } from '../utils/ApiResponse.util.js'


const handleAddReview = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params

        if (!isValidObjectId(courseId)) {
            throw new ApiError(400, "Invalid Course Id")
        }

        const { rating, review } = req.body

        if (!rating || !review) {
            throw new ApiError(400, "Please provide rating and review both")
        }

        const createdReview = await Review.create({
            course: courseId,
            user: req.user._id,
            rating,
            review
        })

        if (!createdReview) {
            throw new ApiError(400, "Failed to create review")
        }

        res
            .status(200)
            .json(
                new ApiResponse(200, createdReview, "Review created successfully", createdReview)
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

        const { courseId } = req.params
        const { reviewId } = req.params
        const { rating, review } = req.body


        if (!(isValidObjectId(courseId) || isValidObjectId(reviewId))) {
            throw new ApiError(400, "Invalid Course Id")
        }

        //Checking that review exist in the database
        const fetchedReview = await Review.findById(reviewId)
        if (!fetchedReview) {
            throw new ApiError(404, "Review not found")
        }

        //Checking is the user is authorized to update the review 
        if (fetchedReview.user.toString() !== req.user._id) {
            throw new ApiError(403, "You are not authorized to update this review")
        }

        if (!rating || !review) {
            throw new ApiError(400, "Please provide rating and review both")
        }

        //updating the review
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                $set: {
                    rating,
                    review
                }
            },
            {
                new: true
            }
        )
        if (!updatedReview) {
            throw new ApiError(404, "Review not found")
        }
        res
            .status(200)
            .json(
                new ApiResponse(200, updatedReview, "Review updated successfully", updatedReview)
            )


    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(
                new ApiResponse(error.statusCode || 400, null, `ERROR : Updating Review :${error.message}`))

    }
})


const handleDeleteReview = asyncHandler(async (req, res) => {
    try {

        const { courseId, reviewId } = req.params

        if (!(isValidObjectId(courseId) || isValidObjectId(reviewId))) {
            throw new ApiError(400, "Invalid Course or Review Id")
        }

        //Finding review in the Database
        const fetchedReview = Review.findById(reviewId)
        if (!fetchedReview) {
            throw new ApiError(404, "Review not found")
        }


        //Checking if the user is authorized to delete the review or not
        if (!(fetchedReview.user.toString() === req.user._id.toString)) {
            throw new ApiError(403, "You are not authorized to delete this review")
        }

        //Deleting the review from the database
        const deletedReview = Review.findByIdAndDelete(reviewId)

        if (!deletedReview) {
            throw new ApiError(404, "Review not found")
        }
        res
            .status(200)
            .json(
                new ApiResponse(200, deletedReview, "Review deleted successfully", deletedReview)
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
        if (!isValidObjectId(courseId)) {
            throw new ApiError(400, "Invalid Course Id")
        }
        //Finding reviews in the Database
        const fetchedReviews = Review.find({ course: courseId }).populate(
            {
                path: 'user',
                select: 'name email',
            }
        )   
        if (!fetchedReviews) {
            throw new ApiError(404, "No reviews found")
        }
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
    handleAddReview , 
    handleUpdateReview , 
    handleDeleteReview , 
    getAllReviews
}