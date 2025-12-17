import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as courseService from './course.service';

export const handleCourseCreation = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { title, description, paid, price, validity, curriculum, preRequisites } = req.body;
    const instructor = req.user!._id.toString();
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const thumbnailLocalPath = files?.thumbnail?.[0]?.path;

    const createdCourse = await courseService.createCourse({
      title,
      description,
      paid,
      price,
      validity,
      curriculum,
      preRequisites,
      instructor,
      thumbnailLocalPath
    });

    res.status(200).json(
      new ApiResponse(200, createdCourse, "Course created Successfully")
    );
  }
);

export const handleCourseDetailsUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId } = req.params;
    const userId = req.user!._id.toString();
    const { title, description, paid, price, validity, curriculum, preRequisites } = req.body;

    const updatedCourse = await courseService.updateCourse(courseId, userId, {
      title,
      description,
      paid,
      price,
      validity,
      curriculum,
      preRequisites
    });

    res.status(200).json(
      new ApiResponse(200, updatedCourse, "Course details updated successfully")
    );
  }
);

export const handleCourseDeletion = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId } = req.params;
    const userId = req.user!._id.toString();

    await courseService.deleteCourse(courseId, userId);

    res.status(200).json(
      new ApiResponse(200, null, "Course Deleted Successfully")
    );
  }
);

export const togglePublishStatus = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId } = req.params;
    const userId = req.user!._id.toString();

    const publishedCourse = await courseService.togglePublishStatus(courseId, userId);

    res.status(200).json(
      new ApiResponse(200, publishedCourse, "Course Published Successfully")
    );
  }
);

export const getAllCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const courses = await courseService.getAllPublishedCourses();

    res.status(200).json(
      new ApiResponse(200, courses, "Successfully fetched course Details")
    );
  }
);

export const getCourseDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;

    const course = await courseService.getCourseDetails(courseId);

    res.status(200).json(
      new ApiResponse(200, course, "Course Details Fetched Successfully")
    );
  }
);

export const getCourseContent = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { courseId } = req.params;
    const userId = req.user!._id.toString();

    const courseContent = await courseService.getCourseContent(courseId, userId);

    res.status(200).json(
      new ApiResponse(200, courseContent, "Course Content Fetched Successfully")
    );
  }
);
