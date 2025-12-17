import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReviewSchema, updateReviewSchema, CreateReviewFormData, UpdateReviewFormData } from '@/services/validation/review.schema';
import { Button } from '@/shared/components/ui/Button';
import Input from '@/shared/components/ui/Input';

interface ReviewFormProps {
  onSubmit: (data: CreateReviewFormData | UpdateReviewFormData) => Promise<void>;
  loading: boolean;
  initialData?: UpdateReviewFormData;
}

export function ReviewForm({ onSubmit, loading, initialData }: ReviewFormProps) {
  const schema = initialData ? updateReviewSchema : createReviewSchema;
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<CreateReviewFormData | UpdateReviewFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2 font-semibold">Rating</label>
        <select
          {...register('rating', { valueAsNumber: true })}
          className="w-full p-3 border rounded-md"
          defaultValue={initialData?.rating || 5}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'star' : 'stars'}
            </option>
          ))}
        </select>
        {errors.rating && (
          <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>
        )}
      </div>
      
      <Input
        label="Review"
        {...register('review')}
        error={errors.review?.message}
        placeholder="Write your review..."
        required
      />
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : initialData ? 'Update Review' : 'Submit Review'}
      </Button>
    </form>
  );
}
