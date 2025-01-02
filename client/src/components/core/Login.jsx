    import React from 'react'
    import { useForm } from 'react-hook-form'
    import Input from '../Common/Input'

    function Login() {
        const { register, handleSubmit, formState: { errors } } = useForm()

        const onSubmit = (data) => {
            console.log(data)
        }

        return (
            <>
                <div>Login</div>
                <div className='w-full flex justify-center h-full mt-20'>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-1/2 py-5 h-full border-2 rounded-lg border-gray-300 ">
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
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                maxLength: { value: 12, message: 'Password cannot exceed 12 characters' },
                                validate: {
                                    matchPattern: value =>
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,12}$/.test(value) || 'Password must contain at least one uppercase letter and one number',
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <button type="submit" className='dark:border-white border-black border-2 py-2 px-5 rounded-md mt-6 w-full bg-yellow-500 text-black font-semibold text-md '>Submit</button>
                    </div>
                </form>
                </div>
            </>
        )
    }

    export default Login
