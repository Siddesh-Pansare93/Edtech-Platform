import { isValidObjectId } from 'mongoose'
import { Review } from '../models/review.model.js'
import { ApiError } from '../utils/ApiError.util.js'

/**
 * Add a new review for a course
 * @param {string} courseId - Course ID
 * @param {string} userId - User ID
 * @param {Object} reviewData - Review data
 * @param {number} reviewData.rating - Rating (1-5)
 * @param {string} reviewData.review - Review text
 * @returns {Promise<Object>} Created review object
 */
const addReview = async (courseId, userId, { rating, review }) => {
    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid Course Id")
    }

    if (!rating || !review) {
        throw new ApiError(400, "Please provide rating and review both")
    }

    const createdReview = await Review.create({
        course: courseId,
        user: userId,
        rating,
        review
    })

    if (!createdReview) {
        throw new ApiError(400, "Failed to create review")
    }

    return createdReview
}

/**
 * Update an existing review
 * @param {string} courseId - Course ID
 * @param {string} reviewId - Review ID
 * @param {string} userId - User ID
 * @param {Object} updateData - Update data
 * @param {number} [updateData.rating] - New rating
 * @param {string} [updateData.review] - New review text
 * @returns {Promise<Object>} Updated review object
 */
const updateReview = async (courseId, reviewId, userId, { rating, review }) => {
    if (!(isValidObjectId(courseId) || isValidObjectId(reviewId))) {
        throw new ApiError(400, "Invalid Course Id")
    }

    // Checking that review exists in the database
    const fetchedReview = await Review.findById(reviewId)
    if (!fetchedReview) {
        throw new ApiError(404, "Review not found")
    }

    // Checking if the user is authorized to update the review
    if (fetchedReview.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this review")
    }

    if (!rating || !review) {
        throw new ApiError(400, "Please provide rating and review both")
    }

    // Updating the review
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

    return updatedReview
}

/**
 * Delete a review
 * @param {string} courseId - Course ID
 * @param {string} reviewId - Review ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Deleted review object
 */
const deleteReview = async (courseId, reviewId, userId) => {
    if (!(isValidObjectId(courseId) || isValidObjectId(reviewId))) {
        throw new ApiError(400, "Invalid Course or Review Id")
    }

    // Finding review in the Database
    const fetchedReview = await Review.findById(reviewId)
    if (!fetchedReview) {
        throw new ApiError(404, "Review not found")
    }

    // Checking if the user is authorized to delete the review or not
    if (fetchedReview.user.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this review")
    }

    // Deleting the review from the database
    const deletedReview = await Review.findByIdAndDelete(reviewId)

    if (!deletedReview) {
        throw new ApiError(404, "Review not found")
    }

    return deletedReview
}

/**
 * Get all reviews for a course
 * @param {string} courseId - Course ID
 * @returns {Promise<Array>} Array of reviews
 */
const getAllReviews = async (courseId) => {
    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid Course Id")
    }

    // Finding reviews in the Database
    const fetchedReviews = await Review.find({ course: courseId }).populate(
        {
            path: 'user',
            select: 'name email',
        }
    )

    if (!fetchedReviews) {
        throw new ApiError(404, "No reviews found")
    }

    return fetchedReviews
}

export {
    addReview,
    updateReview,
    deleteReview,
    getAllReviews
}
