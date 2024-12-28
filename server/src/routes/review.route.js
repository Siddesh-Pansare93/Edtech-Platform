import express from 'express'
import {
    getAllReviews,
    handleAddReview,
    handleDeleteReview,
    handleUpdateReview
} from '../controllers/review.controller.js'
import verifyJwt  from '../middlewares/auth.middleware.js'


const router = express.Router()


router.use(verifyJwt)

router.route("/:courseId")
    .get(getAllReviews)
    .post(handleAddReview)

router.route("/:courseId/:reviewId")
    .patch(handleUpdateReview)
    .delete(handleDeleteReview)



export default router;
