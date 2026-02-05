import React, { useState, useEffect } from 'react';
import { useGetInsuranceDetailsQuery, useSubmitInsuranceLicenseMutation } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';
import FormInput from '../../common/FormInput';
import FormMultiSelect from '../../common/FormMultiSelect';

const InsuranceStep1 = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    insuranceLicenseNumber: initialData?.insuranceLicenseNumber || '',
    classOfInsurance: initialData?.classOfInsurance || [],
    reinsurancePartners: initialData?.reinsurancePartners || [],
    naicomReportingCode: initialData?.naicomReportingCode || '',
  });

  const [errors, setErrors] = useState({});
  const { data: insuranceData, isLoading: isFetching } = useGetInsuranceDetailsQuery();
  const [submitInsuranceLicense, { isLoading: isSubmitting }] = useSubmitInsuranceLicenseMutation();
  const { showSuccess, showError } = useAlert();

  // Prefill form with existing data from API
  useEffect(() => {
    if (insuranceData?.data) {
      setFormData({
        insuranceLicenseNumber: insuranceData.data.license || '',
        classOfInsurance: insuranceData.data.insuranceClasses || [],
        reinsurancePartners: insuranceData.data.reinsurancePartner || [],
        naicomReportingCode: insuranceData.data.naicomCode || '',
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

    if (!formData.insuranceLicenseNumber.trim()) {
      newErrors.insuranceLicenseNumber = 'Insurance license number is required';
    }

    if (formData.classOfInsurance.length === 0) {
      newErrors.classOfInsurance = 'Please select at least one class of insurance';
    }

    if (!formData.naicomReportingCode.trim()) {
      newErrors.naicomReportingCode = 'NAICOM reporting code is required';
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
          licenseNumber: formData.insuranceLicenseNumber,
          insuranceClasses: formData.classOfInsurance,
          reinsurancePartner: formData.reinsurancePartners,
          naicomCode: formData.naicomReportingCode,
        };

        // Determine if this is an update (data exists) or first-time submission
        const isUpdate = !!insuranceData?.data?.license;

        // Submit to API with appropriate method
        await submitInsuranceLicense({ data: payload, isUpdate }).unwrap();

        // Show success message
        showSuccess('License and classification details saved successfully!');

        // Pass data to parent and move to next step
        onNext(formData);
      } catch (error) {
        // Handle API errors
        showError(error?.data?.message || 'Failed to save license details. Please try again.');
        console.error('Insurance license submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const classOfInsuranceOptions = [
    { value: 'marine_cargo', label: 'Marine Cargo', description: 'Insurance for goods in transit by sea' },
    { value: 'inland_transit', label: 'Inland Transit', description: 'Insurance for goods in transit by land' },
    { value: 'fleet', label: 'Fleet', description: 'Insurance for vehicle fleets' },
  ];

  const reinsurancePartnerOptions = [
    { value: 'africa_re', label: 'African Reinsurance Corporation (Africa Re)' },
    { value: 'continental_re', label: 'Continental Reinsurance Plc' },
    { value: 'fbs_re', label: 'FBS Reinsurance Limited (FBSRE)' },
    { value: 'nigeria_re', label: 'Nigerian Reinsurance Corporation (Nigeria Re)' },
    { value: 'waica_re', label: 'WAICA Reinsurance Corporation' },
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Insurance License & Classification</h2>
        <p className="mt-1 text-sm text-gray-600">
          Provide your insurance company's licensing and classification details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Insurance License Number"
          id="insuranceLicenseNumber"
          name="insuranceLicenseNumber"
          value={formData.insuranceLicenseNumber}
          onChange={handleChange}
          error={errors.insuranceLicenseNumber}
          placeholder="e.g., INS/2024/12345"
          required
        />

        <FormMultiSelect
          label="Class of Insurance"
          id="classOfInsurance"
          name="classOfInsurance"
          options={classOfInsuranceOptions}
          selectedValues={formData.classOfInsurance}
          onChange={handleChange}
          error={errors.classOfInsurance}
          description="Select all types of insurance your company provides (multi-select allowed)"
          required
        />

        <FormMultiSelect
          label="Reinsurance Partner(s)"
          id="reinsurancePartners"
          name="reinsurancePartners"
          options={reinsurancePartnerOptions}
          selectedValues={formData.reinsurancePartners}
          onChange={handleChange}
          description="Select your reinsurance partners (optional, multi-select allowed)"
        />

        <FormInput
          label="NAICOM Reporting Code"
          id="naicomReportingCode"
          name="naicomReportingCode"
          value={formData.naicomReportingCode}
          onChange={handleChange}
          error={errors.naicomReportingCode}
          placeholder="e.g., NAIC-2024-001"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting || isFetching}
          className="w-full py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? 'Loading...' : isSubmitting ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default InsuranceStep1;
