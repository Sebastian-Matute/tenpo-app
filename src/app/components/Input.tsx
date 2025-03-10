import React, { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
}

export default function Input({
  label,
  type,
  id,
  required = false,
  disabled = false,
  placeholder = "",
  error,
  className,
  ...rest
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          error ? "border-red-500 dark:border-red-400" : ""
        } ${className || ""}`}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
}
