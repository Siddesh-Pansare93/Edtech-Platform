export interface ApiErrorOptions {
  statusCode: number;
  message: string;
  errors?: any[];
  stack?: string;
}

export interface ApiResponseData<T = any> {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;
}

export type ObjectId = import('mongoose').Types.ObjectId;

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
