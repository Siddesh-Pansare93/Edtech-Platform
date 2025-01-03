import { motion } from 'framer-motion'
import { Search, BookOpen, Award } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Find Your Course',
    description: 'Browse our extensive catalog and choose the perfect course for your goals.',
  },
  {
    icon: BookOpen,
    title: 'Start Learning',
    description: 'Access high-quality video lessons, quizzes, and hands-on projects at your own pace.',
  },
  {
    icon: Award,
    title: 'Get Certified',
    description: 'Complete your course and earn a valuable certificate to showcase your new skills.',
  },
]

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="mb-4 p-4 bg-blue-100 dark:bg-blue-700 rounded-full">
                <step.icon size={32} className="text-blue-600 dark:text-blue-300" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
