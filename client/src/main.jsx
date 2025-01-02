import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';
import Login from './components/core/Login';
import SignUp from './components/core/SignUp';
import { ThemeProvider } from './components/Common/ThemeProvider';
import { Provider } from 'react-redux';
import { store , persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import HomeAfterLogin from './components/HomeAfterLogin';
import CourseDetails from './Pages/CourseDetails';

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<HomeAfterLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/course-details/:id" element={<CourseDetails />} />
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
