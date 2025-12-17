import { apiClient } from './apiClient';
import { updateProfileSchema, changePasswordSchema, UpdateProfileFormData, ChangePasswordFormData } from '../validation/user.schema';
import { User } from '../types/user.types';
import { Course } from '../types/course.types';

export const usersService = {
  updateProfile: async (data: UpdateProfileFormData): Promise<User> => {
    // Validate before sending
    const validated = updateProfileSchema.parse(data);
    
    const response = await apiClient.patch<User>('/api/v1/users/update-profile', validated);
    return response.data;
  },

  changePassword: async (data: ChangePasswordFormData): Promise<void> => {
    // Validate before sending
    const validated = changePasswordSchema.parse(data);
    
    // Remove confirmPassword before sending
    const { confirmPassword, ...passwordData } = validated;
    
    await apiClient.patch('/api/v1/users/change-password', passwordData);
  },

  getEnrolledCourses: async (): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>('/api/v1/users/enrolled-courses');
    return response.data;
  },

  getCreatedCourses: async (): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>('/api/v1/users/your-courses');
    return response.data;
  },
};
