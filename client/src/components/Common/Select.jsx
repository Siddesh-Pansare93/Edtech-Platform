
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
            className={`w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 focus:border-primary-500 ${className}`}
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