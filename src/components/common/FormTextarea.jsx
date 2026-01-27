import React from 'react';

const FormTextarea = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  rows = 3,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-status-danger">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`block w-full px-4 py-3 border ${
          error ? 'border-status-danger focus:ring-red-500' : 'border-gray-300 focus:ring-secondary'
        } rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 transition-all duration-200`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-status-danger font-medium">{error}</p>}
    </div>
  );
};

export default FormTextarea;
