import { Course } from '@/services/types/course.types';
import { User } from '@/services/types/user.types';

export interface AuthState {
  userData: User | null;
  status: boolean;
}

export interface CourseState {
  enrolledCourses: Course[] | null;
  createdCourses: Course[] | null;
}

export interface RootState {
  auth: AuthState;
  course: CourseState;
}
