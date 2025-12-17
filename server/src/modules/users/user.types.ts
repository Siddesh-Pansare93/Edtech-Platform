import { UserDocument } from './user.model';

export type UserRole = 'student' | 'instructor';

export interface UserPublicData {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  skillLevel: string;
  avatar?: string;
}

export interface UpdateProfileDTO {
  name?: string;
  username?: string;
  email?: string;
  skillLevel?: string;
  role?: UserRole;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export { UserDocument };

