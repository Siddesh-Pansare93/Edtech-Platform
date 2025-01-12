import React, { useEffect, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { motion } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/users/enrolled-courses");
        const courses = response.data.data;
        setEnrolledCourses(courses);

        const progressPromises = courses.map(async (course) => {
          const progressResponse = await axiosInstance.get(`/progress/${course.course._id}`);
          return { courseId: course.course._id, progress: progressResponse.data.data };
        });

        const progressData = await Promise.all(progressPromises);
        const progressMap = progressData.reduce((acc, { courseId, progress }) => {
          acc[courseId] = progress;
          return acc;
        }, {});

        setCourseProgress(progressMap);
      } catch (error) {
        console.error("Error fetching enrolled courses or course progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleNavigate = (courseId) => {
    navigate(`/course-content/${courseId}`);
  };

  const categoryColors = {
    Technology: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    Health: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    Business: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
    General: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Your Enrolled Courses
      </h1>
      {loading ? (
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse"
            >
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded mt-3"></div>
            </div>
          ))}
        </div>
      ) : enrolledCourses?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-base text-gray-600 dark:text-gray-400">
            You haven’t enrolled in any courses yet. Explore our catalog to get started!
          </p>
          <motion.button
            onClick={() => navigate("/courses")}
            className="mt-4 px-5 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md"
            whileTap={{ scale: 0.95 }}
          >
            Browse Courses
          </motion.button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses?.map((course) => (
            <motion.div
              key={course.id}
              className="p-4 rounded-md bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transform transition-all hover:scale-105 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full ${
                  categoryColors[course.course.category] || categoryColors["General"]
                }`}
              >
                {course.course.category || "General"}
              </div>
              <div className="h-28 bg-gray-200 dark:bg-gray-600 rounded mb-3">
                <img
                  src={course.course.thumbnail || "/default-thumbnail.jpg"}
                  alt={`${course.course.title} Thumbnail`}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => (e.target.src = "/default-thumbnail.jpg")}
                />
              </div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                {course.course.title}
              </h2>
              <p className="text-xs mb-3 text-gray-600 dark:text-gray-400 line-clamp-2">
                {course.course.description}
              </p>
              <div className="relative h-3 rounded-full bg-gray-200 dark:bg-gray-600">
                <motion.div
                  className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                  style={{ width: `${courseProgress[course.course._id] || 0}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${courseProgress[course.course._id] || 0}%` }}
                  transition={{ duration: 1 }}
                  title={`Progress: ${courseProgress[course.course._id] || 0}%`}
                />
              </div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Progress: <span className="font-medium">{courseProgress[course.course._id] || 0}%</span>
              </p>
              {courseProgress[course.course._id] === 100 && (
                <div className="mt-1 text-green-500 font-medium text-xs">
                  Course Completed 🎉
                </div>
              )}
              <motion.button
                onClick={() => handleNavigate(course.course._id)}
                className="mt-4 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md shadow-sm flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
                title={`Go to ${course.course.title}`}
              >
                Go to Course
                <BsArrowRightCircle className="text-base" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
