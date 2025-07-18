import React, { useState ,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Common/Input'
import axiosInstance from '@/utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/Features/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { setCreatedCourses, setEnrolledCourses } from '@/store/Features/courseSlice'

function Login() {
    const [submitting, setSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/");
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            console.log("Login data:", data);
            setSubmitting(true);
            
            // Modified to handle either username OR email (not requiring both)
            const loginData = {
                username: data.username || "",
                email: data.email || "",
                password: data.password
            };
            
            const response = await axiosInstance.post('/users/login', loginData);
            console.log("Login response:", response.data);
            
            if (response.data.success) {
                localStorage.setItem('accessToken', response.data.data.accessToken);
                dispatch(login(response.data.data.user));

                if (response.data.data.user.role === "student") {
                    const enrolledCourseResponse = await axiosInstance.get("/users/enrolled-courses");
                    const courses = enrolledCourseResponse.data.data;
                    dispatch(setEnrolledCourses(courses));
                } else if (response.data.data.user.role === "instructor") {
                    const createdCoursesResponse = await axiosInstance.get("/users/your-courses");
                    dispatch(setCreatedCourses(createdCoursesResponse.data.data));
                }
                navigate("/");
            } else {
                // Handle unsuccessful login with success=false
                alert(response.data.message || "Login failed");
            }
        } catch (error) {
            // Handle request errors
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <AnimatePresence>
            (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={` h-full   grid grid-cols-1 md:grid-cols-2  place-items-center z-50 bg-gradient-to-r from-blue-300 to-gray-300 dark:from-gray-900 dark:to-gray-800 `}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="bg-transparent rounded-lg p-8 max-w-md w-full col-span-1 my-20 order-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col justify-center mb-6">
                        <h2 className="text-3xl font-bold text-black dark:text-white mb-5">Welcome Back</h2>

                        <p className='text-lg'>Build skills for today, tomorrow, and beyond.<span className='text-black dark:text-blue-400 italic font-bold '> Education to future-proof your career. </span></p>
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
                            className="w-full  bg-blue-600 dark:bg-yellow-500 dark:text-black font-semibold text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {submitting ? "Submitting..." : "Login"}
                        </motion.button>
                    </form>
                </motion.div>
                <motion.div
                    className="w-1/2 col-span-1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img
                        src="https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8413.jpg?t=st=1735915072~exp=1735918672~hmac=4c652d9685233d2403bffcccbfe2923d3361f16d8167d67b89242da746589740&w=740"
                        alt="Students learning online"
                        className="rounded-xl shadow-2xl"
                    />
                </motion.div>
            </motion.div>
            )
        </AnimatePresence>
    )
}

export default Login
