import React from 'react'
import { Route, Routes } from "react-router-dom";
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