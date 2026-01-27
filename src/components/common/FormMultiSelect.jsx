import React from 'react';

const FormMultiSelect = ({
  label,
  id,
  name,
  options,
  selectedValues = [],
  onChange,
  error,
  required = false,
  className = '',
  description,
}) => {
  const handleCheckboxChange = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange({
      target: {
        name,
        value: newValues,
      },
    });
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-status-danger">*</span>}
      </label>
      {description && <p className="text-xs text-gray-600 mb-3">{description}</p>}

      <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="mt-1 h-4 w-4 text-secondary border-gray-300 rounded focus:ring-secondary cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">{option.label}</span>
              {option.description && (
                <p className="text-xs text-gray-600 mt-0.5">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>

      {selectedValues.length > 0 && (
        <p className="mt-2 text-xs text-gray-600">
          {selectedValues.length} selected
        </p>
      )}

      {error && <p className="mt-1.5 text-sm text-status-danger font-medium">{error}</p>}
    </div>
  );
};

export default FormMultiSelect;
