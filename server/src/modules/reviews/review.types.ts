import { ReviewDocument } from './review.model';

export interface CreateReviewDTO {
  rating: number;
  review: string;
}

export interface UpdateReviewDTO {
  rating?: number;
  review?: string;
}

export { ReviewDocument };
