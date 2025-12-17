import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.user?.role;

  // Note: Admin role is not currently in the User model enum ('student' | 'instructor')
  // This middleware is kept for future use when admin role is added
  // For now, this will always return 403 since admin is not a valid role
  const isAdminRole = (userRole as string) === "admin";
  
  if (isAdminRole) {
    return next();
  }

  return res.status(403).json(new ApiResponse(403, null, "You are not an Admin"));
};

export const isInstructorOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.user?.role;

  console.log(userRole);
  if (userRole === "instructor") {
    return next();
  }

  // Note: Admin check kept for future use
  const isAdminRole = (userRole as string) === "admin";
  if (isAdminRole) {
    return next();
  }

  return res.status(403).json(new ApiResponse(403, null, "You are not an instructor or Admin"));
};

