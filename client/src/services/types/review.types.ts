import { User } from './user.types';

export interface Review {
  _id: string;
  user: string | User;
  course: string;
  rating: number;
  review: string;
  createdAt?: string;
  updatedAt?: string;
}
