import React, { useState, useEffect } from 'react';
import { useSubmitShipperBusinessMutation, useGetShipperDetailsQuery } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';
import FormSelect from '../../common/FormSelect';
import FormInput from '../../common/FormInput';
import FormMultiSelect from '../../common/FormMultiSelect';

const ShipperStep1 = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    businessType: initialData?.businessType || '',
    businessProductCategory: initialData?.businessProductCategory || '',
    businessHsCode: initialData?.businessHsCode || '',
    businessAvgMonthlyContainer: initialData?.businessAvgMonthlyContainer || '',
    businessPrimaryPorts: initialData?.businessPrimaryPorts || [],
  });

  const [errors, setErrors] = useState({});
  const [submitShipperBusiness, { isLoading }] = useSubmitShipperBusinessMutation();
  const { showSuccess, showError } = useAlert();

  // Fetch existing shipper data for prefilling
  const { data: shipperData, isLoading: isLoadingShipperData } = useGetShipperDetailsQuery();

  // Prefill form when data is loaded
  useEffect(() => {
    if (shipperData?.data) {
      const data = shipperData.data;
      setFormData({
        businessType: data.businessType || '',
        businessProductCategory: data.businessProductCategory || '',
        businessHsCode: data.businessHsCode || '',
        businessAvgMonthlyContainer: data.businessAvgMonthlyContainer || '',
        businessPrimaryPorts: data.businessPrimaryPorts || [],
      });
    }
  }, [shipperData]);

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

    if (!formData.businessProductCategory.trim()) {
      newErrors.businessProductCategory = 'Product categories are required';
    }

    if (!formData.businessAvgMonthlyContainer) {
      newErrors.businessAvgMonthlyContainer = 'Please select average monthly containers';
    }

    if (formData.businessPrimaryPorts.length === 0) {
      newErrors.businessPrimaryPorts = 'Please select at least one primary port';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        // Check if business data already exists to determine POST or PUT
        const isUpdate = !!shipperData?.data;

        await submitShipperBusiness({ data: formData, isUpdate }).unwrap();
        showSuccess('Business classification saved successfully!');
        onNext(formData);
      } catch (error) {
        showError(error?.data?.message || 'Failed to save business classification');
        console.error('Shipper business submission error:', error);
      }
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

  if (isLoadingShipperData) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-secondary mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-sm text-gray-600">Loading your information...</p>
        </div>
      </div>
    );
  }

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
          id="businessProductCategory"
          name="businessProductCategory"
          value={formData.businessProductCategory}
          onChange={handleChange}
          error={errors.businessProductCategory}
          placeholder="e.g., Electronics, Textiles, Food Products"
          required
        />

        <FormInput
          label="HS Code (Optional)"
          id="businessHsCode"
          name="businessHsCode"
          value={formData.businessHsCode}
          onChange={handleChange}
          placeholder="e.g., 8471.30, 6204.42"
          description="Harmonized System code for product classification"
        />

        <FormSelect
          label="Average Monthly Containers"
          id="businessAvgMonthlyContainer"
          name="businessAvgMonthlyContainer"
          value={formData.businessAvgMonthlyContainer}
          onChange={handleChange}
          error={errors.businessAvgMonthlyContainer}
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
          id="businessPrimaryPorts"
          name="businessPrimaryPorts"
          options={portsOptions}
          selectedValues={formData.businessPrimaryPorts}
          onChange={handleChange}
          error={errors.businessPrimaryPorts}
          description="Select all ports you primarily use (multi-select allowed)"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default ShipperStep1;
