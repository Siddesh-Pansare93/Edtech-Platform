'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, Clock, Users, Award, BookOpen, Play, ArrowRight, Zap } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const courses = [
  {
    id: 1,
    title: "Complete React Developer Bootcamp",
    instructor: "Sarah Chen",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b606?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    price: "$129",
    originalPrice: "$299",
    rating: 4.9,
    students: 15420,
    duration: "45 hours",
    level: "Beginner to Pro",
    description: "Master React from fundamentals to advanced concepts with real-world projects and industry best practices.",
    tags: ["React", "JavaScript", "Web Development"],
    featured: true,
    discount: "57% OFF"
  },
  {
    id: 2,
    title: "Python Machine Learning Masterclass",
    instructor: "Dr. Michael Zhang",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    price: "$199",
    originalPrice: "$399",
    rating: 4.8,
    students: 12850,
    duration: "60 hours",
    level: "Intermediate",
    description: "Deep dive into machine learning with Python, covering algorithms, neural networks, and real-world applications.",
    tags: ["Python", "AI", "Machine Learning"],
    featured: false,
    discount: "50% OFF"
  },
  {
    id: 3,
    title: "Full Stack JavaScript Development",
    instructor: "Alex Rodriguez",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
    price: "$179",
    originalPrice: "$349",
    rating: 4.9,
    students: 18200,
    duration: "80 hours",
    level: "Beginner to Advanced",
    description: "Complete full-stack development with Node.js, Express, MongoDB, and modern frontend frameworks.",
    tags: ["JavaScript", "Node.js", "MongoDB"],
    featured: true,
    discount: "49% OFF"
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Emma Thompson",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    price: "$99",
    originalPrice: "$199",
    rating: 4.7,
    students: 9500,
    duration: "35 hours",
    level: "Beginner",
    description: "Learn design principles, user research, prototyping, and create stunning user experiences.",
    tags: ["Design", "Figma", "User Experience"],
    featured: false,
    discount: "50% OFF"
  }
]

const CourseCard = ({ course, index, focusedIndex, setFocusedIndex }) => {
  const cardRef = useRef(null)
  const isFocused = focusedIndex === index

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl border backdrop-blur-md transition-all duration-500 cursor-pointer",
        isFocused
          ? "border-blue-500/50 bg-black/60 scale-102 sm:scale-105 z-10"
          : "border-white/10 bg-black/40 hover:border-white/20 hover:bg-black/50"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setFocusedIndex(index)}
      onMouseLeave={() => setFocusedIndex(null)}
      whileHover={{ y: -5 }}
      style={{
        filter: focusedIndex !== null && !isFocused ? "blur(1px)" : "blur(0px)",
      }}
    >
      {/* Featured badge */}
      {course.featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 inline-flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 sm:px-3 py-1 rounded-full text-xs font-bold"
        >
          <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
          <span className="hidden sm:inline">FEATURED</span>
        </motion.div>
      )}

      {/* Discount badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold"
      >
        {course.discount}
      </motion.div>

      {/* Course image */}
      <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
        <motion.img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" />
          </div>
        </motion.div>

        {/* Level badge */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs">
          {course.level}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Instructor */}
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={course.instructorAvatar}
            alt={course.instructor}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white/20"
          />
          <span className="text-white/70 text-xs sm:text-sm">{course.instructor}</span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300 line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-xs sm:text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {course.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg border border-blue-500/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-white/60 text-xs sm:text-sm mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{course.students.toLocaleString()}</span>
            <span className="sm:hidden">{Math.round(course.students / 1000)}k</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{course.price}</span>
            <span className="text-white/40 line-through text-xs sm:text-sm">{course.originalPrice}</span>
          </div>
          
          <motion.button
            className="group/btn inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium">Enroll</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

const PopularCourses = () => {
  const [focusedIndex, setFocusedIndex] = useState(null)
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={containerRef} className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/5 to-transparent" />
        
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
            y
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6"
          >
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
            <span className="text-green-400 text-xs sm:text-sm font-medium">Popular Courses</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-blue-300">
            Master{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              In-Demand Skills
            </motion.span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Join our most popular courses taught by industry experts and start building your dream career today
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              focusedIndex={focusedIndex}
              setFocusedIndex={setFocusedIndex}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-2xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Explore All Courses</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-300" />
          </motion.button>

          <p className="text-white/60 text-xs sm:text-sm mt-4">
            30-day money-back guarantee • Lifetime access • Industry certificates
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default PopularCourses

