import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as courseProgressService from './progress.service';

export const updateCourseProgress = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId, lessonId } = req.params;
    const userId = req.user!._id.toString();

    const result = await courseProgressService.updateProgress(courseId, lessonId, userId);

    return res.status(200).json(
      new ApiResponse(200, result.progress, result.message)
    );
  }
);

export const getCourseProgress = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId } = req.params;
    const userId = req.user!._id.toString();

    const progress = await courseProgressService.getProgress(courseId, userId);

    return res.status(200).json(
      new ApiResponse(200, { progress }, "Course Progress fetched Successfully")
    );
  }
);
