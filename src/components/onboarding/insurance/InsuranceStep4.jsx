import React, { useState, useEffect } from 'react';
import { useGetInsuranceDetailsQuery, useSubmitInsuranceClaimsMutation } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';
import FormSelect from '../../common/FormSelect';
import FormCheckbox from '../../common/FormCheckbox';
import FormTextarea from '../../common/FormTextarea';

const InsuranceStep4 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    claimsProcessingModel: initialData?.claimsProcessingModel || '',
    acceptTelematicsRiskScoring: initialData?.acceptTelematicsRiskScoring || false,
    acceptAutomatedClaimsEvidence: initialData?.acceptAutomatedClaimsEvidence || false,
    apiIntegrationMode: initialData?.apiIntegrationMode || '',
    claimContactProtocol: initialData?.claimContactProtocol || '',
  });

  const [errors, setErrors] = useState({});
  const { data: insuranceData, isLoading: isFetching } = useGetInsuranceDetailsQuery();
  const [submitInsuranceClaims, { isLoading: isSubmitting }] = useSubmitInsuranceClaimsMutation();
  const { showSuccess, showError } = useAlert();

  // Prefill form with existing data from API
  useEffect(() => {
    if (insuranceData?.data) {
      setFormData({
        claimsProcessingModel: insuranceData.data.claimsProcessModel || '',
        acceptTelematicsRiskScoring: insuranceData.data.acceptRiskScore || false,
        acceptAutomatedClaimsEvidence: insuranceData.data.acceptClaimsEvidence || false,
        apiIntegrationMode: insuranceData.data.apiMode || '',
        claimContactProtocol: insuranceData.data.claimContactProtocal || '',
      });
    }
  }, [insuranceData]);

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

    if (!formData.claimsProcessingModel) {
      newErrors.claimsProcessingModel = 'Please select claims processing model';
    }

    if (!formData.apiIntegrationMode) {
      newErrors.apiIntegrationMode = 'Please select API integration mode';
    }

    if (!formData.claimContactProtocol.trim()) {
      newErrors.claimContactProtocol = 'Claims contact protocol is required';
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
          claimsProcessModel: formData.claimsProcessingModel,
          acceptRiskScore: formData.acceptTelematicsRiskScoring,
          acceptClaimsEvidence: formData.acceptAutomatedClaimsEvidence,
          apiMode: formData.apiIntegrationMode,
          claimContactProtocal: formData.claimContactProtocol,
        };

        // Submit to API
        await submitInsuranceClaims(payload).unwrap();

        // Show success message
        showSuccess('Claims and integration settings saved successfully!');

        // Pass data to parent and move to next step
        onNext(formData);
      } catch (error) {
        // Handle API errors
        showError(error?.data?.message || 'Failed to save claims settings. Please try again.');
        console.error('Insurance claims submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Claims & Telematics Integration</h2>
        <p className="mt-1 text-sm text-gray-600">
          Configure your claims processing and telematics integration preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Claims Processing Model */}
        <FormSelect
          label="Claims Processing Model"
          id="claimsProcessingModel"
          name="claimsProcessingModel"
          value={formData.claimsProcessingModel}
          onChange={handleChange}
          error={errors.claimsProcessingModel}
          options={[
            { value: '', label: 'Select processing model' },
            { value: 'in_house', label: 'In-house' },
            { value: 'tpa', label: 'TPA (Third-Party Administrator)' },
          ]}
          required
        />

        {/* Telematics & Risk Integration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Telematics & Risk Integration
          </h3>

          <FormCheckbox
            label="Accept Telematics-Driven Risk Scoring"
            description="Allows ContainerIQ to use tracking and sensor data (such as location, route behaviour, and security events) to assess risk and generate safety and insurance risk scores."
            id="acceptTelematicsRiskScoring"
            name="acceptTelematicsRiskScoring"
            checked={formData.acceptTelematicsRiskScoring}
            onChange={handleChange}
          />

          <FormCheckbox
            label="Accept Automated Claims Evidence"
            description="Allows ContainerIQ to automatically capture and store tracking data, alerts, and incident logs as digital evidence to support insurance claims and reduce disputes."
            id="acceptAutomatedClaimsEvidence"
            name="acceptAutomatedClaimsEvidence"
            checked={formData.acceptAutomatedClaimsEvidence}
            onChange={handleChange}
          />
        </div>

        {/* API Integration Mode */}
        <FormSelect
          label="Preferred API Integration Mode"
          id="apiIntegrationMode"
          name="apiIntegrationMode"
          value={formData.apiIntegrationMode}
          onChange={handleChange}
          error={errors.apiIntegrationMode}
          options={[
            { value: '', label: 'Select integration mode' },
            { value: 'read_only', label: 'Read Only - Your systems can view ContainerIQ data' },
            { value: 'read_write', label: 'Read & Write - Full two-way integration' },
          ]}
          required
        />

        {/* Claims Contact Protocol */}
        <FormTextarea
          label="Claims Contact Protocol"
          id="claimContactProtocol"
          name="claimContactProtocol"
          value={formData.claimContactProtocol}
          onChange={handleChange}
          error={errors.claimContactProtocol}
          placeholder="Example:&#10;Incident Type: Cargo Theft&#10;- ContainerIQ auto-alert triggered&#10;- Notification sent to: claims@company.com&#10;- WhatsApp Hotline: +234 XXX XXX XXXX&#10;- Acknowledgement required within 30 minutes&#10;- Surveyor appointed within 4 hours&#10;- Regulator notified within 24 hours"
          rows={8}
          required
        />

        {formData.apiIntegrationMode === 'read_only' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-blue-900">Read Only Mode</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Your systems can securely view tracking data, risk scores, and evidence from ContainerIQ, but cannot send updates back.
                </p>
              </div>
            </div>
          </div>
        )}

        {formData.apiIntegrationMode === 'read_write' && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-purple-900">Read & Write Mode</h4>
                <p className="text-sm text-purple-800 mt-1">
                  Your systems can both access ContainerIQ data and send updates such as policy status, claims decisions, or settlement information for full automation.
                </p>
                <p className="text-xs text-purple-700 mt-2">
                  Note: Updates are applied according to agreed rules and audit controls.
                </p>
              </div>
            </div>
          </div>
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

export default InsuranceStep4;
