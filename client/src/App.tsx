import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor, RootState } from '@/store/store';
import { Layout } from '@/shared/components/layout/Layout';
import { LoginPage, SignUpPage } from '@/pages/auth';
import { CoursesPage, CourseDetailsPage, CourseContentPage } from '@/pages/courses';
import { ProfilePage } from '@/pages/profile';
import { StudentDashboardPage, InstructorDashboardPage } from '@/pages/dashboard';
import { HomePage } from '@/pages/home';
import { AboutPage } from '@/pages/about';
import { PaymentVerificationPage } from '@/pages/payment';
import { ThemeProvider } from '@/shared/components/providers/ThemeProvider';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.status);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// Placeholder pages - to be implemented





function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
              <Route 
                path="/courses/:courseId/content" 
                element={
                  <ProtectedRoute>
                    <CourseContentPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/student" 
                element={
                  <ProtectedRoute>
                    <StudentDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/instructor" 
                element={
                  <ProtectedRoute>
                    <InstructorDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/verify" element={<PaymentVerificationPage />} />
            </Routes>
          </Layout>
          <ToastContainer 
            position="top-right" 
            autoClose={3000} 
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss
          />
            </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
