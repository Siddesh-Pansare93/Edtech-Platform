import { apiClient } from './apiClient';
import { loginSchema, registerSchema, LoginFormData, RegisterFormData } from '../validation/auth.schema';
import { AuthResponse } from '../types/auth.types';

export const authService = {
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    // Validate before sending
    const validated = registerSchema.parse(data);
    
    const formData = new FormData();
    Object.entries(validated).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    const response = await apiClient.postFormData<AuthResponse>('/api/v1/auth/register', formData);
    return response.data;
  },

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    // Validate before sending
    const validated = loginSchema.parse(data);
    
    // Clean up empty strings
    const cleanData: any = { password: validated.password };
    if (validated.email) cleanData.email = validated.email;
    if (validated.username) cleanData.username = validated.username;
    
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', cleanData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.get('/api/v1/auth/logout');
  },
};
