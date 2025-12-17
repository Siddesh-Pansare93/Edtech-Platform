import { User } from './user.types';
import { Section } from './section.types';

export interface Course {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  preRequisites: string[];
  curriculum: string[];
  instructor: string | User;
  paid: boolean;
  price?: number;
  validity?: string;
  sections: string[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseWithContent extends Omit<Course, 'sections'> {
  sections: Section[];
}
