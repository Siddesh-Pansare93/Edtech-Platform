import { useState } from 'react';
import { paymentService } from '@/services/api/paymentService';
import { PurchaseFormData } from '@/services/validation/payment.schema';
import { PaymentSession } from '@/services/types/payment.types';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchaseCourses = async (data: PurchaseFormData): Promise<PaymentSession> => {
    try {
      setLoading(true);
      setError(null);
      const session = await paymentService.purchaseCourses(data);
      
      if (session.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = session.sessionUrl;
      } else {
        toast.success(session.message || 'Free courses enrolled successfully!');
      }
      
      return session;
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to initiate payment';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { purchaseCourses, loading, error };
}
