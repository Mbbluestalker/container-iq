import React from 'react';

const FormSelect = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-status-danger">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-gray-900 transition-all duration-200"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-status-danger font-medium">{error}</p>}
    </div>
  );
};

export default FormSelect;
