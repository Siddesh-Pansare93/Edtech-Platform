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


const purchaseCourse = asyncHandler(async (req, res) => {
    try {
        const { courses } = req.body;
        console.log(courses)
        const user = req.user;

        if (courses.length === 0) {
            throw new ApiError(400, "Please provide course Id")
        }

        let totalAmount = 0;

        for (const courseId of courses) {
            console.log(courseId)
            const course = await Course.findById(courseId);

            if (!course) {
                return res.status(404).json({ msg: "Course not found" });
            }


            const isALreadyEnrolledInCourse = await isEnrolled(courseId, req.user._id)
            console.log(isALreadyEnrolledInCourse)
            if (isALreadyEnrolledInCourse) {
                return res.status(400).json(
                    new ApiResponse(
                    400 , null ,  `You are already enrolled in  course : ${course.title} `
                ))
            }

            res.send(isALreadyEnrolledInCourse)
            //check if user has already paid for this course
            
           
            //check if course is paid or not
            //if payment is successfull save the payment details in db
            //after that create enrollment object
            // const payment = await Payment.create({

        }
        } catch (error) {
            res
            .status(400)
            .json(new ApiResponse(400, null, `ERROR : ${error.message}`))
        }
    })



    export {
        purchaseCourse
    }