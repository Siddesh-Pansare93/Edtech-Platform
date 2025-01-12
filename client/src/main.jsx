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
import { store , persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import CourseDetails from './Pages/CourseDetails';
import AllCoursesPage from './Pages/AllCourses'
import Payment from './components/Payment';
import Verify from './components/Verify';
import CourseContent from './Pages/CourseContent';
import CourseForm from './components/Common/CourseForm';
import EnrolledCourses from './Pages/EnrolledCourses';





const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/courses" element={<AllCoursesPage />} />
      <Route path="/course-details/:id" element={<CourseDetails />} />
      <Route path="/payment/:id" element={<Payment />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/course-content/:id" element={<CourseContent/>} />
      <Route path='/courseform' element={<CourseForm/>} />
      <Route path='/enrolled-courses' element={<EnrolledCourses/>} />
    </Route>

  )
)




createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </PersistGate>
  </Provider>
)
