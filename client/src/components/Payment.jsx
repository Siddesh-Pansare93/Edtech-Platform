import { useState } from 'react'

import '../App.css'

function Payment() {

      
  const courses = ["676c5623a7d76ccf7a555c8d" , "6770080868aec54fcf74dee1" ]

  const runFetch = async ()=>{
    const response = await fetch('http://localhost:8000/api/v1/enroll/purchase' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY5ODcyMzBmMWJlZWU5NjdiMWUxNDMiLCJ1c2VybmFtZSI6InNpZGRlc2g5MyIsImVtYWlsIjoic2lkZGVzaHBhbnNhcmU5M0BnbWFpbC5jb20iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImlhdCI6MTczNTM4OTI1MCwiZXhwIjoxNzM1NDc1NjUwfQ.-HEnKt1329cTiNldxFP3_hL2wrkAjCZ0fegI_Kcx4Hs'
        },
        body: JSON.stringify({
          courses
          })
    })
    const data = await response.json()
    
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
