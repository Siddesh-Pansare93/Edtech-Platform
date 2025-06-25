'use client'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { UserPlus, BookOpen, Brain, Trophy, ArrowRight, Lightbulb, Target, Rocket, CheckCircle, Zap, Sparkles } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Sign Up & Assess",
    description: "Create your account and complete our AI-driven skill assessment to understand your current level and learning style.",
    details: [
      "Quick 5-minute signup process",
      "Comprehensive skill evaluation", 
      "Learning style analysis",
      "Personalized goal setting"
    ],
    color: "from-blue-500 to-cyan-500",
    delay: 0.1,
    stats: "2 min",
    statsLabel: "Setup Time"
  },
  {
    id: 2,
    icon: Brain,
    title: "AI-Powered Learning Path",
    description: "Our advanced AI creates a custom learning roadmap tailored to your goals, skill level, and preferred learning pace.",
    details: [
      "Personalized curriculum design",
      "Adaptive difficulty progression", 
      "Industry-aligned skill tracks",
      "Real-time path optimization"
    ],
    color: "from-purple-500 to-pink-500",
    delay: 0.2,
    stats: "100%",
    statsLabel: "Personalized"
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Interactive Learning",
    description: "Engage with cutting-edge content through interactive coding exercises, projects, and real-world simulations.",
    details: [
      "Hands-on coding challenges",
      "Live project collaborations",
      "Industry mentor guidance",
      "Peer learning communities"
    ],
    color: "from-green-500 to-teal-500",
    delay: 0.3,
    stats: "24/7",
    statsLabel: "Support Available"
  },
  {
    id: 4,
    icon: Trophy,
    title: "Achieve & Advance",
    description: "Complete projects, earn certificates, build your portfolio, and get matched with career opportunities.",
    details: [
      "Industry-recognized certificates",
      "Portfolio project showcase",
      "Career placement assistance",
      "Alumni network access"
    ],
    color: "from-orange-500 to-red-500",
    delay: 0.4,
    stats: "95%",
    statsLabel: "Job Success Rate"
  }
]

const StepCard = ({ step, index, activeStep, setActiveStep }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const isActive = activeStep === index

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative group cursor-pointer transition-all duration-500",
        isActive ? "scale-105" : "hover:scale-102"
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: step.delay }}
      onClick={() => setActiveStep(isActive ? null : index)}
      whileHover={{ y: -5 }}
    >
      {/* Connection line to next step */}
      {index < steps.length - 1 && (
        <motion.div 
          className="hidden lg:block absolute top-1/2 -right-16 w-32 h-px bg-gradient-to-r from-white/20 to-white/10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: step.delay + 0.3 }}
        >
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4 text-white/40" />
          </motion.div>
        </motion.div>
      )}

      {/* Main card */}
      <div className={cn(
        "relative bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-500",
        isActive ? "border-white/30 bg-black/60" : "hover:border-white/20 hover:bg-black/50"
      )}>
        {/* Background gradient */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-500",
          step.color,
          isActive ? "opacity-20" : "group-hover:opacity-15"
        )} />

        {/* Step number badge */}
        <motion.div
          className={cn(
            "absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-br border border-white/20 flex items-center justify-center text-white text-sm font-bold",
            step.color
          )}
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {step.id}
        </motion.div>

        {/* Icon */}
        <motion.div
          className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br border border-white/20 mb-6 group-hover:scale-110 transition-all duration-300",
            step.color
          )}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <step.icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Stats */}
        <div className="flex items-center space-x-2 mb-4">
          <motion.div
            className={cn(
              "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              step.color
            )}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: step.delay + 0.2 }}
          >
            {step.stats}
          </motion.div>
          <span className="text-white/60 text-sm">{step.statsLabel}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 transition-all duration-300">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
          {step.description}
        </p>

        {/* Details - Expanded when active */}
        <motion.div
          initial={false}
          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-3 pt-4 border-t border-white/10">
            {step.details.map((detail, detailIndex) => (
              <motion.div
                key={detailIndex}
                className="flex items-center space-x-3 text-white/80"
                initial={{ opacity: 0, x: -10 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
              >
                <CheckCircle className={cn("w-4 h-4", step.color.includes('blue') ? 'text-blue-400' : step.color.includes('purple') ? 'text-purple-400' : step.color.includes('green') ? 'text-green-400' : 'text-orange-400')} />
                <span className="text-sm">{detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Click indicator */}
        <motion.div
          className="absolute bottom-4 right-6 text-white/40 text-xs"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isActive ? "Click to collapse" : "Click to expand"}
        </motion.div>

        {/* Hover glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
          step.color
        )} />
      </div>
    </motion.div>
  )
}

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]))
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-black">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
        
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          style={{ y }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Enhanced floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Grid pattern with animation */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            y: useTransform(scrollYProgress, [0, 1], [0, -50])
          }}
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 max-w-7xl"
      >
        {/* Enhanced header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-6 py-3 mb-8"
          >
            <Lightbulb className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-400 font-medium">How It Works</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-300">
            Your Journey to{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
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
              Success
            </motion.span>
          </h2>
          
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Transform your career with our proven 4-step methodology designed for maximum impact and accelerated learning
          </p>
        </motion.div>

        {/* Interactive steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-4 mb-20">
          {steps.map((step, index) => (
            <StepCard 
              key={step.id} 
              step={step} 
              index={index} 
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          ))}
        </div>

        {/* Enhanced success metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-12 mb-16 overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-center text-white mb-12">
              Proven Results That Speak For Themselves
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Target, 
                  stat: "6 months", 
                  label: "Average Career Change Time",
                  color: "from-blue-500 to-cyan-500",
                  description: "From beginner to job-ready professional"
                },
                { 
                  icon: Zap, 
                  stat: "3x Faster", 
                  label: "Than Traditional Learning",
                  color: "from-purple-500 to-pink-500",
                  description: "AI-powered personalized learning paths"
                },
                { 
                  icon: Trophy, 
                  stat: "95%", 
                  label: "Job Placement Success Rate",
                  color: "from-green-500 to-teal-500",
                  description: "Within 6 months of completion"
                }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={cn(
                      "inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br border border-white/20 mb-6 group-hover:scale-110 transition-transform duration-300",
                      metric.color
                    )}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <metric.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className={cn(
                      "text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
                      metric.color
                    )}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {metric.stat}
                  </motion.div>
                  
                  <div className="text-white font-semibold mb-2">
                    {metric.label}
                  </div>
                  
                  <div className="text-white/60 text-sm">
                    {metric.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(99, 102, 241, 0.3)",
                "0 0 40px rgba(147, 51, 234, 0.4)",
                "0 0 20px rgba(99, 102, 241, 0.3)"
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <span className="flex items-center space-x-3">
              <Rocket className="w-6 h-6" />
              <span>Start Your Transformation</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Enhanced hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 opacity-0 group-hover:opacity-75 blur-2xl transition-opacity duration-300" />
          </motion.button>
          
          <p className="text-white/60 text-sm mt-4">
            Join 50,000+ successful career changers • No prerequisites required
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HowItWorks
