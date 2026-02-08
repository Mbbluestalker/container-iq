import React, { useState } from 'react';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormCheckbox from '../../common/FormCheckbox';

const FleetStep2 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    hasDriverVerification: initialData?.hasDriverVerification || '',
    frscComplianceStatus: initialData?.frscComplianceStatus || '',
    vehicleInsuranceProvider: initialData?.vehicleInsuranceProvider || '',
    hasGpsInstalled: initialData?.hasGpsInstalled || '',
    hasElockInstalled: initialData?.hasElockInstalled || '',
    willingToInstallDevices: initialData?.willingToInstallDevices || false,
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

    if (!formData.hasDriverVerification) {
      newErrors.hasDriverVerification = 'Please indicate driver verification process';
    }

    if (!formData.frscComplianceStatus) {
      newErrors.frscComplianceStatus = 'Please select FRSC compliance status';
    }

    if (!formData.hasGpsInstalled) {
      newErrors.hasGpsInstalled = 'Please indicate GPS installation status';
    }

    if (!formData.hasElockInstalled) {
      newErrors.hasElockInstalled = 'Please indicate E-lock installation status';
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
        <h2 className="text-2xl font-bold text-gray-900">Driver & Asset Compliance</h2>
        <p className="mt-1 text-sm text-gray-600">
          Provide information about your compliance and telematics capabilities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Driver & Asset Compliance Section */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver & Asset Compliance</h3>
          </div>

          <FormSelect
            label="Driver Verification Process"
            id="hasDriverVerification"
            name="hasDriverVerification"
            value={formData.hasDriverVerification}
            onChange={handleChange}
            error={errors.hasDriverVerification}
            options={[
              { value: '', label: 'Select verification status' },
              { value: 'yes', label: 'Yes - We verify all drivers' },
              { value: 'no', label: 'No - No formal verification process' },
              { value: 'partial', label: 'Partial - Some drivers verified' },
            ]}
            required
          />

          <FormSelect
            label="FRSC Compliance Status"
            id="frscComplianceStatus"
            name="frscComplianceStatus"
            value={formData.frscComplianceStatus}
            onChange={handleChange}
            error={errors.frscComplianceStatus}
            options={[
              { value: '', label: 'Select compliance status' },
              { value: 'fully_compliant', label: 'Fully Compliant' },
              { value: 'partially_compliant', label: 'Partially Compliant' },
              { value: 'non_compliant', label: 'Non-Compliant' },
              { value: 'pending_compliance', label: 'Pending Compliance' },
            ]}
            required
          />

          <FormInput
            label="Vehicle Insurance Provider(s)"
            id="vehicleInsuranceProvider"
            name="vehicleInsuranceProvider"
            value={formData.vehicleInsuranceProvider}
            onChange={handleChange}
            placeholder="e.g., XYZ Insurance Company"
            description="Leave blank if you don't currently have vehicle insurance"
          />
        </div>

        {/* Telematics Capability Section */}
        <div className="space-y-6 pt-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Telematics Capability</h3>
          </div>

          <FormSelect
            label="GPS Installed"
            id="hasGpsInstalled"
            name="hasGpsInstalled"
            value={formData.hasGpsInstalled}
            onChange={handleChange}
            error={errors.hasGpsInstalled}
            options={[
              { value: '', label: 'Select GPS status' },
              { value: 'yes_all', label: 'Yes - All vehicles' },
              { value: 'yes_some', label: 'Yes - Some vehicles' },
              { value: 'no', label: 'No' },
            ]}
            required
          />

          <FormSelect
            label="E-Lock Installed"
            id="hasElockInstalled"
            name="hasElockInstalled"
            value={formData.hasElockInstalled}
            onChange={handleChange}
            error={errors.hasElockInstalled}
            options={[
              { value: '', label: 'Select E-lock status' },
              { value: 'yes_all', label: 'Yes - All vehicles' },
              { value: 'yes_some', label: 'Yes - Some vehicles' },
              { value: 'no', label: 'No' },
            ]}
            required
          />

          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <FormCheckbox
              label="Willing to install ContainerIQ-approved devices"
              description="Indicates your willingness to install GPS and E-lock devices approved by ContainerIQ for enhanced tracking, security, and compliance with platform requirements."
              id="willingToInstallDevices"
              name="willingToInstallDevices"
              checked={formData.willingToInstallDevices}
              onChange={handleChange}
            />
          </div>
        </div>

        {formData.willingToInstallDevices && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-green-900">Great Choice!</h4>
                <p className="text-sm text-green-800 mt-1">
                  Installing ContainerIQ-approved devices will enable real-time tracking, improve security, and help you qualify for premium shipments and better insurance rates.
                </p>
              </div>
            </div>
          </div>
        )}

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

export default FleetStep2;
