import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as lessonService from './lesson.service';

export const handleAddLesson = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId, sectionId } = req.params;
    const { title, order } = req.body;
    const videoLocalPath = req.file?.path;
    const userId = req.user!._id.toString();

    const createdLesson = await lessonService.addLesson(courseId, sectionId, userId, {
      title,
      order,
      videoLocalPath
    });

    res.status(201).json(
      new ApiResponse(200, createdLesson, "Lesson Created Successfully")
    );
  }
);

export const handleUpdateLesson = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId, lessonId } = req.params;
    const { title } = req.body;
    const videoLocalPath = req.file?.path;
    const userId = req.user!._id.toString();

    const updatedLesson = await lessonService.updateLesson(courseId, lessonId, userId, {
      title,
      videoLocalPath
    });

    res.status(200).json(
      new ApiResponse(200, updatedLesson, "Lesson Updated Successfully")
    );
  }
);

export const handleDeleteLesson = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId, sectionId, lessonId } = req.params;
    const userId = req.user!._id.toString();

    const deletedLesson = await lessonService.deleteLesson(courseId, sectionId, lessonId, userId);

    res.status(200).json(
      new ApiResponse(200, deletedLesson, "Lesson Deleted Successfully")
    );
  }
);
