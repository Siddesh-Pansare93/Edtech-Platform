import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Common/Input'
import axiosInstance from '@/utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/Features/authSlice'
import { motion, AnimatePresence } from 'framer-motion'


function Login({ isOpen, onClose }) {
    const [submitting, setSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        console.log(data)
        setSubmitting(true)
        const response = await axiosInstance.post('/users/login', data)
        console.log(response)
        setSubmitting(false)
        if (response.data.success) {
            // localStorage.setItem('accessToken', response.data.token)
            // localStorage.setItem('user', JSON.stringify(response.data.data))
            dispatch(login(response.data.data))
            onClose()
            navigate("/home")
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="bg-white rounded-lg p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Login</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col items-center">
                            {/* Email Input */}
                            {/* Username Input */}
                            <Input
                                name="username"
                                placeholder="Username"
                                type="text"
                                label="Username"
                                className={``}
                                {...register('username', { required: 'Username is required' })}
                            />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                            <Input
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                                label="Email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full"
                            />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                            {/* Password Input */}
                            <Input
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                label="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                className="w-full"
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {submitting ? "Submitting..." : "Login"}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Login
