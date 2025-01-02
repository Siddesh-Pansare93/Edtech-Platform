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

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout/>}>
      <Route path="/home" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp />}/>
    </Route>

  )
)




createRoot(document.getElementById('root')).render(

  <ThemeProvider>
  <RouterProvider router={router} />
  </ThemeProvider>
)
