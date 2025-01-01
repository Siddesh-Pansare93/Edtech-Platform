import React from 'react'
import { Route, Routes } from "react-router-dom";
import Payment from './components/Payment'
import Verify from './components/verify'
import { Button } from './components/ui/button';


function App() {

  const handleSubmit = ()=>{
    console.log("submit")
  }
  return (
    <>
      <h1>HIi From Siddesh</h1>
      <Button onClick={handleSubmit}>
        Click me
      </Button>
    </>
  )
}

export default App