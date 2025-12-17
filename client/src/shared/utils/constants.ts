export const APP_NAME = 'EdTech Platform';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  COURSES: '/courses',
  COURSE_DETAILS: (id: string) => `/courses/${id}`,
  COURSE_CONTENT: (id: string) => `/courses/${id}/content`,
  PROFILE: '/profile',
  STUDENT_DASHBOARD: '/dashboard/student',
  INSTRUCTOR_DASHBOARD: '/dashboard/instructor',
  ABOUT: '/about',
} as const;
