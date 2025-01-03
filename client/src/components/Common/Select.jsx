
import React , {useId } from 'react'

const Select = ({
    label , 
    options , 
    className , 
    ...props
} , ref ) => {
    const id = useId()
  return (
    <div className='flex flex-col mb-4 w-full'>
        {label && <label className='inline-block pl-1 mb-1 text-black dark:text-yellow-500 font-semibold' htmlFor={id}>
            {label}
        </label>}

        <select
            ref={ref}
            className={`w-full p-3 placeholder:font-bold shadow-sm shadow-slate-200 border-gray-300 rounded-md text-black dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 focus:border-blue-500 ${className}`}

            {...props}
        >
            {options.map((option) => (
                <option key={option} value={option} >
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)