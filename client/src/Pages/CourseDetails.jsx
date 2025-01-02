import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '@/utils/axiosInstance'


const CourseDetails = () => {
    const { id } = useParams()
    const [courseDetails, setCourseDetails] = useState({})

    useEffect(() => {
        console.log(id)

        const fetchCourseDetails = async () => {
            try {
                const response = await axiosInstance.get(`/course/details/${id}`)
                console.log(response)
                if (response.data.success) {
                    setCourseDetails(response.data.data)
                }
            } catch (err) {
                console.error(err)
            }
        }

        fetchCourseDetails()

    }, [id])
    return (
        <div>
            <h1>Course Details</h1>
            <p>Course ID: {id}</p>
            <div>
                <p>Title: {courseDetails.title}</p>
                <p>Price: {courseDetails.price}</p>
                <p>{courseDetails.description}</p>



                <h1>Curriculum</h1>
                {courseDetails.curriculum?.map(item => (
                    <h1 key={item}>{item}</h1>
                ))}

            </div>
            <button>Enroll</button>
        </div>
    )
}

export default CourseDetails