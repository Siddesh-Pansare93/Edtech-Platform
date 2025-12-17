import { useParams } from 'react-router-dom';
import { usePayment } from '@/features/payment/hooks/usePayment';
import { Button } from '@/shared/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';

export function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const { purchaseCourses, loading, error } = usePayment();

  const handlePurchase = async () => {
    if (!id) return;
    
    try {
      await purchaseCourses({ courseIds: [id] });
    } catch (err) {
      console.error('Payment failed:', err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <Button onClick={handlePurchase} disabled={loading} className="w-full">
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
