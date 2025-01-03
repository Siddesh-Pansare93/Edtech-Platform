'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Web Developer',
    content: 'EduTech has been a game-changer for my career. The courses are comprehensive and the instructors are top-notch. I landed my dream job thanks to the skills I learned here!',
    image: '/testimonial-1.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Data Scientist',
    content: 'The data science course on EduTech was exactly what I needed to transition into this field. The hands-on projects and real-world applications were invaluable.',
    image: '/testimonial-2.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    content: 'The UX/UI design course exceeded my expectations. The curriculum was up-to-date with the latest industry trends, and the feedback from instructors helped me improve my design skills significantly.',
    image: '/testimonial-3.jpg',
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
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
          What Our Students Say
        </motion.h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 italic">"{testimonials[currentIndex].content}"</p>
              <div className="flex items-center">
                <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-white dark:bg-gray-700 p-2 rounded-full shadow-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-white dark:bg-gray-700 p-2 rounded-full shadow-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

