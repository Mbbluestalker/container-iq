import React, { useState } from 'react';
import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import FormCheckbox from '../common/FormCheckbox';

const SignupStep4 = ({ onSubmit, onBack, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    legalEntityName: initialData?.legalEntityName || '',
    registeredBusinessName: initialData?.registeredBusinessName || '',
    cacRegistrationNumber: initialData?.cacRegistrationNumber || '',
    yearOfIncorporation: initialData?.yearOfIncorporation || '',
    businessAddressHq: initialData?.businessAddressHq || '',
    operationalAddresses: initialData?.operationalAddresses || [''],
    countryOfOperation: initialData?.countryOfOperation || 'Nigeria',
    taxIdentificationNumber: initialData?.taxIdentificationNumber || '',
    acceptTermsOfService: initialData?.acceptTermsOfService || false,
    acceptDataSharingConsent: initialData?.acceptDataSharingConsent || false,
    acceptNiiraCompliance: initialData?.acceptNiiraCompliance || false,
    digitalSignatureName: initialData?.digitalSignatureName || '',
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

  const handleOperationalAddressChange = (index, value) => {
    const newAddresses = [...formData.operationalAddresses];
    newAddresses[index] = value;
    setFormData((prev) => ({ ...prev, operationalAddresses: newAddresses }));
  };

  const addOperationalAddress = () => {
    setFormData((prev) => ({
      ...prev,
      operationalAddresses: [...prev.operationalAddresses, ''],
    }));
  };

  const removeOperationalAddress = (index) => {
    if (formData.operationalAddresses.length > 1) {
      const newAddresses = formData.operationalAddresses.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, operationalAddresses: newAddresses }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.legalEntityName.trim()) {
      newErrors.legalEntityName = 'Legal entity name is required';
    }

    if (!formData.cacRegistrationNumber.trim()) {
      newErrors.cacRegistrationNumber = 'CAC registration number is required';
    }

    if (!formData.yearOfIncorporation) {
      newErrors.yearOfIncorporation = 'Year of incorporation is required';
    } else {
      const year = parseInt(formData.yearOfIncorporation);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear) {
        newErrors.yearOfIncorporation = `Year must be between 1900 and ${currentYear}`;
      }
    }

    if (!formData.businessAddressHq.trim()) {
      newErrors.businessAddressHq = 'Business HQ address is required';
    }

    if (!formData.taxIdentificationNumber.trim()) {
      newErrors.taxIdentificationNumber = 'Tax identification number is required';
    }

    if (!formData.acceptTermsOfService) {
      newErrors.acceptTermsOfService = 'You must accept the Terms of Service';
    }

    if (!formData.acceptDataSharingConsent) {
      newErrors.acceptDataSharingConsent = 'You must accept the Data Sharing Consent';
    }

    if (!formData.acceptNiiraCompliance) {
      newErrors.acceptNiiraCompliance = 'You must accept the NIIRA Compliance';
    }

    if (!formData.digitalSignatureName.trim()) {
      newErrors.digitalSignatureName = 'Digital signature is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      const cleanedData = {
        ...formData,
        yearOfIncorporation: parseInt(formData.yearOfIncorporation),
        operationalAddresses: formData.operationalAddresses.filter((addr) => addr.trim() !== ''),
      };
      onSubmit(cleanedData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Organization Details</h2>
        <p className="mt-1 text-sm text-gray-600">
          Complete your company information and legal requirements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Details */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Company Information
          </h3>

          <FormInput
            label="Legal Entity Name"
            id="legalEntityName"
            name="legalEntityName"
            value={formData.legalEntityName}
            onChange={handleChange}
            error={errors.legalEntityName}
            required
          />

          <FormInput
            label="Registered Business Name (if different)"
            id="registeredBusinessName"
            name="registeredBusinessName"
            value={formData.registeredBusinessName}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="CAC Registration Number"
              id="cacRegistrationNumber"
              name="cacRegistrationNumber"
              value={formData.cacRegistrationNumber}
              onChange={handleChange}
              error={errors.cacRegistrationNumber}
              required
            />

            <FormInput
              label="Year of Incorporation"
              id="yearOfIncorporation"
              name="yearOfIncorporation"
              type="number"
              value={formData.yearOfIncorporation}
              onChange={handleChange}
              error={errors.yearOfIncorporation}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <FormTextarea
            label="Business Address (HQ)"
            id="businessAddressHq"
            name="businessAddressHq"
            value={formData.businessAddressHq}
            onChange={handleChange}
            error={errors.businessAddressHq}
            rows={3}
            required
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Operational Address(es)
            </label>
            {formData.operationalAddresses.map((address, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => handleOperationalAddressChange(index, e.target.value)}
                  placeholder={`Operational address ${index + 1}`}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary bg-white text-gray-900 placeholder-gray-400 transition-all"
                />
                {formData.operationalAddresses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOperationalAddress(index)}
                    className="px-4 py-2 bg-red-50 text-status-danger rounded-lg hover:bg-red-100 transition-colors cursor-pointer font-medium border border-red-200"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOperationalAddress}
              className="mt-2 text-sm text-secondary hover:text-secondary/90 transition-colors cursor-pointer font-semibold flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add another operational address
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Country of Operation"
              id="countryOfOperation"
              name="countryOfOperation"
              value={formData.countryOfOperation}
              onChange={handleChange}
            />

            <FormInput
              label="Tax Identification Number (TIN)"
              id="taxIdentificationNumber"
              name="taxIdentificationNumber"
              value={formData.taxIdentificationNumber}
              onChange={handleChange}
              error={errors.taxIdentificationNumber}
              required
            />
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="space-y-3 border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Legal & Compliance
          </h3>

          <div className="space-y-3">
            <FormCheckbox
              label="Accept ContainerIQ Terms of Service"
              description="By accepting, you agree to use ContainerIQ in line with its terms, including data use, telematics consent, role-based access, and compliance with applicable insurance and transport regulations."
              id="acceptTermsOfService"
              name="acceptTermsOfService"
              checked={formData.acceptTermsOfService}
              onChange={handleChange}
              error={errors.acceptTermsOfService}
              required
            />

            <FormCheckbox
              label="Accept Data Sharing & Telematics Consent"
              description="This allows ContainerIQ to collect and share tracking and operational data strictly for risk assessment, claims processing, compliance, and platform services, in line with role-based access controls."
              id="acceptDataSharingConsent"
              name="acceptDataSharingConsent"
              checked={formData.acceptDataSharingConsent}
              onChange={handleChange}
              error={errors.acceptDataSharingConsent}
              required
            />

            <FormCheckbox
              label="Accept NIIRA / Insurance & Transport Compliance Framework"
              description="By accepting, you confirm that your operations will follow the NIIRA Act 2025 and all applicable insurance and transport compliance rules, including proper documentation, reporting, and risk management, while using ContainerIQ."
              id="acceptNiiraCompliance"
              name="acceptNiiraCompliance"
              checked={formData.acceptNiiraCompliance}
              onChange={handleChange}
              error={errors.acceptNiiraCompliance}
              required
            />
          </div>

          <div>
            <FormInput
              label="Digital Signature (Full Name)"
              id="digitalSignatureName"
              name="digitalSignatureName"
              value={formData.digitalSignatureName}
              onChange={handleChange}
              error={errors.digitalSignatureName}
              placeholder="Type your full name to sign"
              required
            />
            <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Signed on: {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20"
          >
            {isLoading ? 'Submitting...' : 'Complete Registration'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupStep4;
