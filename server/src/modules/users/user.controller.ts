import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as userService from './user.service';
import { UpdateProfileInput, ChangePasswordInput } from './user.validation';

export const handleUpdateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const data = req.body as UpdateProfileInput;
    const updatedUser = await userService.updateUserProfile(req.user!._id.toString(), data);

    res.status(200).json(
      new ApiResponse(200, updatedUser, "User Updated Successfully")
    );
  }
);

export const handleChangePassword = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const data = req.body as ChangePasswordInput;
    await userService.changePassword(req.user!._id.toString(), data);

    res.status(200).json(
      new ApiResponse(200, null, "Password Updated Successfully")
    );
  }
);

export const getEnrolledCourses = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const enrolledCourses = await userService.getEnrolledCourses(req.user!._id.toString());

    if (!enrolledCourses.length) {
      return res.status(200).json(
        new ApiResponse(200, [], "No enrolled courses found")
      );
    }

    res.status(200).json(
      new ApiResponse(200, enrolledCourses, "Enrolled Courses Retrieved Successfully")
    );
  }
);

export const getYourCreatedCourses = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const courseStatics = await userService.getCreatedCourses(req.user!._id.toString());

    res.status(200).json(
      new ApiResponse(200, courseStatics, "Created Courses Retrieved Successfully")
    );
  }
);
