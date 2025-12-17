import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as sectionService from './section.service';

export const handleCreateSection = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { title, order } = req.body;
    const { courseId } = req.params;
    const userId = req.user!._id.toString();

    const createdSection = await sectionService.createSection(courseId, userId, {
      title,
      order,
      courseId
    });

    res.status(200).json(
      new ApiResponse(200, createdSection, "Section created successfully")
    );
  }
);

export const handleUpdateSectionDetails = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { title } = req.body;
    const { courseId, sectionId } = req.params;
    const userId = req.user!._id.toString();

    const updatedSection = await sectionService.updateSection(courseId, sectionId, userId, {
      title
    });

    res.status(200).json(
      new ApiResponse(200, updatedSection, "Section updated successfully")
    );
  }
);

export const handleDeleteSection = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    const { sectionId, courseId } = req.params;
    const userId = req.user!._id.toString();

    const deletedSection = await sectionService.deleteSection(courseId, sectionId, userId);

    res.status(200).json(
      new ApiResponse(200, deletedSection, "Section deleted successfully")
    );
  }
);
