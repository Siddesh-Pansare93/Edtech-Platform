import { Course } from '../models/course.model.js'
import { ApiError } from '../utils/ApiError.util.js'
import { isEnrolled } from '../utils/isEnrolled.util.js'
import { Enrollment } from '../models/enrollment.model.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_KEY)

/**
 * Process course purchase - handles both free and paid courses
 * @param {string} userId - User ID
 * @param {Array<string>} courseIds - Array of course IDs to purchase
 * @returns {Promise<{sessionUrl: string|null, message: string}>}
 */
const purchaseCourses = async (userId, courseIds) => {
    if (!courseIds || courseIds.length === 0) {
        throw new ApiError(400, "Please provide course IDs")
    }

    // Finding the course Details for the courseIds provided by user
    const courseDetails = await Course.find({ _id: { $in: courseIds } })

    if (courseDetails.length !== courseIds.length) {
        throw new ApiError(404, "Some courses not found")
    }

    let totalAmount = 0
    const line_items = []
    const enrolledCourseIds = [] // maintaining this so courseIds can be passed to the frontend

    for (const course of courseDetails) {
        // Checking if the user is already enrolled in course
        const isAlreadyEnrolled = await isEnrolled(course._id, userId)

        if (isAlreadyEnrolled) {
            throw new ApiError(404, `You are Already Enrolled in the Course : ${course.title} `)
        }

        // Checking Course is Paid or not
        if (!course.paid) {
            // Free hai to sidha enrollment create karenge
            await Enrollment.create({ user: userId, course: course._id })
            enrolledCourseIds.push(course._id)
        } else {
            // Paid hai to stripe se payment karenge
            line_items.push({
                price_data: {
                    currency: 'INR',
                    unit_amount: course.price * 100,
                    product_data: { name: course.title },
                },
                quantity: 1,
            })
            totalAmount += course.price
            enrolledCourseIds.push(course._id)
        }
    }

    if (line_items.length > 0) {
        const courseIdsString = enrolledCourseIds.join(",")
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/verify?success=true&courseIds=${courseIdsString}`,
            cancel_url: `${process.env.CLIENT_URL}/verify?success=false`,
        })

        return { sessionUrl: session.url, message: "Payment Initiated" }
    }

    return { sessionUrl: null, message: "Free courses enrolled successfully" }
}

/**
 * Verify payment and create enrollment
 * @param {string} userId - User ID
 * @param {Object} verificationData - Verification data
 * @param {boolean} verificationData.success - Payment success status
 * @param {Array<string>} [verificationData.courseIds] - Course IDs to enroll
 * @returns {Promise<{success: boolean, message: string}>}
 */
const verifyAndEnroll = async (userId, { success, courseIds }) => {
    if (success) {
        if (!courseIds?.length) {
            throw new ApiError(400, "No course IDs provided")
        }

        for (let id of courseIds) {
            const enrollmentObject = await Enrollment.create({
                user: userId,
                course: id,
            })
            console.log(enrollmentObject)
        }

        return { success: true, message: "Courses enrolled successfully" }
    } else {
        return { success: false, message: "Payment Failed ...Please try Again" }
    }
}

/**
 * Check if a user is enrolled in a course
 * @param {string} courseId - Course ID
 * @param {string} userId - User ID
 * @returns {Promise<boolean>}
 */
const checkEnrollmentStatus = async (courseId, userId) => {
    const enrollment = await isEnrolled(courseId, userId)
    return enrollment ? true : false
}

export {
    purchaseCourses,
    verifyAndEnroll,
    checkEnrollmentStatus
}
