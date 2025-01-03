import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Common/Input";
import Select from "../Common/Select";
import { motion } from "framer-motion";

const SignUp = ({ isOpen, onClose }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            {isOpen && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Sign Up</h2>
                        <button
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
                        </button>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 flex flex-col items-center"
                    >
                        <Input
                            name="username"
                            placeholder="Username"
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
                        <Input
                            type="file"
                            name="avatar"
                            label="Upload Profile Picture"
                            accept="image/*"
                            {...register("avatar", {
                                required: "Profile picture is required",
                            })}
                            className="w-full"
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Submit
                        </motion.button>
                    </form>
                </motion.div>
                )
            </motion.div>
            }
        </>
    );
};

export default SignUp;
