import { Types } from "mongoose";
import { ApiError } from './ApiError.util';

export const isInstructorOfCourse = async (
  courseId: string | Types.ObjectId,
  userId: string | Types.ObjectId
): Promise<number> => {
  try {
    // Dynamic import to avoid circular dependency
    const { Course } = await import('@/modules/courses/course.model');
    const { User } = await import('@/modules/users/user.model');

    const course = await Course.findById(courseId);
    console.log(course?.instructor, userId);
    const instructor = await User.findById(userId);

    if (course && instructor) {
      if (course.instructor.toString() === userId.toString()) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return -1;
    }
  } catch (error: any) {
    throw new ApiError(500, `Internal Server Error: ${error.message}`);
  }
};

