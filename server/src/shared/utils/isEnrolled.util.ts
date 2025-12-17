import { isValidObjectId } from "mongoose";
import { Types } from "mongoose";

export const isEnrolled = async (
  courseId: string | Types.ObjectId,
  userId: string | Types.ObjectId
): Promise<boolean> => {
  try {
    if (!isValidObjectId(courseId) || !isValidObjectId(userId)) {
      throw new Error('Invalid Course or User Id');
    }

    // Dynamic import to avoid circular dependency
    const { Enrollment } = await import('@/modules/enrollment/enrollment.model');
    const enrollment = await Enrollment.findOne({
      course: courseId,
      user: userId
    });

    console.log("Enrollment object:", enrollment);
    return enrollment ? true : false;
  } catch (error: any) {
    console.error("Error checking enrollment:", error);
    throw error;
  }
};

