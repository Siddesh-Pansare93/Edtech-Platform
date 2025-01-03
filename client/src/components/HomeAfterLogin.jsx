import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '@/utils/axiosInstance'

function HomeAfterLogin() {
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const loggedIn = useSelector(state => state.auth.status)


  const fetchCourseDetails = (id) => {
    console.log(id)
    navigate(`/course-details/${id}`)
  }

  useEffect(() => {
    // Check if user is authenticated, if not redirect to login page
    if (!loggedIn) {
      navigate('/home')
      return 
    }

    // Fetch courses if logged in
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/course')
        if (response.data.success) {
          setCourses(response.data.data)
        } else {
          setError(response.data.message || 'Failed to fetch courses')
        }
      } catch (err) {
        setError('Something went wrong. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [loggedIn, navigate]) // Re-run the effect when loggedIn changes

  return (
    <div className="w-full h-full flex justify-center items-center">
      {loading && (
        <div>Loading...</div> // This could be a spinner or better UI
      )
      }
      {error && (
        <div className="text-red-500">{error}</div> // Show error message if something went wrong
      )}  
      <div className="grid grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white text-black p-4 m-4  rounded-lg shadow-lg">
            <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-contain rounded-lg" />
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Price: {course.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => fetchCourseDetails(course._id)}>Check Details</button>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default HomeAfterLogin
