"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FiHome,
  FiBook,
  FiClipboard,
  FiAward,
  FiBell,
  FiUser,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiGrid,
  FiList,
  FiUpload,
  FiDownload,
  FiLogOut,
} from "react-icons/fi"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import EnrolledCourses from "./EnrolledCourses"
import { useSelector } from "react-redux"

// Dummy data


const assignments = [
  { id: 1, name: "React Project", course: "Introduction to React", dueDate: "2025-03-15", status: "Pending" },
  { id: 2, name: "JavaScript Quiz", course: "Advanced JavaScript", dueDate: "2025-03-10", status: "Submitted" },
  { id: 3, name: "UI Design Mockup", course: "UI/UX Design Principles", dueDate: "2025-03-20", status: "Graded" },
]

const grades = [
  { course: "Introduction to React", grade: "A", score: 92 },
  { course: "Advanced JavaScript", grade: "B+", score: 88 },
  { course: "UI/UX Design Principles", grade: "A-", score: 90 },
  { course: "Data Structures and Algorithms", grade: "B", score: 85 },
]

const notifications = [
  {
    id: 1,
    title: "New assignment posted",
    description: "Check your React course for a new project assignment.",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "Grade updated",
    description: "Your JavaScript quiz has been graded. Check your results!",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    title: "Course recommendation",
    description: 'Based on your interests, we recommend "Machine Learning Basics".',
    timestamp: "3 days ago",
  },
]

const progressData = [
  { name: "Week 1", progress: 20 },
  { name: "Week 2", progress: 40 },
  { name: "Week 3", progress: 55 },
  { name: "Week 4", progress: 70 },
  { name: "Week 5", progress: 85 },
  { name: "Week 6", progress: 100 },
]

const performanceData = [
  { name: "Assignments", value: 85 },
  { name: "Quizzes", value: 92 },
  { name: "Projects", value: 78 },
  { name: "Participation", value: 88 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const StudentDashboard = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [courseView, setCourseView] = useState("grid")

  const userData = useSelector(state => state.auth.userData)
  const courses  = useSelector(state => state.course.enrolledCourses)
    
 

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const SidebarNavigation = () => (
    <motion.aside
      initial={{ width: sidebarOpen ? 250 : 0 }}
      animate={{ width: sidebarOpen ? 250 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg overflow-hidden z-20 ${sidebarOpen ? "w-64" : "w-0"}`}
    >
      <div className="p-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-8 text-gray-800 dark:text-white"
        >
          EduTech
        </motion.h2>
        <nav>
          {[
            { icon: FiHome, label: "Dashboard", section: "dashboard" },
            { icon: FiBook, label: "Courses", section: "courses" },
            { icon: FiClipboard, label: "Assignments", section: "assignments" },
            { icon: FiAward, label: "Grades", section: "grades" },
            { icon: FiBell, label: "Notifications", section: "notifications" },
            { icon: FiUser, label: "Profile", section: "profile" },
          ].map(({ icon: Icon, label, section }) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section)}
              className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
                activeSection === section
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Icon className="mr-3" />
              <span>{label}</span>
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.aside>
  )

  const DashboardOverview = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Welcome back, {userData.name}!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice." -
          Brian Herbert
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: "Courses Enrolled", value: courses.length, color: "bg-blue-500" },
          { label: "Completed Courses", value: "2", color: "bg-green-500" },
          {
            label: "Ongoing Assignments",
            value: assignments.filter((a) => a.status === "Pending").length,
            color: "bg-yellow-500",
          },
          { label: "Average Grade", value: "A-", color: "bg-purple-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${color} p-6 rounded-lg shadow-md text-white`}>
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Learning Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="progress" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Recent Activity</h3>
        <ul className="space-y-4">
          {[
            { text: 'Completed "Introduction to React" module', time: "2 hours ago" },
            { text: "Submitted JavaScript quiz", time: "1 day ago" },
            { text: 'Started new course: "UI/UX Design Principles"', time: "3 days ago" },
          ].map(({ text, time }, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-gray-800 dark:text-gray-200">{text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )

  const CoursesSection = () => (
    <EnrolledCourses/>
  )

  const AssignmentsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Assignments & Deadlines</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{assignment.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{assignment.course}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due: {assignment.dueDate}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  assignment.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : assignment.status === "Submitted"
                      ? "bg-green-200 text-green-800"
                      : "bg-blue-200 text-blue-800"
                }`}
              >
                {assignment.status}
              </span>
              {assignment.status === "Pending" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <FiUpload />
                </motion.button>
              )}
            </div>
          </div>
        ))}
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        View All Assignments
      </motion.button>
    </div>
  )

  const GradesSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Grades & Performance</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-300">
              <th className="pb-3">Course</th>
              <th className="pb-3">Grade</th>
              <th className="pb-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-3 text-gray-800 dark:text-white">{grade.course}</td>
                <td className="py-3 text-gray-800 dark:text-white">{grade.grade}</td>
                <td className="py-3 text-gray-800 dark:text-white">{grade.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Performance Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={performanceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {performanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {performanceData.map((entry, index) => (
            <div key={entry.name} className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full mr-2`}
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-gray-600 dark:text-gray-300">
                {entry.name}: {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        <FiDownload className="inline-block mr-2" />
        Download Report Card
      </motion.button>
    </div>
  )

  const NotificationsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notifications</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{notification.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{notification.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{notification.timestamp}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )

  const ProfileSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile & Settings</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center mb-6">
          <img src={userData.avatar} alt="Profile" className="w-24 h-24 rounded-full mr-6" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{userData.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{userData.email}</p>
            <p className="text-gray-500 dark:text-gray-400">{}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              value={userData.name}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={userData.email}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value="********"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            /> */}
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
          >
            <FiLogOut className="mr-2" />
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  )

  return (
    // userData.role === "student" &&
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <SidebarNavigation />
        <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          <div className="bg-white   dark:bg-gray-800 rounded-xl  w-fit">
            <div className=" px-4 py-4 flex justify-between items-center">
              <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-300 focus:outline-none">
                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button> 
            </div>
          </div>
          <main className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              {activeSection === "dashboard" && <DashboardOverview key="dashboard" />}
              {activeSection === "courses" && <CoursesSection key="courses" />}
              {activeSection === "assignments" && <AssignmentsSection key="assignments" />}
              {activeSection === "grades" && <GradesSection key="grades" />}
              {activeSection === "notifications" && <NotificationsSection key="notifications" />}
              {activeSection === "profile" && <ProfileSection key="profile" />}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

