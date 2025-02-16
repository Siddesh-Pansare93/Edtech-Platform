import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosInstance from '@/utils/axiosInstance';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Import icons
import { AcademicCapIcon, UserGroupIcon, BookOpenIcon, ChevronRightIcon, MagnifyingGlassIcon , AdjustmentsHorizontalIcon , ArrowUpIcon , Bars3Icon  } from '@heroicons/react/24/outline';

function InstructorDashboard() {
  const [coursesData, setCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const response = await axiosInstance.get("/users/your-courses");
        setCoursesData(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructorCourses();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const filteredCourses = coursesData?.instructorCourses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || course.category === selectedCategory)
  ).sort((a, b) => {
    if (sortBy === 'popularity') return b.enrolledStudents - a.enrolledStudents;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  }) || [];

  const categories = ['All', ...new Set(coursesData?.instructorCourses.map(course => course.category) || [])];

  const chartData = coursesData?.instructorCourses.map(course => ({
    name: course.title,
    students: course.enrolledStudents || 0,
  })) || [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed md:static w-64 h-full bg-white  z-20"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <Link  className="flex items-center px-6 py-3 text-gray-700 bg-gray-200">
            <AcademicCapIcon className="w-5 h-5 mr-3" />
            Your Courses
          </Link>
          <Link className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <UserGroupIcon className="w-5 h-5 mr-3" />
            Students
          </Link>
          <Link to={"/courseform"} className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <BookOpenIcon className="w-5 h-5 mr-3" />
            Create Course
          </Link>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Your Courses</h1>
            <button 
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Bars3Icon  className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{
                  rotate: 360,
                  borderRadius: ["25%", "50%", "25%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                }}
                className="w-16 h-16 border-t-4 border-blue-500"
              />
            </div>
          ) : coursesData ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Search and Filter Section */}
              <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto sm:flex-1 min-w-[200px]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="w-full pl-10 pr-4 py-2 border rounded-md"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MagnifyingGlassIcon  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      className="w-full sm:w-auto appearance-none bg-white border rounded-md pl-3 pr-10 py-2"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (

                        //*******Note  : yaha pe Math.random ko change karna hai to actual categories ********

                        <option key={Math.random()} value={category}>{category}</option>
                      ))}
                    </select>
                    <AdjustmentsHorizontalIcon  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      className="w-full sm:w-auto appearance-none bg-white border rounded-md pl-3 pr-10 py-2"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="popularity">Popularity</option>
                      <option value="title">Title</option>
                    </select>
                    <ArrowUpIcon  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {filteredCourses.map((course) => (
                    <motion.div
                      key={course._id}
                      variants={itemVariants}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="bg-white overflow-hidden shadow-lg rounded-lg"
                    >
                      <Carousel showThumbs={false} showStatus={false}>
                        <div>
                          {console.log(course)}
                          <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                        </div>
                      </Carousel>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{course.description}</p>
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <UserGroupIcon className="w-4 h-4 mr-1" />
                            {course.enrolledStudents || 0} students
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link to={`course-settings/${course._id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            View Course <ChevronRightIcon className="ml-2 w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Course Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Course Statistics</h3>
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Courses</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{coursesData.totalCourses}</dd>
                      </div>
                    </div>
                    <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Enrolled Students</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{coursesData.totalEnrolledStudents}</dd>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enrollment Chart */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Course Enrollments</CardTitle>
                  <CardDescription>Number of students enrolled in each course</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      students: {
                        label: "Enrolled Students",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="students" fill="var(--color-students)" name="Enrolled Students" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <p>No courses found.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default InstructorDashboard;

