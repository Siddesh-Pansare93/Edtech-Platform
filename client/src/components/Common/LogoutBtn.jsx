import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/Features/authSlice'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '@/utils/axiosInstance'
import {motion} from 'framer-motion'


const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = async () => {

        const response = await axiosInstance.get('/users/logout')
        console.log(response)
        if (response.data.success) {
            localStorage.removeItem('token')
            dispatch(logout())
            navigate("/")

        }



    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 text-black hover:text-gray-900 dark:text-white transition-colors"
            onClick={handleLogout}
        >
            Logout
        </motion.button>
    )
}

export default LogoutBtn