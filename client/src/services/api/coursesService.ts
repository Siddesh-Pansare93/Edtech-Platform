import { apiClient } from './apiClient';
import { createCourseSchema, updateCourseSchema, CreateCourseFormData, UpdateCourseFormData } from '../validation/course.schema';
import { Course, CourseWithContent } from '../types/course.types';

export const coursesService = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>('/api/v1/courses');
    return response.data;
  },

  getCourseDetails: async (courseId: string): Promise<Course> => {
    const response = await apiClient.get<Course>(`/api/v1/courses/details/${courseId}`);
    return response.data;
  },

  getCourseContent: async (courseId: string): Promise<CourseWithContent> => {
    const response = await apiClient.get<CourseWithContent>(`/api/v1/courses/content/${courseId}`);
    return response.data;
  },

  createCourse: async (data: CreateCourseFormData): Promise<Course> => {
    // Validate before sending
    const validated = createCourseSchema.parse(data);
    
    const formData = new FormData();
    Object.entries(validated).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, String(item)));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    const response = await apiClient.postFormData<Course>('/api/v1/courses/create', formData);
    return response.data;
  },

  updateCourse: async (courseId: string, data: UpdateCourseFormData): Promise<Course> => {
    // Validate before sending
    const validated = updateCourseSchema.parse(data);
    
    const response = await apiClient.patch<Course>(`/api/v1/courses/${courseId}`, validated);
    return response.data;
  },

  deleteCourse: async (courseId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/courses/${courseId}`);
  },

  togglePublishStatus: async (courseId: string): Promise<Course> => {
    const response = await apiClient.patch<Course>(`/api/v1/courses/toggle/${courseId}`);
    return response.data;
  },
};
