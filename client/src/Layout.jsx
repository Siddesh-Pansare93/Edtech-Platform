import React, { Children, useState } from 'react'
import { Outlet } from 'react-router-dom'
import  Header  from './components/Common/Header'
import Login from './components/core/Login'
import Footer from './components/Common/Footer'

function Layout() {


  return (
    <>
    <div className='bg-black'>
    <Header/>
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Layout