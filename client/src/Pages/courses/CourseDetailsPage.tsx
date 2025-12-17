import { useCourseDetailsPage } from './hooks/useCourseDetailsPage';
import { Button } from '@/shared/components/ui/Button';
import { ReviewList } from '@/features/reviews/components/ReviewList';

export function CourseDetailsPage() {
  const {
    course,
    reviews,
    enrolled,
    loading,
    error,
    handleEnroll,
    handleViewContent,
  } = useCourseDetailsPage();

  if (loading) return <div className="container mx-auto py-8">Loading...</div>;
  if (error) return <div className="container mx-auto py-8">Error: {error}</div>;
  if (!course) return <div className="container mx-auto py-8">Course not found</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-64 object-cover rounded-lg" 
          />
          <h1 className="text-4xl font-bold mt-4">{course.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{course.description}</p>
          
          <div className="mt-6">
            <h2 className="text-2xl font-bold">Curriculum</h2>
            <ul className="list-disc list-inside mt-2">
              {course.curriculum.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg sticky top-4">
            <div className="text-3xl font-bold mb-4">
              {course.paid ? `₹${course.price}` : 'Free'}
            </div>
            {enrolled ? (
              <Button className="w-full mb-2" onClick={handleViewContent}>
                View Content
              </Button>
            ) : (
              <Button className="w-full mb-2" onClick={handleEnroll}>
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
