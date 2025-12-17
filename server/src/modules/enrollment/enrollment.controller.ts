import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as enrollmentService from './enrollment.service';
import { VerifyEnrollmentInput } from './enrollment.validation';

export const verifyAndEnroll = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const data = req.body as VerifyEnrollmentInput;
    const userId = req.user!._id.toString();

    const result = await enrollmentService.verifyAndEnroll(userId, data);

    if (result.success) {
      res.status(200).json(
        new ApiResponse(200, null, result.message)
      );
    } else {
      res.status(400).json(
        new ApiResponse(400, null, result.message)
      );
    }
  }
);

export const checkEnrollment = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId } = req.params;
    const userId = req.user!._id.toString();

    const isEnrolled = await enrollmentService.checkEnrollmentStatus(courseId, userId);

    res.json({ enrolled: isEnrolled });
  }
);
