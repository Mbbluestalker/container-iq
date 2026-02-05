import React, { useState } from 'react';
import FormCheckbox from '../../common/FormCheckbox';

const ShipperStep3 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    consentContainerTracking: initialData?.consentContainerTracking || false,
    consentCargoRiskScoring: initialData?.consentCargoRiskScoring || false,
    consentDataSharing: initialData?.consentDataSharing || false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.consentContainerTracking) {
      newErrors.consentContainerTracking = 'Consent to container tracking is required';
    }

    if (!formData.consentCargoRiskScoring) {
      newErrors.consentCargoRiskScoring = 'Consent to cargo risk scoring is required';
    }

    if (!formData.consentDataSharing) {
      newErrors.consentDataSharing = 'Consent to data sharing is required';
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
              id="consentContainerTracking"
              name="consentContainerTracking"
              checked={formData.consentContainerTracking}
              onChange={handleChange}
              error={errors.consentContainerTracking}
              required
            />
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <FormCheckbox
              label="Consent to Cargo Risk Scoring"
              description="Allows ContainerIQ to assess risk levels for your shipments based on route behaviour, security events, and movement patterns to support safer operations and insurance decisions."
              id="consentCargoRiskScoring"
              name="consentCargoRiskScoring"
              checked={formData.consentCargoRiskScoring}
              onChange={handleChange}
              error={errors.consentCargoRiskScoring}
              required
            />
          </div>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <FormCheckbox
              label="Consent to Share Data with Insurer & Regulator"
              description="Allows relevant shipment and incident data to be securely shared with your insurer and authorised regulators strictly for compliance, claims processing, and safety oversight."
              id="consentDataSharing"
              name="consentDataSharing"
              checked={formData.consentDataSharing}
              onChange={handleChange}
              error={errors.consentDataSharing}
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

export default ShipperStep3;
