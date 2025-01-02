import React, { Children } from 'react'
import { Outlet } from 'react-router-dom'
import  Header  from './components/Common/Header'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>

    </>
  )
}

export default Layout