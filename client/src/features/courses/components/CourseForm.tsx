import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Input from "@/shared/components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useCourseForm } from '../hooks/useCourseForm';
import { createCourseSchema } from '@/services/validation/course.schema';
import type { CreateCourseFormData } from '@/services/validation/course.schema';
import { Button } from '@/shared/components/ui/Button';

export function CourseForm() {
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();
  const { createCourse, loading } = useCourseForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseFormData>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      thumbnail: undefined,
      description: "",
      curriculum: "",
      preRequisites: "",
      price: 0,
      paid: false,
      validity: "",
    },
  });

  const onSubmit = async (data: CreateCourseFormData) => {
    try {
      // Ensure curriculum is a string (schema expects string)
      const formData: CreateCourseFormData = {
        ...data,
        paid: isPaid,
        curriculum: String(data.curriculum || ''),
      };

      const course = await createCourse(formData);
      navigate(`/courses/${course._id}`);
    } catch (err) {
      console.error('Course creation failed:', err);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Course Title"
          {...register('title')}
          error={errors.title?.message}
          required
        />

        <div>
          <label className="block mb-2 font-semibold">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register('thumbnail')}
            className="w-full p-3 border rounded-md"
          />
          {errors.thumbnail && (
            <p className="mt-1 text-sm text-red-500">{errors.thumbnail.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            {...register('description')}
            rows={5}
            className={`w-full p-3 border rounded-md ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
            />
            <span className="font-semibold">Paid Course</span>
          </label>
        </div>

        {isPaid && (
          <Input
            label="Price (₹)"
            type="number"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
          />
        )}

        <Input
          label="Validity (days)"
          {...register('validity')}
          error={errors.validity?.message}
          required
        />

        <div>
          <label className="block mb-2 font-semibold">Curriculum (comma-separated)</label>
          <textarea
            {...register('curriculum')}
            rows={3}
            placeholder="HTML & CSS, JavaScript, React, Node.js"
            className="w-full p-3 border rounded-md"
          />
          {errors.curriculum && (
            <p className="mt-1 text-sm text-red-500">{errors.curriculum.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">Prerequisites (optional, comma-separated)</label>
          <textarea
            {...register('preRequisites')}
            rows={2}
            placeholder="Basic computer knowledge, Internet connection"
            className="w-full p-3 border rounded-md"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating Course...' : 'Create Course'}
        </Button>
      </form>
    </div>
  );
}

export default CourseForm;
