'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Users, Trophy, Target, Globe, Shield, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized learning paths that adapt to your pace and style with advanced machine learning algorithms.",
    color: "from-blue-500 to-purple-600",
    bgColor: "from-blue-500/10 to-purple-600/10",
    borderColor: "border-blue-500/20",
    size: "large"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get up to speed quickly with our optimized learning modules and interactive coding environments.",
    color: "from-yellow-500 to-orange-600",
    bgColor: "from-yellow-500/10 to-orange-600/10",
    borderColor: "border-yellow-500/20",
    size: "medium"
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Learn from industry professionals with years of real-world experience.",
    color: "from-green-500 to-teal-600",
    bgColor: "from-green-500/10 to-teal-600/10",
    borderColor: "border-green-500/20",
    size: "medium"
  },
  {
    icon: Trophy,
    title: "Industry Recognition",
    description: "Earn certificates recognized by top tech companies worldwide.",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-500/10 to-pink-600/10",
    borderColor: "border-purple-500/20",
    size: "large"
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "Clear learning objectives and milestone tracking to keep you on track.",
    color: "from-red-500 to-rose-600",
    bgColor: "from-red-500/10 to-rose-600/10",
    borderColor: "border-red-500/20",
    size: "medium"
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with learners worldwide and build lasting professional relationships.",
    color: "from-cyan-500 to-blue-600",
    bgColor: "from-cyan-500/10 to-blue-600/10",
    borderColor: "border-cyan-500/20",
    size: "medium"
  },
  {
    icon: Shield,
    title: "Lifetime Access",
    description: "Once enrolled, access course materials forever with free updates.",
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-500/10 to-purple-600/10",
    borderColor: "border-indigo-500/20",
    size: "medium"
  },
  {
    icon: Rocket,
    title: "Career Boost",
    description: "Fast-track your career with job placement assistance and resume building.",
    color: "from-orange-500 to-red-600",
    bgColor: "from-orange-500/10 to-red-600/10",
    borderColor: "border-orange-500/20",
    size: "large"
  }
]

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon
  
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl border backdrop-blur-md transition-all duration-500 cursor-pointer",
        feature.borderColor,
        `bg-gradient-to-br ${feature.bgColor}`,
        "hover:scale-102 sm:hover:scale-105 hover:shadow-2xl",
        // Responsive grid sizing
        feature.size === "large" ? "sm:col-span-2 lg:col-span-2 xl:col-span-1" : "",
        "h-full"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
        {/* Icon */}
        <motion.div
          className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </motion.div>

        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300">
            {feature.description}
          </p>
        </div>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`} />
      </div>
    </motion.div>
  )
}

const WhyChooseUs = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />
        
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
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
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6"
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-blue-400 text-xs sm:text-sm font-medium">Why Choose SkillVulture</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-300">
            Why{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
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
              Thousands
            </motion.span>{" "}
            Choose Us
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            Discover what makes SkillVulture the premier destination for transforming your coding journey
          </p>
        </motion.div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-white/10"
        >
          {[
            { number: "50K+", label: "Happy Students" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "Support" },
            { number: "200+", label: "Expert Courses" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-200 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-white/60 text-xs sm:text-sm lg:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs

