import React from 'react';
import { motion } from 'framer-motion'; // Import framer motion
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Home() {
  // Typewriter effect configuration
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 2, delayChildren: 0.5, staggerChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <React.Fragment>
      
      <div className="home-container  flex flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 h-screen">    
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 max-w-7xl">
          {/* Left Side - Text and Button */}
          <div className="flex flex-col items-start justify-start gap-y-10 w-full lg:w-1/2">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left leading-tight tracking-wider" 
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {"Empower Your Future with Coding Skills".split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <p className="text-base sm:text-lg md:text-xl text-center lg:text-left">
              We are here to help you learn to code and get a job in tech, no matter your background or experience level.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="bg-blue-500 dark:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg shadow-lg hover:scale-110 transition duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Lottie Animation */}
          
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
