import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Common/Input";
import Select from "../Common/Select";
import { motion } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/store/Features/authSlice";

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        console.log(data);



        try {
            setSubmitting(true)

            // Create FormData for proper multipart/form-data submission
            const formData = new FormData()

            for (const key in data) {
                if (key === "avatar") {
                    // File inputs from react-hook-form return FileList, get the first file
                    formData.append(key, data[key][0])
                    continue
                }
                formData.append(key, data[key])
            }

            const response = await axiosInstance.post("/users/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
       
            console.log(response.data);
            if (response.data.success) {
                dispatch(login(response.data.data))
                setSubmitting(false)
                navigate("/login")
                alert("User created successfully");
            }
        } catch (error) {
            alert(`Failed to Create User ${error.message}`)
            setSubmitting(false)
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={` h-full grid grid-cols-1 md:grid-cols-2  place-items-center z-50 bg-gradient-to-r from-blue-300 to-gray-300 dark:from-gray-900 dark:to-gray-800 `}
            >

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="bg-transparent rounded-lg py-8 px-2 max-w-md w-full col-span-1 my-20 "
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-5">Join the millions learning to code with Skill Vulture for free</h2>
                        <p className='text-lg'>Build skills for today, tomorrow, and beyond.<span className='text-black dark:text-blue-400 italic font-bold '> Education to future-proof your career. </span></p>


                        {/* <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
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
                        </button> */}
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 flex flex-col items-center"
                    >
                        <Input
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                            label="Name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full"
                        />
                        <Input
                            name="username"
                            placeholder="Enter your username"
                            type="text"
                            label="Username"
                            {...register("username", { required: "Username is required" })}
                            className="w-full"
                        />
                        <Input
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            label="Email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full"
                        />
                        <Input
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            label="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Password cannot exceed 12 characters",
                                },
                                validate: {
                                    matchPattern: (value) =>
                                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,12}$/.test(
                                            value
                                        ) ||
                                        "Password must contain at least one uppercase letter and one number",
                                },
                            })}
                            className="w-full"
                        />
                        <div className="flex w-full gap-10">
                            <Select
                                label="Select Role"
                                name="role"
                                options={["Student", "Instructor"]}
                                {...register("role", { required: "Role is required" })}
                                className="w-full"
                            />
                            <Select
                                label="Select your Skill Level"
                                name="skillLevel"
                                options={["Beginner", "Intermediate", "Advanced"]}
                                {...register("skillLevel", {
                                    required: "Skill level is required",
                                })}
                                className="w-full"
                            />
                        </div>
                        <Input
                            type="file"
                            name="avatar"
                            label="Upload Profile Picture"
                            accept="image/*"
                            {...register("avatar", {
                                required: "Profile picture is required",
                            })}
                            className="w-full mb-8"
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-blue-600 dark:bg-yellow-400  text-black font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {submitting ? "Submitting" : "Submit"}
                        </motion.button>
                    </form>
                </motion.div>
                <motion.div
                    className="md:w-1/2 col-span-1"
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

        </>
    );
};

export default SignUp;
