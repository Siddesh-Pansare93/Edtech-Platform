import React, { useId } from 'react'

const Input  = React.forwardRef(function({
    type = 'text',
    label,
    className,
    ...props

}, ref) {

    const id = useId()
    return (
        <div className='flex flex-col mb-4 w-full'>
            {label && <label className='inline-block pl-1 mb-1 text-black dark:text-yellow-500 font-semibold' htmlFor={id} >
                {label}
            </label>}

            <input
                id={id}
                ref={ref}
                type={type}
                className={`w-full p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-yellow-500 dark:focus:border-yellow-500 focus:border-primary-500 ${className}`}
                {...props}
            />
        </div>

    )
}
)
export default Input