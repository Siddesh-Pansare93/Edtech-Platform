'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Clock } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Diverse Course Selection',
    description: 'Access a wide range of courses covering various subjects and skill levels.',
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience in their fields.',
  },
  {
    icon: Award,
    title: 'Recognized Certifications',
    description: 'Earn certificates that are valued by employers worldwide.',
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description: 'Study at your own pace with lifetime access to course materials.',
  },
]

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Choose EduTech?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="mb-4 inline-block p-4 bg-blue-100 dark:bg-blue-900 rounded-full"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon size={32} className="text-blue-600 dark:text-blue-400" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

