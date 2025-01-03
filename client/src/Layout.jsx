import React, { Children, useState } from 'react'
import { Outlet } from 'react-router-dom'
import  Header  from './components/Common/Header'
import Login from './components/core/Login'
import Footer from './components/Common/Footer'

function Layout() {
  const [isLoginOpen , setIsLoginOpen] = useState(false)
  console.log(isLoginOpen)

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout