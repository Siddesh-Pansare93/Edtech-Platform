'use client'

import Login from '@/components/core/Login'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const courses = [
  {
    title: 'Web Development Bootcamp',
    instructor: 'John Doe',
    rating: 4.8,
    students: 10532,
    image: '/course-web-dev.jpg',
  },
  {
    title: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    rating: 4.9,
    students: 8745,
    image: '/course-data-science.jpg',
  },
  {
    title: 'UX/UI Design Masterclass',
    instructor: 'Mike Johnson',
    rating: 4.7,
    students: 6298,
    image: '/course-ux-ui.jpg',
  },
]

const FeaturedCourses = () => {
  const navigate = useNavigate()
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleNavigate = () => {
    
  }
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Featured Courses
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Instructor: {course.instructor}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 mr-1" size={20} />
                    <span className="text-gray-700 dark:text-gray-300">{course.rating}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigate}
          >
            View All Courses
          </motion.button>  
        </div>
      </div>
     
    </section>
  )
}

export default FeaturedCourses

