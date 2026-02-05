import React, { useState } from 'react';
import FormSelect from '../../common/FormSelect';
import FormInput from '../../common/FormInput';
import FormMultiSelect from '../../common/FormMultiSelect';

const ShipperStep1 = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    businessType: initialData?.businessType || '',
    productCategories: initialData?.productCategories || '',
    hsCode: initialData?.hsCode || '',
    averageMonthlyContainers: initialData?.averageMonthlyContainers || '',
    primaryPorts: initialData?.primaryPorts || [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.businessType) {
      newErrors.businessType = 'Please select business type';
    }

    if (!formData.productCategories.trim()) {
      newErrors.productCategories = 'Product categories are required';
    }

    if (!formData.averageMonthlyContainers) {
      newErrors.averageMonthlyContainers = 'Please select average monthly containers';
    }

    if (formData.primaryPorts.length === 0) {
      newErrors.primaryPorts = 'Please select at least one primary port';
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

  const portsOptions = [
    { value: 'apapa_port', label: 'Lagos Port Complex (Apapa Port)' },
    { value: 'tin_can', label: 'Tin Can Island Port Complex (Lagos)' },
    { value: 'lekki_port', label: 'Lekki Deep Seaport (Lagos)' },
    { value: 'onne_port', label: 'Onne Port (Rivers State)' },
    { value: 'port_harcourt', label: 'Port of Port Harcourt / Rivers Port Complex (Rivers State)' },
    { value: 'delta_port', label: 'Delta Port Complex (Warri) (Delta State)' },
    { value: 'calabar_port', label: 'Calabar Port Complex (Cross River State)' },
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Business Classification</h2>
        <p className="mt-1 text-sm text-gray-600">
          Tell us about your shipping business operations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSelect
          label="Business Type"
          id="businessType"
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          error={errors.businessType}
          options={[
            { value: '', label: 'Select business type' },
            { value: 'importer', label: 'Importer' },
            { value: 'exporter', label: 'Exporter' },
            { value: 'both', label: 'Both (Importer & Exporter)' },
          ]}
          required
        />

        <FormInput
          label="Product Categories"
          id="productCategories"
          name="productCategories"
          value={formData.productCategories}
          onChange={handleChange}
          error={errors.productCategories}
          placeholder="e.g., Electronics, Textiles, Food Products"
          required
        />

        <FormInput
          label="HS Code (Optional)"
          id="hsCode"
          name="hsCode"
          value={formData.hsCode}
          onChange={handleChange}
          placeholder="e.g., 8471.30, 6204.42"
          description="Harmonized System code for product classification"
        />

        <FormSelect
          label="Average Monthly Containers"
          id="averageMonthlyContainers"
          name="averageMonthlyContainers"
          value={formData.averageMonthlyContainers}
          onChange={handleChange}
          error={errors.averageMonthlyContainers}
          options={[
            { value: '', label: 'Select average monthly containers' },
            { value: '1-5', label: '1-5 containers' },
            { value: '6-10', label: '6-10 containers' },
            { value: '11-20', label: '11-20 containers' },
            { value: '21-50', label: '21-50 containers' },
            { value: '51-100', label: '51-100 containers' },
            { value: '100+', label: 'More than 100 containers' },
          ]}
          required
        />

        <FormMultiSelect
          label="Primary Ports Used"
          id="primaryPorts"
          name="primaryPorts"
          options={portsOptions}
          selectedValues={formData.primaryPorts}
          onChange={handleChange}
          error={errors.primaryPorts}
          description="Select all ports you primarily use (multi-select allowed)"
          required
        />

        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShipperStep1;
