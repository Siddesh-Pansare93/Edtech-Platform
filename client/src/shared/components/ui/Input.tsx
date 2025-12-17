import React, { useId, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', label, className, error, onDrag, onDragStart, onDragEnd, ...props }, ref) => {
    const id = useId();

    return (
      <div className='flex flex-col mb-4 w-full'>
        {label && (
          <label
            className='inline-block pl-1 mb-1 text-black dark:text-white font-semibold'
            htmlFor={id}
          >
            {label}
          </label>
        )}

        <motion.input
          id={id}
          ref={ref}
          type={type}
          className={cn(
            "w-full p-3 placeholder:font-bold shadow-sm shadow-slate-200 border-gray-300 rounded-md text-black dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 focus:border-blue-500",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          initial={{ scale: 1 }}
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          {...(props as any)}
        />
        
        {error && (
          <p className="mt-1 text-sm text-red-500 pl-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
