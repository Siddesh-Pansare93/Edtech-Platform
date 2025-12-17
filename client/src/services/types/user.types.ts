export type UserRole = 'student' | 'instructor';

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  skillLevel: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
