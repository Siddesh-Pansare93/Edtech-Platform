import { Request, Response } from 'express';
import { asyncHandler } from '@/shared/utils/asyncHandler';
import { ApiResponse } from '@/shared/utils/ApiResponse.util';
import * as authService from './auth.service';
import { RegisterInput, LoginInput } from './auth.validation';

export const handleUserRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body as RegisterInput;
    const avatarLocalPath = req.file?.path;

    const createdUser = await authService.registerUser({
      ...data,
      avatarLocalPath
    });

    res.status(200).json(
      new ApiResponse(200, createdUser, "User Registered Successfully")
    );
  }
);

export const handleUserLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const credentials = req.body as LoginInput;

    const { user, accessToken, refreshToken } = await authService.loginUser(
      credentials
    );

    const options = {
      httpOnly: true,
      secure: true
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "User Logged In Successfully"
        )
      );
  }
);

export const handleUserLogout = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json(
        new ApiResponse(401, null, "User not authenticated")
      );
    }

    await authService.logoutUser(req.user!._id.toString());

    const options = {
      httpOnly: true,
      secure: true
    };

    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, null, "User Logged Out Successfully"));
  }
);
