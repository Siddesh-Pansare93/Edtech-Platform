'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'


const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 py-20 ">
      <div className="container mx-auto px-10 pt-32 ">
        <div className="flex flex-col md:flex-row items-center md:justify-evenly ">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-loose">
              Empower Your Future with Coding Skills 
            </h1>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 ">
              Access world-class education from anywhere. Learn, grow, and succeed with our cutting-edge online courses.
            </p>
            <motion.button
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Courses</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
          <motion.div
            className="md:w-1/4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://img.freepik.com/free-vector/hand-coding-concept-illustration_114360-8413.jpg?t=st=1735915072~exp=1735918672~hmac=4c652d9685233d2403bffcccbfe2923d3361f16d8167d67b89242da746589740&w=740"
              alt="Students learning online"
              className="rounded-[50%] shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
