import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as paymentService from './payment.service';
import { PurchaseCourseInput } from './payment.validation';

export const purchaseCourse = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const data = req.body as PurchaseCourseInput;
    const userId = req.user!._id.toString();

    const result = await paymentService.purchaseCourses(userId, data.courses);

    if (result.sessionUrl) {
      return res.status(200).json(
        new ApiResponse(200, result.sessionUrl, result.message)
      );
    }

    res.status(200).json(
      new ApiResponse(200, null, result.message)
    );
  }
);
