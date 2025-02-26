import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import Login from './components/core/Login';
import SignUp from './components/core/SignUp';
import { ThemeProvider } from './components/Common/ThemeProvider';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import CourseDetails from './Pages/CourseDetails';
import AllCoursesPage from './Pages/AllCourses'
import Payment from './components/Payment';
import Verify from './components/Verify';
import CourseContent from './Pages/CourseContent';
import CourseForm from './components/Common/CourseForm';
import EnrolledCourses from './Pages/EnrolledCourses';
import InstructorDashboard from './Pages/InstructorDashboard';
import AboutPage from './Pages/About';
import StudentDashboard from './Pages/StudentDashboard';
import CourseSettings from './Pages/CourseSettings';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for rendering toasts
import 'react-toastify/dist/ReactToastify.css';





const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/courses" element={<AllCoursesPage />} />
      <Route path="/course-details/:id" element={<CourseDetails />} />
      <Route path="/payment/:id" element={<Payment />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/course-content/:id" element={<CourseContent />} />
      <Route path='/courseform' element={<CourseForm />} />
      <Route path='/enrolled-courses' element={<EnrolledCourses />} />
      <Route path='/instructor/dashboard' element={<InstructorDashboard />} />
      <Route path='/instructor/dashboard/course-settings/:courseId' element={<CourseSettings />} />
      <Route path='/student/dashboard' element={<StudentDashboard />} />
    </Route>

  )
)




createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>
        <ToastContainer
          position="top-right" // Position of toast
          autoClose={5000} // Duration in ms
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </PersistGate>
  </Provider>
)
