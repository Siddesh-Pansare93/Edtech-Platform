import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/shared/utils/ApiError.util';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';

const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw new ApiError(400, "Access Token not Present : Please Login to get Token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      _id: string;
      username: string;
      email: string;
      role: string;
    };

    console.log(decodedToken);

    if (!decodedToken) {
      throw new ApiError(400, "Invalid Access Token");
    }

    // Dynamic import to avoid circular dependency
    const { User } = await import('@/modules/users/user.model');
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(400, "Invalid Token  : Not able to find user with token");
    }

    req.user = user;
    next();
  } catch (error: any) {
    res
      .status(400)
      .json(
        new ApiResponse(400, null, `Unauthorized : ${error.message}`)
      );
  }
};

export default verifyJwt;

