import React, { useId, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, error, options, ...props }, ref) => {
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

        <select
          id={id}
          ref={ref}
          className={cn(
            "w-full p-3 shadow-sm shadow-slate-200 border-gray-300 rounded-md text-black dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 focus:border-blue-500",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {error && (
          <p className="mt-1 text-sm text-red-500 pl-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
