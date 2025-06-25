import axiosInstance from '@/utils/axiosInstance';
import React from 'react'
import { useSearchParams } from 'react-router-dom'

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams()
    console.log(window.location.href);
    console.log(searchParams)
    const success = searchParams.get('success')
    const courseIds = searchParams.get('courseIds')?.split(",") || null
    console.log(success)
    console.log(courseIds)

    const onClick = async () => {
        const response = await axiosInstance.post("/users/verify-payment" , {
            success , 
            courseIds
        })

        console.log(response)

        console.log(response.data.data)


            
    }
    return (
        <div>
            <h1>Success</h1>
            <p>Payment successful</p>
            <button onClick={onClick}>Proceed further</button>
        </div>
    )
}

export default Verify