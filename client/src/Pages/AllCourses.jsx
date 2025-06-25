import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

const AllCoursesPage = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.status);

    const fetchCourseDetails = (id) => {
        navigate(`/course-details/${id}`);
    };

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
            return;
        }

        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get("/course");
                console.log(response)
                if (response.data?.success) {
                    setCourses(response.data.data);
                } else {
                    setError(response.data?.message || "Failed to fetch courses");
                }
            } catch (err) {
                console.error(err);
                setError("Something went wrong. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [loggedIn, navigate]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <motion.div
            className="container mx-auto py-8 px-4 md:px-8 lg:px-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <h1 className="text-3xl font-bold text-center mb-8">Explore More Coding Courses</h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-800 dark:text-gray-200" />
                </div>
            ) : error ? (
                <div className="bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300 p-4 rounded-lg">
                    {error}
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                >
                    {courses.map((course) => (
                        <motion.div
                            key={course._id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer transition-all"
                        >
                            <Card className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
                                <CardHeader className="p-0 relative">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                                        Self Paced
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg font-semibold truncate">
                                        {course.title}
                                    </CardTitle>
                                    <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                                        {course.description}
                                    </p>
                                    <p className="text-sm mt-2 font-semibold">Instructor: {course.instructor.name}</p>
                                    <p className="text-sm mt-1">Students: {course.students} enrolled</p>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between p-4">
                                    <Button
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => fetchCourseDetails(course._id)}
                                    >
                                        Watch Now
                                    </Button>
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => fetchCourseDetails(course._id)}
                                    >
                                        Explore
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default AllCoursesPage;
