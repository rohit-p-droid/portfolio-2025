import { useState, type KeyboardEvent } from "react";

interface TagsInputProps {
  label: string;
  value: string[]; // Array of tags
  onChange: (tags: string[]) => void;
  validationError?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const TagsInput = ({ 
  label, 
  value, 
  onChange, 
  validationError, 
  required, 
  placeholder = "Enter tag and press Enter or click Add",
  className 
}: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      onChange([...value, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      
      {/* Input and Add button */}
      <div className="flex space-x-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            validationError ? 'border-red-500 focus:ring-red-500' : ''
          }`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Add
        </button>
      </div>
      
      {/* Tags display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100"
                title="Remove tag"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
      
      {/* Validation error */}
      {validationError && (
        <span className="text-red-500 text-sm mt-1 block">{validationError}</span>
      )}
    </div>
  );
};

export default TagsInput;
