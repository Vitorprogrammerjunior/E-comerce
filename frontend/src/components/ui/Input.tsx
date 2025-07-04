'use client';

import { useState, forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { IMaskInput } from 'react-imask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  mask?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', type = 'text', mask, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <motion.div 
        className={`mb-4 ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-900 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {mask ? (
            <IMaskInput
              mask={mask}
              value={props.value as string}
              onAccept={(val: string) =>
                props.onChange &&
                props.onChange({ target: { name: props.name, value: val } } as React.ChangeEvent<HTMLInputElement>)
              }
              unmask={false}
              placeholder={props.placeholder}
              name={props.name}
              disabled={props.disabled}
              type={inputType}
              className={`
                w-full px-4 py-3 border-2 rounded-lg 
                text-gray-900 placeholder-gray-500 
                focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 
                transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.02]
                disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                ${error ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-gray-300'}
                ${isPassword ? 'pr-12' : ''}
              `}
            />
          ) : (
            <input
              ref={ref}
              type={inputType}
              className={`
                w-full px-4 py-3 border-2 rounded-lg 
                text-gray-900 placeholder-gray-500 
                focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 
                transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.02]
                disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                ${error ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-gray-300'}
                ${isPassword ? 'pr-12' : ''}
              `}
              {...props}
            />
          )}
          {isPassword && (
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </motion.button>
          )}
        </div>
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
