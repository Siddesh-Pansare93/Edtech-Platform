import React from 'react'
import { Route, Routes } from "react-router-dom";
import Payment from './components/Payment'
import Verify from './components/verify'


function App() {
  return (
   
    
    <Routes>
      <Route path="/payment" element={<Payment />} />
      <Route path="/verify" element={<Verify />} />
   
    </Routes>
  )
}

export default App