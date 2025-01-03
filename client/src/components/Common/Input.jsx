import React, { useId } from 'react'
import { motion } from 'framer-motion'

const Input = React.forwardRef(function ({
  type = 'text',
  label,
  className,
  ...props
}, ref) {

  const id = useId()

  return (
    <div className='flex flex-col mb-4 w-full'>
      {label && (
        <label
          className='inline-block pl-1 mb-1 text-black dark:text-yellow-500 font-semibold'
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <motion.input
        id={id}
        ref={ref}
        type={type}
        className={`w-full p-3 placeholder:font-bold shadow-sm shadow-slate-200 border-gray-300 rounded-md text-black dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 focus:border-blue-500 ${className}`}
        
        initial={{ scale: 1 }}
        whileFocus={{ scale: 1.02 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        {...props}
      />
    </div>
  )
})

export default Input
