import { ApiError } from '@/shared/utils/ApiError.util';
import { uploadOnCloudinary } from '@/shared/utils/Cloudinary';
import logger from '../../logger';
import { User } from '@/modules/users/user.model';
import { RegisterDTO, LoginDTO, AuthTokens } from './auth.types';

/**
 * Generate Access and Refresh Token for a user
 */
export const generateAccessAndRefreshToken = async (userId: string): Promise<AuthTokens> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

/**
 * Register a new user
 */
export const registerUser = async (userData: RegisterDTO) => {
  console.log("request received for registering user");

  const { name, username, email, password, role, skillLevel, avatarLocalPath } = userData;

  if ([name, username, email, password, role, skillLevel].some(field => (!field || field.toString().trim() === ""))) {
    throw new ApiError(400, "All Fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  console.log(existingUser);

  if (existingUser) {
    throw new ApiError(400, "User with Username or Email already exists");
  }

  logger.info(avatarLocalPath || '');
  let avatarDetails;

  if (avatarLocalPath) {
    avatarDetails = await uploadOnCloudinary(avatarLocalPath);
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
    skillLevel,
    role,
    avatar: avatarDetails?.url
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(400, "Failed to create User in Database");
  }

  return createdUser;
};

/**
 * Login a user
 */
export const loginUser = async (credentials: LoginDTO) => {
  const { username, email, password } = credentials;

  // Check if at least one identifier is provided (username OR email)
  if ((!username && !email) || !password) {
    throw new ApiError(400, "Please provide username/email and password");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User Not Found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id.toString());

  if (!accessToken || !refreshToken) {
    throw new ApiError(400, "Failed to generate Access and Refresh Token");
  }

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return { user: loggedInUser!, accessToken, refreshToken };
};

/**
 * Logout a user by clearing their refresh token
 */
export const logoutUser = async (userId: string): Promise<void> => {
  await User.findByIdAndUpdate(
    userId,
    {
      $set: { "refreshToken": "" }
    },
    {
      new: true
    }
  );
};
