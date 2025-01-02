import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Common/Input'
import axiosInstance from '@/utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/Features/authSlice'

function Login() {
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
            navigate("/home")
        }

        // const userData = JSON.parse(localStorage.getItem('user'))
        

    }
    



    return (
        <>
            <div className='w-full flex justify-center h-full mt-20'>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-1/2 py-5 h-full border-2 rounded-lg border-gray-300 bg-gray-800 backdrop-blur-xl backdrop-filter bg-opacity-30 max-w-xl shadow-xl ">
                    <div className="flex flex-col items-center justify-center  w-3/4 ">
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

                        {/* Email Input */}
                        <Input
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            label="Email"
                            className={``}
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                        {/* Password Input */}
                        <Input
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            label="Password"
                            className={`mb-2`}
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                        <button type="submit" className='dark:border-white border-black border-2 py-2 px-5 rounded-md mt-6 w-full bg-yellow-500 text-black font-semibold text-md '>{submitting ? "Submitting" : "Submit"}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
