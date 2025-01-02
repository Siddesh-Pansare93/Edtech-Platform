
import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Common/Input'
import Select from '../Common/Select'

const SignUp = () => {

    const { register, handleSubmit } = useForm()


    const onSubmit = (data)=>{
        console.log(data)
    }
    return (
        <>
            <div>
                Sign UP Page
            </div>
            <div className='w-full flex justify-center h-full  '>
                <form onSubmit={handleSubmit(onSubmit)} className='w-1/2 flex justify-center border-2 rounded-lg border-gray-300'>
                    <div className="flex flex-col items-center justify-center  w-2/3  p-5  ">
                        <Input
                            name="username"
                            placeholder="Username"
                            type="text"
                            label="Username"
                            {...register('username', { required: 'Username is required' })}
                        />
                        <Input
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            label="Email"
                            {...register('email', { required: 'Email is required' })}
                        />
                        <Input
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            label="Password"
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
                        {/* <Input
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            type="password"
                            label="Confirm Password"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                maxLength: { value: 12, message: 'Password cannot exceed 12 characters' },
                                validate: {
                                    matchPattern: value =>
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,12}$/.test(value) || 'Password must contain at least one uppercase letter and one number',
                                }
                            })}
                        /> */}
                        
                       <Select  
                        label="Select Role"
                        name="role"
                        options={["Student","Instructor"]}
                        {...register('role', { required: 'Role is required' })}
                       />
                       <Select  
                        label="Select your Skill Level"
                        name="skillLevel"
                        options={["Beginner","Intermediate","Advanced"]}
                        {...register('skillLevel', { required: 'skillLevel is required' })}
                       />

                       <Input 
                            type="file"
                            name="avatar"
                            label="Upload Profile Picture"
                            accept="image/*"
                            {...register('avatar', { required: 'Profile Picture is required' })}

                       />
                        <button type="submit" className='bg-yellow-500 text-black font-semibold text-base px-4 py-2 w-full mt-8 rounded-md'>Submit</button>
                    </div>
                   
                </form>
            </div>
        </>

    )
}

export default SignUp