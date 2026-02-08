import React, { useState, useEffect } from 'react';
import { useSubmitShipperConsentsMutation, useGetShipperDetailsQuery } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';
import FormCheckbox from '../../common/FormCheckbox';

const ShipperStep3 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    isConsentContainerTrack: initialData?.isConsentContainerTrack || false,
    isConsentRiskScore: initialData?.isConsentRiskScore || false,
    isConsentShareData: initialData?.isConsentShareData || false,
  });

  const [errors, setErrors] = useState({});
  const [submitShipperConsents, { isLoading }] = useSubmitShipperConsentsMutation();
  const { showSuccess, showError } = useAlert();

  // Fetch existing shipper data for prefilling
  const { data: shipperData, isLoading: isLoadingShipperData } = useGetShipperDetailsQuery();

  // Prefill form when data is loaded
  useEffect(() => {
    if (shipperData?.data) {
      const data = shipperData.data;
      setFormData({
        isConsentContainerTrack: data.isConsentContainerTrack || false,
        isConsentRiskScore: data.isConsentRiskScore || false,
        isConsentShareData: data.isConsentShareData || false,
      });
    }
  }, [shipperData]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.isConsentContainerTrack) {
      newErrors.isConsentContainerTrack = 'Consent to container tracking is required';
    }

    if (!formData.isConsentRiskScore) {
      newErrors.isConsentRiskScore = 'Consent to cargo risk scoring is required';
    }

    if (!formData.isConsentShareData) {
      newErrors.isConsentShareData = 'Consent to data sharing is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        await submitShipperConsents(formData).unwrap();
        showSuccess('Telematics consents saved successfully!');
        onNext(formData);
      } catch (error) {
        showError(error?.data?.message || 'Failed to save consents');
        console.error('Shipper consents submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Telematics Consent</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please review and accept the following consents to use ContainerIQ
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <FormCheckbox
              label="Consent to Container Tracking"
              description="Allows ContainerIQ to track the movement and status of your containers during transit using GPS and related technologies to improve security, visibility, and incident response."
              id="isConsentContainerTrack"
              name="isConsentContainerTrack"
              checked={formData.isConsentContainerTrack}
              onChange={handleChange}
              error={errors.isConsentContainerTrack}
              required
            />
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <FormCheckbox
              label="Consent to Cargo Risk Scoring"
              description="Allows ContainerIQ to assess risk levels for your shipments based on route behaviour, security events, and movement patterns to support safer operations and insurance decisions."
              id="isConsentRiskScore"
              name="isConsentRiskScore"
              checked={formData.isConsentRiskScore}
              onChange={handleChange}
              error={errors.isConsentRiskScore}
              required
            />
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <FormCheckbox
              label="Consent to Share Data with Insurer & Regulator"
              description="Allows relevant shipment and incident data to be securely shared with your insurer and authorised regulators strictly for compliance, claims processing, and safety oversight."
              id="isConsentShareData"
              name="isConsentShareData"
              checked={formData.isConsentShareData}
              onChange={handleChange}
              error={errors.isConsentShareData}
              required
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-blue-900">Why These Consents Matter</h4>
              <p className="text-sm text-blue-800 mt-1">
                These consents enable ContainerIQ to provide you with real-time visibility, enhanced security, faster claims processing, and regulatory compliance throughout your shipping operations.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ShipperStep3;
