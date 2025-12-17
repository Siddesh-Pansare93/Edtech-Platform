import { Review } from '@/services/types/review.types';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/Card';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const user = typeof review.user === 'object' ? review.user : null;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold">{user?.name || 'Anonymous'}</h4>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">{review.review}</p>
      </CardContent>
    </Card>
  );
}
