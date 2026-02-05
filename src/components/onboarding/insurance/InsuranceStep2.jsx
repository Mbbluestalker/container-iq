import React, { useState, useEffect } from 'react';
import { useGetInsuranceDetailsQuery, useSubmitInsuranceCoverageMutation } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';
import FormSelect from '../../common/FormSelect';
import FormMultiSelect from '../../common/FormMultiSelect';
import FormTextarea from '../../common/FormTextarea';

const InsuranceStep2 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    coverageGeographyType: initialData?.coverageGeographyType || '',
    selectedPorts: initialData?.selectedPorts || [],
    selectedStates: initialData?.selectedStates || [],
    corridorDetails: initialData?.corridorDetails || '',
    internationalCoverage: initialData?.internationalCoverage || '',
    otherDetails: initialData?.otherDetails || '',
  });

  const [errors, setErrors] = useState({});
  const { data: insuranceData, isLoading: isFetching } = useGetInsuranceDetailsQuery();
  const [submitInsuranceCoverage, { isLoading: isSubmitting }] = useSubmitInsuranceCoverageMutation();
  const { showSuccess, showError } = useAlert();

  // Prefill form with existing data from API
  useEffect(() => {
    if (insuranceData?.data) {
      setFormData({
        coverageGeographyType: insuranceData.data.coverageGeoType || '',
        selectedPorts: insuranceData.data.coveragePorts || [],
        selectedStates: insuranceData.data.coverageStateRegion || [],
        corridorDetails: insuranceData.data.coverageCoridorDetails || '',
        internationalCoverage: insuranceData.data.coverageInternationalDetails || '',
        otherDetails: insuranceData.data.coverageOtherDetails || '',
      });
    }
  }, [insuranceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.coverageGeographyType) {
      newErrors.coverageGeographyType = 'Please select coverage geography type';
    }

    if (formData.coverageGeographyType === 'ports' && formData.selectedPorts.length === 0) {
      newErrors.selectedPorts = 'Please select at least one port';
    }

    if (formData.coverageGeographyType === 'state_regional' && formData.selectedStates.length === 0) {
      newErrors.selectedStates = 'Please select at least one state';
    }

    if (formData.coverageGeographyType === 'corridors' && !formData.corridorDetails.trim()) {
      newErrors.corridorDetails = 'Please specify corridor/trade route details';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        // Transform form data to match API payload structure
        const payload = {
          coverageGeoType: formData.coverageGeographyType,
          coveragePorts: formData.selectedPorts,
          coverageCoridorDetails: formData.corridorDetails,
          coverageStateRegion: formData.selectedStates,
          coverageInternationalDetails: formData.internationalCoverage,
          coverageOtherDetails: formData.otherDetails,
        };

        // Submit to API
        await submitInsuranceCoverage(payload).unwrap();

        // Show success message
        showSuccess('Coverage geography details saved successfully!');

        // Pass data to parent and move to next step
        onNext(formData);
      } catch (error) {
        // Handle API errors
        showError(error?.data?.message || 'Failed to save coverage details. Please try again.');
        console.error('Insurance coverage submission error:', error);
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

  const statesOptions = [
    { value: 'lagos', label: 'Lagos State' },
    { value: 'rivers', label: 'Rivers State' },
    { value: 'delta', label: 'Delta State' },
    { value: 'cross_river', label: 'Cross River State' },
    { value: 'akwa_ibom', label: 'Akwa Ibom State' },
    { value: 'ogun', label: 'Ogun State' },
    { value: 'oyo', label: 'Oyo State' },
    { value: 'kano', label: 'Kano State' },
    { value: 'abuja', label: 'FCT Abuja' },
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Operational Scope & Coverage Geography</h2>
        <p className="mt-1 text-sm text-gray-600">
          Define your coverage areas and operational scope
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSelect
          label="Coverage Geography Type"
          id="coverageGeographyType"
          name="coverageGeographyType"
          value={formData.coverageGeographyType}
          onChange={handleChange}
          error={errors.coverageGeographyType}
          options={[
            { value: '', label: 'Select coverage type' },
            { value: 'ports', label: 'Ports Only' },
            { value: 'corridors', label: 'Corridors / Trade Routes' },
            { value: 'nationwide', label: 'Nationwide' },
            { value: 'state_regional', label: 'State / Regional' },
            { value: 'city_local', label: 'City / Local' },
            { value: 'international', label: 'International / Cross-Border' },
            { value: 'other', label: 'Other (specify)' },
          ]}
          required
        />

        {/* Conditional fields based on coverage type */}
        {formData.coverageGeographyType === 'ports' && (
          <FormMultiSelect
            label="Select Ports"
            id="selectedPorts"
            name="selectedPorts"
            options={portsOptions}
            selectedValues={formData.selectedPorts}
            onChange={handleChange}
            error={errors.selectedPorts}
            description="Select all ports you provide coverage for"
            required
          />
        )}

        {formData.coverageGeographyType === 'corridors' && (
          <FormTextarea
            label="Corridor / Trade Route Details"
            id="corridorDetails"
            name="corridorDetails"
            value={formData.corridorDetails}
            onChange={handleChange}
            error={errors.corridorDetails}
            placeholder="Example: Apapa Port → Ikeja → Ota → Onne Terminal"
            rows={4}
            required
          />
        )}

        {formData.coverageGeographyType === 'state_regional' && (
          <FormMultiSelect
            label="Select States/Regions"
            id="selectedStates"
            name="selectedStates"
            options={statesOptions}
            selectedValues={formData.selectedStates}
            onChange={handleChange}
            error={errors.selectedStates}
            description="Select all states/regions you provide coverage for"
            required
          />
        )}

        {formData.coverageGeographyType === 'international' && (
          <FormTextarea
            label="International Coverage Details"
            id="internationalCoverage"
            name="internationalCoverage"
            value={formData.internationalCoverage}
            onChange={handleChange}
            placeholder="Specify countries and cross-border coverage areas (e.g., ECOWAS region, specific countries)"
            rows={4}
          />
        )}

        {formData.coverageGeographyType === 'nationwide' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-900">
                  Nationwide coverage selected - you provide insurance across all Nigerian states and territories.
                </p>
              </div>
            </div>
          </div>
        )}

        {formData.coverageGeographyType === 'other' && (
          <FormTextarea
            label="Other Coverage Details"
            id="otherDetails"
            name="otherDetails"
            value={formData.otherDetails}
            onChange={handleChange}
            placeholder="Please specify your coverage geography details"
            rows={4}
          />
        )}

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isFetching}
            className="flex-1 py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetching ? 'Loading...' : isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceStep2;
