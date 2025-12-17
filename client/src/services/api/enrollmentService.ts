import { apiClient } from './apiClient';
import { verifyEnrollmentSchema, VerifyEnrollmentFormData } from '../validation/enrollment.schema';

export const enrollmentService = {
  verifyAndEnroll: async (data: VerifyEnrollmentFormData): Promise<any> => {
    // Validate before sending
    const validated = verifyEnrollmentSchema.parse(data);
    
    const response = await apiClient.post('/api/v1/enrollment/verify-payment', validated);
    return response.data;
  },

  checkEnrollment: async (courseId: string): Promise<{ enrolled: boolean }> => {
    const response = await apiClient.post<{ enrolled: boolean }>(`/api/v1/enrollment/check-enrollment/${courseId}`);
    return response.data;
  },
};
