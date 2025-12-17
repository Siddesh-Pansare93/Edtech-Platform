import { useState } from 'react';
import { coursesService } from '@/services/api/coursesService';
import { CreateCourseFormData, UpdateCourseFormData } from '@/services/validation/course.schema';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export function useCourseForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCourse = async (data: CreateCourseFormData) => {
    try {
      setLoading(true);
      setError(null);
      const course = await coursesService.createCourse(data);
      toast.success('Course created successfully!');
      return course;
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to create course';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (courseId: string, data: UpdateCourseFormData) => {
    try {
      setLoading(true);
      setError(null);
      const course = await coursesService.updateCourse(courseId, data);
      toast.success('Course updated successfully!');
      return course;
    } catch (err: any) {
      if (err instanceof ZodError) {
        const errorMsg = err.issues.map((e: { message: string }) => e.message).join(', ');
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to update course';
        setError(errorMsg);
        toast.error(errorMsg);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      setLoading(true);
      setError(null);
      await coursesService.deleteCourse(courseId);
      toast.success('Course deleted successfully!');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to delete course';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCourse, updateCourse, deleteCourse, loading, error };
}
