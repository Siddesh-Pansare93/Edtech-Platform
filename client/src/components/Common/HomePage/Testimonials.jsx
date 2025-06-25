'use client'

import { motion, useAnimationFrame } from 'framer-motion'
import { Star, Quote, User, Heart, TrendingUp } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "Google",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b606?w=150&h=150&fit=crop&crop=face",
    content: "SkillVulture transformed my career completely. The AI-powered learning paths helped me master React in just 3 months. Now I'm working at my dream company!",
    rating: 5,
    highlight: "Got hired at Google"
  },
  {
    name: "Michael Chen",
    role: "Full Stack Engineer",
    company: "Microsoft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "The mentorship program is incredible. Having industry experts guide me through complex concepts made all the difference. The community support is unmatched.",
    rating: 5,
    highlight: "300% salary increase"
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Tesla",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "From zero programming knowledge to landing a data science role at Tesla. The structured curriculum and hands-on projects were game-changers for me.",
    rating: 5,
    highlight: "Career switch success"
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    company: "Amazon",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "The cloud computing courses are top-notch. Real-world projects and industry certifications helped me transition into DevOps seamlessly.",
    rating: 5,
    highlight: "Joined Amazon"
  },
  {
    name: "Lisa Thompson",
    role: "Mobile Developer",
    company: "Apple",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    content: "The mobile development track is phenomenal. Interactive lessons and real app deployments gave me the confidence to apply to top tech companies.",
    rating: 5,
    highlight: "iOS Developer at Apple"
  },
  {
    name: "James Wilson",
    role: "Backend Engineer",
    company: "Netflix",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "The advanced algorithms course was exactly what I needed. Now I'm building scalable systems for millions of users at Netflix!",
    rating: 5,
    highlight: "Netflix Engineer"
  }
]

const TestimonialCard = ({ testimonial, className }) => {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-4 sm:p-6 lg:p-8 hover:border-white/20 transition-all duration-500 min-w-[280px] sm:min-w-[350px] lg:min-w-[400px] max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] flex-shrink-0",
        className
      )}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Quote icon */}
      <Quote className="absolute top-4 sm:top-6 right-4 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 text-blue-400/20 group-hover:text-blue-400/40 transition-all duration-300" />
      
      <div className="relative z-10">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3 sm:mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* Content */}
        <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 group-hover:text-white transition-colors duration-300 line-clamp-4">
          "{testimonial.content}"
        </p>

        {/* Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/20"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-semibold text-sm sm:text-base lg:text-lg group-hover:text-blue-200 transition-colors duration-300 truncate">
              {testimonial.name}
            </h4>
            <p className="text-white/60 text-xs sm:text-sm truncate">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>

        {/* Highlight badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-2 sm:px-3 py-1"
        >
          <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3 text-green-400" />
          <span className="text-green-400 text-xs font-medium">
            {testimonial.highlight}
          </span>
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
    </motion.div>
  )
}

const InfiniteMovingCards = ({ items, direction = "left", speed = "slow" }) => {
  const containerRef = useRef(null)
  const scrollerRef = useRef(null)
  const [start, setStart] = useState(false)

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        scrollerRef.current.appendChild(duplicatedItem)
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  useEffect(() => {
    addAnimation()
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        "sm:[mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        start && "animate-scroll"
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-3 sm:gap-4 lg:gap-6 py-4 w-max flex-nowrap",
          start && "animate-scroll"
        )}
      >
        {items.map((item, idx) => (
          <TestimonialCard key={idx} testimonial={item} />
        ))}
      </ul>
    </div>
  )
}

const Testimonials = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
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
            className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-purple-400 text-xs sm:text-sm font-medium">Student Success Stories</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-300">
            Transforming{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
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
              Careers Worldwide
            </motion.span>
          </h2>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto px-4">
            Join thousands of professionals who've accelerated their careers with SkillVulture
          </p>
        </motion.div>

        {/* Infinite Moving Cards */}
        <div className="relative mb-12 sm:mb-16 lg:mb-20">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 border-t border-white/10"
        >
          {[
            { number: "98%", label: "Success Rate", icon: Star },
            { number: "50K+", label: "Alumni", icon: User },
            { number: "4.9/5", label: "Average Rating", icon: Heart },
            { number: "500+", label: "Companies", icon: TrendingUp }
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
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-400" />
              </motion.div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-purple-200 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-white/60 text-xs sm:text-sm lg:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - 1rem));
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 80s) var(--animation-direction, forwards) linear infinite;
        }
      `}</style>
    </section>
  )
}

export default Testimonials

