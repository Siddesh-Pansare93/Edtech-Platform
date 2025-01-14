import axiosInstance from '@/utils/axiosInstance';
import React, { useEffect } from 'react'

function YourCourses() {

  useEffect(() => {
    console.log("Your Courses component mounted");
    const fetchInstructorCourses = async () => {
      try {
        const response = await axiosInstance.get("/users/your-courses")
        console.log(response)

      } catch (error) {
        alert(error.message || "Something went wrong ")
      }
    }

    fetchInstructorCourses()
  }, [])

  return (
    <>
      <div className='mainContainer bg-red-200 grid grid-cols-1 md:grid-cols-5 w-full h-screen place-items-start'>
          <div className='bg-green-200 w-full h-full hidden md:block col-span-1'>
            SidePanel
          </div>
          <div className='w-full h-full bg-blue-200 col-span-4'>Main Area</div>
      </div>
    </>
  )
}

export default YourCourses