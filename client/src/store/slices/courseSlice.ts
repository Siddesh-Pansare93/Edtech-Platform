import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '@/services/types/course.types';
import { CourseState } from '../types';

const initialState: CourseState = {
  enrolledCourses: null,
  createdCourses: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setEnrolledCourses: (state, action: PayloadAction<Course[]>) => {
      state.enrolledCourses = action.payload;
    },
    setCreatedCourses: (state, action: PayloadAction<Course[]>) => {
      state.createdCourses = action.payload;
    },
  },
});

export const { setEnrolledCourses, setCreatedCourses } = courseSlice.actions;
export default courseSlice.reducer;
