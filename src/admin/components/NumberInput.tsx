import { forwardRef, type InputHTMLAttributes } from "react";

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  validationError?: string;
  required?: boolean;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ label, validationError, required, className, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <input
          ref={ref}
          type="number"
          className={`mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            validationError ? 'border-red-500 focus:ring-red-500' : ''
          } ${className || ''}`}
          {...props}
        />
        {validationError && (
          <span className="text-red-500 text-sm mt-1 block">{validationError}</span>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
