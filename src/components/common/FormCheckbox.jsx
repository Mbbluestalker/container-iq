import React from 'react';

const FormCheckbox = ({
  label,
  description,
  id,
  name,
  checked,
  onChange,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      <div className="flex items-start">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="mt-1 h-4 w-4 text-secondary border-gray-300 rounded focus:ring-secondary"
          {...props}
        />
        <label htmlFor={id} className="ml-3 text-sm text-gray-700">
          <span className="font-semibold">
            {label} {required && <span className="text-status-danger">*</span>}
          </span>
          {description && <p className="text-gray-600 mt-1 font-normal">{description}</p>}
        </label>
      </div>
      {error && <p className="ml-7 text-sm text-status-danger font-medium">{error}</p>}
    </div>
  );
};

export default FormCheckbox;
