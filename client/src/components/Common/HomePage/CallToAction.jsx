'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Star, CheckCircle, Users, Award, Target } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const companiesLogos = [
  { name: "Google", logo: "🏢" },
  { name: "Microsoft", logo: "🏢" },
  { name: "Amazon", logo: "🏢" },
  { name: "Apple", logo: "🏢" },
  { name: "Meta", logo: "🏢" },
  { name: "Netflix", logo: "🏢" }
]

const trustIndicators = [
  { icon: Users, text: "50,000+ Students", color: "text-blue-400" },
  { icon: Star, text: "4.9/5 Rating", color: "text-yellow-400" },
  { icon: Award, text: "Industry Certified", color: "text-green-400" },
  { icon: Target, text: "95% Success Rate", color: "text-purple-400" }
]

const CallToAction = () => {
  const navigate = useNavigate()
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-blue-600/10 via-purple-600/5 to-transparent"
          style={{ y, opacity }}
        />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 max-w-6xl"
      >
        {/* Main Content */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-purple-400 text-xs sm:text-sm font-medium">Limited Time Offer</span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-300 leading-tight"
          >
            Ready to{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
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
              Transform
            </motion.span>{" "}
            Your Future?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/80 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Join millions of learners who've already started their coding journey. 
            Get instant access to premium courses and start building your dream career today.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-10 lg:mb-12"
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl px-2 sm:px-4 py-3 sm:py-4 group hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <indicator.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${indicator.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-white/90 text-xs sm:text-sm font-medium text-center sm:text-left">
                  {indicator.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 lg:mb-16"
          >
            <motion.button
              onClick={() => navigate("/signup")}
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition-all duration-300 shadow-2xl w-full sm:w-auto min-w-[200px] sm:min-w-[250px]"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-50 blur-2xl transition-opacity duration-300" />
            </motion.button>

            <motion.button
              onClick={() => navigate("/courses")}
              className="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl font-bold text-white border-2 border-white/30 rounded-full hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto min-w-[200px] sm:min-w-[250px]"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>Browse Courses</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12"
          >
            {[
              "30-day money-back guarantee",
              "Lifetime access to content",
              "Industry-recognized certificates",
              "24/7 expert support"
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="inline-flex items-center space-x-1 sm:space-x-2 text-white/80 text-xs sm:text-sm lg:text-base"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Companies Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 text-xs sm:text-sm lg:text-base mb-4 sm:mb-6">
              Trusted by students now working at
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
              {companiesLogos.map((company, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 group hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-lg sm:text-xl">{company.logo}</span>
                  <span className="text-white/80 text-xs sm:text-sm font-medium group-hover:text-white transition-colors duration-300">
                    {company.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default CallToAction

