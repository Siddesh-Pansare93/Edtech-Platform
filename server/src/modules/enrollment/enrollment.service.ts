import { ApiError } from '@/shared/utils/ApiError.util';
import { Enrollment } from './enrollment.model';
import { VerifyEnrollmentDTO } from './enrollment.types';

export const verifyAndEnroll = async (userId: string, verificationData: VerifyEnrollmentDTO) => {
  if (verificationData.success) {
    if (!verificationData.courseIds?.length) {
      throw new ApiError(400, "No course IDs provided");
    }

    for (let id of verificationData.courseIds) {
      await Enrollment.create({
        user: userId,
        course: id,
      });
    }

    return { success: true, message: "Courses enrolled successfully" };
  } else {
    return { success: false, message: "Payment Failed ...Please try Again" };
  }
};

export const checkEnrollmentStatus = async (courseId: string, userId: string): Promise<boolean> => {
  const { isEnrolled } = await import('@/shared/utils/isEnrolled.util');
  const enrollment = await isEnrolled(courseId, userId);
  return enrollment;
};
