import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/Features/authSlice'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axiosInstance from '@/utils/axiosInstance'



const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = async () => {

        const response = await axiosInstance.get('/users/logout')
        console.log(response)
        if (response.data.success) {
            localStorage.removeItem('token')
            dispatch(logout())
            navigate("/login")  

        }



    }

    return (
        <div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">Log Out</button>
        </div>
    )
}

export default LogoutBtn