import { apiClient } from './apiClient';
import { Progress, ProgressStats } from '../types/progress.types';

export const progressService = {
  updateProgress: async (courseId: string, lessonId: string): Promise<Progress> => {
    const response = await apiClient.get<Progress>(`/api/v1/progress/${courseId}/${lessonId}`);
    return response.data;
  },

  getCourseProgress: async (courseId: string): Promise<ProgressStats> => {
    const response = await apiClient.get<ProgressStats>(`/api/v1/progress/${courseId}`);
    return response.data;
  },
};
