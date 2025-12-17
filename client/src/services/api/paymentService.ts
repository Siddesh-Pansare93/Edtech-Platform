import { apiClient } from './apiClient';
import { purchaseSchema, PurchaseFormData } from '../validation/payment.schema';
import { PaymentSession } from '../types/payment.types';

export const paymentService = {
  purchaseCourses: async (data: PurchaseFormData): Promise<PaymentSession> => {
    // Validate before sending
    const validated = purchaseSchema.parse(data);
    
    // Transform to match backend expectation
    const requestData = { courseIds: validated.courseIds };
    
    const response = await apiClient.post<PaymentSession>('/api/v1/payment/purchase', requestData);
    return response.data;
  },
};
