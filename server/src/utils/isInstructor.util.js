import { asyncHandler } from "./asyncHandler.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.util.js";

const isInstructorOfCourse = async (courseId,userId) => {
    try {
        const course = await Course.findById(courseId);
        console.log(course.instructor  , userId)
        const instructor = await User.findById(userId);
        if (course && instructor) {
            if (course.instructor.equals(userId)) {
                return 1;
            }else { 
                return 0;
            }
        }else{
            return -1
        }
    } catch (error) {
        throw new ApiError(500, `Internal Server Error :${error.message}`);
    }
}


export {
    isInstructorOfCourse
}