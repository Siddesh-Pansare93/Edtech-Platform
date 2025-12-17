export interface PurchaseDTO {
  courses: string[];
}

export interface PaymentSession {
  sessionUrl: string | null;
  message: string;
}

export interface StripeSessionData {
  courseIds: string[];
  totalAmount: number;
}
