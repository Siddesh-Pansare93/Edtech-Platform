import { useState } from 'react'

import '../App.css'
import { useParams } from 'react-router-dom'

function Payment() {

  const {id} = useParams()
      
  const courses = [id]

  const runFetch = async ()=>{
    const response = await fetch('http://localhost:8000/api/v1/enroll/purchase' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY5ODcyMzBmMWJlZWU5NjdiMWUxNDMiLCJ1c2VybmFtZSI6InNpZGRlc2g5MyIsImVtYWlsIjoic2lkZGVzaHBhbnNhcmU5M0BnbWFpbC5jb20iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImlhdCI6MTczNjA5MzIxMCwiZXhwIjoxNzM2MTc5NjEwfQ.2hHfNacfW--LObEKx3DQZwULjZGflcLbLCi6eV-miwo'
        },
        body: JSON.stringify({
          courses
          })
    })
    const data = await response.json()
    console.log(data)
    
    if(data.success){
      window.location.replace(data.data)
    }else{
      alert(data.message)
    }
  }

  return (
    <>
      
          <button onClick={runFetch}>CheckOut</button>
      
    </>
  )
}

export default Payment
