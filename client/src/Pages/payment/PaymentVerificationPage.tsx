import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEnrollment } from '@/features/enrollment/hooks/useEnrollment';
import { Button } from '@/shared/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';

export function PaymentVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyAndEnroll, loading, error } = useEnrollment();

  const success = searchParams.get('success') === 'true';
  const courseIds = searchParams.get('courseIds') || '';

  useEffect(() => {
    if (success && courseIds) {
      handleVerify();
    }
  }, [success, courseIds]);

  const handleVerify = async () => {
    try {
      await verifyAndEnroll({
        success: true,
        courseIds: courseIds,
      });
      navigate('/courses');
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>{success ? 'Payment Successful!' : 'Payment Failed'}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {success ? (
            <div>
              <p className="mb-4">Your payment was successful. Enrolling you in the course...</p>
              {loading && <p>Processing enrollment...</p>}
            </div>
          ) : (
            <div>
              <p className="mb-4">Your payment was not completed.</p>
              <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
