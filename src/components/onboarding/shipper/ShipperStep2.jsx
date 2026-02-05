import React, { useState } from 'react';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormCheckbox from '../../common/FormCheckbox';

const ShipperStep2 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    cargoInsuranceProvider: initialData?.cargoInsuranceProvider || '',
    preferredInsuranceMode: initialData?.preferredInsuranceMode || '',
    useContainerIQInsurers: initialData?.useContainerIQInsurers || false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.preferredInsuranceMode) {
      newErrors.preferredInsuranceMode = 'Please select preferred insurance mode';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Cargo & Insurance Profile</h2>
        <p className="mt-1 text-sm text-gray-600">
          Tell us about your cargo insurance preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Cargo Insurance Provider (if any)"
          id="cargoInsuranceProvider"
          name="cargoInsuranceProvider"
          value={formData.cargoInsuranceProvider}
          onChange={handleChange}
          placeholder="e.g., ABC Insurance Company"
          description="Leave blank if you don't currently have cargo insurance"
        />

        <FormSelect
          label="Preferred Insurance Mode"
          id="preferredInsuranceMode"
          name="preferredInsuranceMode"
          value={formData.preferredInsuranceMode}
          onChange={handleChange}
          error={errors.preferredInsuranceMode}
          options={[
            { value: '', label: 'Select insurance mode' },
            { value: 'annual_open_cover', label: 'Annual Open Cover' },
            { value: 'per_shipment', label: 'Per-Shipment' },
          ]}
          required
        />

        {formData.preferredInsuranceMode === 'annual_open_cover' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-blue-900">Annual Open Cover</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Annual coverage for multiple shipments under one policy. Best for regular shippers with consistent cargo volumes.
                </p>
              </div>
            </div>
          </div>
        )}

        {formData.preferredInsuranceMode === 'per_shipment' && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-purple-900">Per-Shipment Insurance</h4>
                <p className="text-sm text-purple-800 mt-1">
                  Insurance purchased for each individual shipment. Ideal for occasional shippers or those with varying cargo types.
                </p>
              </div>
            </div>
          </div>
        )}

        <FormCheckbox
          label="Willingness to use ContainerIQ-approved insurers"
          description="Indicates whether you are open to insuring your shipments through insurers vetted and approved on the ContainerIQ platform for faster coverage confirmation and smoother claims processing."
          id="useContainerIQInsurers"
          name="useContainerIQInsurers"
          checked={formData.useContainerIQInsurers}
          onChange={handleChange}
        />

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipperStep2;
