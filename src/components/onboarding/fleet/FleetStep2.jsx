import React, { useState, useEffect } from 'react';
import { useSubmitFleetComplianceMutation, useGetFleetDetailsQuery } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormCheckbox from '../../common/FormCheckbox';

const FleetStep2 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    driverVerifyProcess: initialData?.driverVerifyProcess || '',
    frscCompStatus: initialData?.frscCompStatus || '',
    vehicleInsureProvider: initialData?.vehicleInsureProvider || '',
    gpsInstalled: initialData?.gpsInstalled || '',
    elockInstalled: initialData?.elockInstalled || '',
    isWillingInstall: initialData?.isWillingInstall || false,
  });

  const [errors, setErrors] = useState({});
  const [submitFleetCompliance, { isLoading }] = useSubmitFleetComplianceMutation();
  const { showSuccess, showError } = useAlert();

  // Fetch existing fleet data for prefilling
  const { data: fleetData, isLoading: isLoadingFleetData } = useGetFleetDetailsQuery();

  // Prefill form when data is loaded
  useEffect(() => {
    if (fleetData?.data) {
      const data = fleetData.data;
      setFormData({
        driverVerifyProcess: data.driverVerifyProcess || '',
        frscCompStatus: data.frscCompStatus || '',
        vehicleInsureProvider: data.vehicleInsureProvider || '',
        gpsInstalled: data.gpsInstalled || '',
        elockInstalled: data.elockInstalled || '',
        isWillingInstall: data.isWillingInstall || false,
      });
    }
  }, [fleetData]);

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

    if (!formData.driverVerifyProcess) {
      newErrors.driverVerifyProcess = 'Please indicate driver verification process';
    }

    if (!formData.frscCompStatus) {
      newErrors.frscCompStatus = 'Please select FRSC compliance status';
    }

    if (!formData.gpsInstalled) {
      newErrors.gpsInstalled = 'Please indicate GPS installation status';
    }

    if (!formData.elockInstalled) {
      newErrors.elockInstalled = 'Please indicate E-lock installation status';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        await submitFleetCompliance(formData).unwrap();
        showSuccess('Fleet compliance saved successfully!');
        onNext(formData);
      } catch (error) {
        showError(error?.data?.message || 'Failed to save fleet compliance');
        console.error('Fleet compliance submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  if (isLoadingFleetData) {
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
            id="driverVerifyProcess"
            name="driverVerifyProcess"
            value={formData.driverVerifyProcess}
            onChange={handleChange}
            error={errors.driverVerifyProcess}
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
            id="frscCompStatus"
            name="frscCompStatus"
            value={formData.frscCompStatus}
            onChange={handleChange}
            error={errors.frscCompStatus}
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
            id="vehicleInsureProvider"
            name="vehicleInsureProvider"
            value={formData.vehicleInsureProvider}
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
            id="gpsInstalled"
            name="gpsInstalled"
            value={formData.gpsInstalled}
            onChange={handleChange}
            error={errors.gpsInstalled}
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
            id="elockInstalled"
            name="elockInstalled"
            value={formData.elockInstalled}
            onChange={handleChange}
            error={errors.elockInstalled}
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
              id="isWillingInstall"
              name="isWillingInstall"
              checked={formData.isWillingInstall}
              onChange={handleChange}
            />
          </div>
        </div>

        {formData.isWillingInstall && (
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
            disabled={isLoading}
            className="flex-1 py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FleetStep2;
