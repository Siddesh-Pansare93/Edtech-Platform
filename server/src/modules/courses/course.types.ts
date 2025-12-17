import { CourseDocument } from './course.model';

export interface CreateCourseDTO {
  title: string;
  description: string;
  paid: boolean;
  price?: number;
  validity: string;
  curriculum: string[];
  preRequisites?: string[];
  instructor: string;
  thumbnailLocalPath?: string;
}

export interface UpdateCourseDTO {
  title: string;
  description: string;
  paid: boolean;
  price: number;
  validity: string;
  curriculum: string[];
  preRequisites?: string[];
}

export interface CourseFilters {
  isPublished?: boolean;
  instructor?: string;
}

export { CourseDocument };
