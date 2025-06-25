import { useState } from 'react'

import '../App.css'
import { useParams } from 'react-router-dom'
import axiosInstance from '@/utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

function Payment() {

  
  const {id} = useParams()
  const courses = [id]

  const navigate = useNavigate()

  const runFetch = async ()=>{
    console.log(courses)
    const response = await axiosInstance.post("/enroll/purchase" , {courses})
    console.log(response)
    const data = await response.data
    console.log(data)
    
    if(data.success){
      alert("Payment Successful")
      if(data.data === null ){
        navigate(`/course-details/${courses[0]}`)
      }
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
