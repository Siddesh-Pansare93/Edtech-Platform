import { UserPublicData } from '@/modules/users/user.types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: UserPublicData;
  tokens: AuthTokens;
}

export interface RegisterDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'student' | 'instructor';
  skillLevel: string;
  avatarLocalPath?: string;
}

export interface LoginDTO {
  username?: string;
  email?: string;
  password: string;
}
