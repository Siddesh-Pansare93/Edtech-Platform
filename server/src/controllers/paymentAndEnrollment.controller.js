//User will do the payment .....
//System.out.println("Payment Done");
//if payment is successfull save the payment details in db 
//after that create enrollment object 

import { Course } from '../models/course.model.js'
import { ApiError } from '../utils/ApiError.util.js';
import { ApiResponse } from '../utils/ApiResponse.util.js';
import { isEnrolled } from '../utils/isEnrolled.util.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import Stripe from 'stripe'
import { Enrollment } from '../models/enrollment.model.js';


const stripe = new Stripe(process.env.STRIPE_API_KEY)


const purchaseCourse = asyncHandler(async (req, res) => {
    try {
        const { courses } = req.body;
        const user = req.user;

        if (!courses || courses.length === 0) {
            throw new ApiError(400, "Please provide course IDs");
        }

        const courseDetails = await Course.find({ _id: { $in: courses } });

        if (courseDetails.length !== courses.length) {
            throw new ApiError(404, "Some courses not found");
        }

        let totalAmount = 0;
        const line_items = [];
        const enrolledCourseIds = [];

        for (const course of courseDetails) {
            const isAlreadyEnrolled = await isEnrolled(course._id, user._id);

            if (isAlreadyEnrolled) {
                return res.status(400).json(
                    new ApiResponse(400, null, `Already enrolled in course: ${course.title}`)
                );
            }

            if (!course.paid) {
                await Enrollment.create({ user: user._id, course: course._id });
                enrolledCourseIds.push(course._id); 
            } else {
                line_items.push({
                    price_data: {
                        currency: 'INR',
                        unit_amount: course.price * 100,
                        product_data: { name: course.title },
                    },
                    quantity: 1,
                });
                totalAmount += course.price;
                enrolledCourseIds.push(course._id);
            }
        }

        if (line_items.length > 0) {
            const courseIdsString = enrolledCourseIds.join(","); 
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/verify?success=true&courseIds=${courseIdsString}`,
                cancel_url: `${process.env.CLIENT_URL}/verify?success=false`,
            });

            return res.status(200).json(new ApiResponse(200, session.url, "Payment Initiated"));
        }

        res.status(200).json(new ApiResponse(200, null, "Free courses enrolled successfully"));

    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, `Error: ${error.message}`));
    }
});




const verifyAndEnroll = asyncHandler(async (req, res) => {
    try {
        const { success, courseIds } = req.body
        console.log(req.body)
        console.log(success)
        console.log(courseIds)
        console.log(req.user)

        if (success) {
            if (!courseIds?.length) {
                throw new ApiError(400, "No course IDs provided")
            }

            for (let id of courseIds) {
                const enrollmentObject = await Enrollment.create({
                    user: req.user._id,
                    course: id,
                })
                console.log(enrollmentObject)
            }

            res
                .status(200)
                .json(new ApiResponse(200, null, "Courses enrolled successfully"))
        } else {
            res.json("Payment Failed ...Please try Again")
        }

    } catch (error) {
        res
            .status(error.statusCode || 400)
            .json(new ApiResponse(error.statusCode, null, `ERROR : ${error.message}`))

    }
})
export {
    purchaseCourse,
    verifyAndEnroll
}