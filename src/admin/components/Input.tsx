import React, { useId, forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClass?: string;
    validationError?: string;
    required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    labelClass = "",
    type = "text",
    className = "",
    validationError = "",
    required = true,
    ...props
}, ref) => {
    const id = useId();
    return (
        <>
            <div>
                {label &&
                    <label htmlFor={id} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass}`}>
                        {label}&nbsp;{required && <span className='text-red-600'>*</span>}
                    </label>
                }
                <input
                    type={type}
                    id={id}
                    ref={ref}
                    className={`mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} ${validationError ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                    {...props}
                />
                {validationError && <span className='text-red-500'>{validationError}</span>}
            </div>
        </>
    )
});

Input.displayName = 'Input';

export default Input