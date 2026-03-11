import React, { useState } from 'react';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormTextarea from '../../common/FormTextarea';
import FormCheckbox from '../../common/FormCheckbox';

const ShippingCompanyStep2 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    nimasaLicenseNumber: initialData?.nimasaLicenseNumber || '',
    npaRegistrationNumber: initialData?.npaRegistrationNumber || '',
    imoNumber: initialData?.imoNumber || '',
    manifestSubmissionMethod: initialData?.manifestSubmissionMethod || '',
    apiIntegrationPreference: initialData?.apiIntegrationPreference || '',
    containerTrackingSystem: initialData?.containerTrackingSystem || '',
    existingTelematics: initialData?.existingTelematics || '',
    integrateWithContainerIQ: initialData?.integrateWithContainerIQ || false,
    realTimeDataSharing: initialData?.realTimeDataSharing || false,
    regulatoryReportingConsent: initialData?.regulatoryReportingConsent || false,
    containerHandoverConsent: initialData?.containerHandoverConsent || false,
    specialRequirements: initialData?.specialRequirements || '',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance & Integration</h2>
        <p className="text-sm text-gray-600">Regulatory compliance and system integration preferences</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">📋 Regulatory Compliance</h3>
        <p className="text-xs text-blue-700">
          Nigerian shipping companies must comply with NIMASA, NPA, and international IMO standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="NIMASA License Number"
          name="nimasaLicenseNumber"
          value={formData.nimasaLicenseNumber}
          onChange={handleChange}
          placeholder="e.g., NIMASA/2024/1234"
          required
        />

        <FormInput
          label="NPA Registration Number"
          name="npaRegistrationNumber"
          value={formData.npaRegistrationNumber}
          onChange={handleChange}
          placeholder="e.g., NPA/REG/2024/5678"
          required
        />
      </div>

      <FormInput
        label="IMO Number (International Maritime Organization)"
        name="imoNumber"
        value={formData.imoNumber}
        onChange={handleChange}
        placeholder="e.g., IMO 1234567"
        helperText="7-digit unique vessel identification number"
      />

      <hr className="border-gray-200 my-6" />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔌 System Integration</h3>
      </div>

      <FormSelect
        label="Manifest Submission Method"
        name="manifestSubmissionMethod"
        value={formData.manifestSubmissionMethod}
        onChange={handleChange}
        options={[
          { value: 'manual_upload', label: 'Manual Upload (CSV/Excel)' },
          { value: 'api_integration', label: 'API Integration (Real-time sync)' },
          { value: 'both', label: 'Both Manual & API' },
        ]}
        required
      />

      <FormSelect
        label="API Integration Preference"
        name="apiIntegrationPreference"
        value={formData.apiIntegrationPreference}
        onChange={handleChange}
        options={[
          { value: 'read_only', label: 'Read Only - View container status only' },
          { value: 'read_write', label: 'Read & Write - Full automation (recommended)' },
          { value: 'no_api', label: 'No API - Manual operations only' },
        ]}
        helperText="Read & Write allows real-time container handover tracking and automated custody transfers"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Existing Container Tracking System"
          name="containerTrackingSystem"
          value={formData.containerTrackingSystem}
          onChange={handleChange}
          placeholder="e.g., Maersk Line System, MSC Tracking"
        />

        <FormSelect
          label="Existing Telematics Solution"
          name="existingTelematics"
          value={formData.existingTelematics}
          onChange={handleChange}
          options={[
            { value: 'none', label: 'No Telematics' },
            { value: 'gps_only', label: 'GPS Tracking Only' },
            { value: 'full_telematics', label: 'Full Telematics (GPS + Sensors)' },
          ]}
        />
      </div>

      <hr className="border-gray-200 my-6" />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Data Sharing & Consent</h3>
      </div>

      <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
        <FormCheckbox
          label="Integrate with ContainerIQ GPS e-Lock System"
          name="integrateWithContainerIQ"
          checked={formData.integrateWithContainerIQ}
          onChange={handleChange}
          helperText="Allow ContainerIQ to assign GPS e-Locks to your containers for enhanced tracking and security"
        />

        <FormCheckbox
          label="Real-Time Container Handover Data Sharing"
          name="realTimeDataSharing"
          checked={formData.realTimeDataSharing}
          onChange={handleChange}
          helperText="Share container custody transfer data with terminal operators, fleet operators, and insurers in real-time"
          required
        />

        <FormCheckbox
          label="Regulatory Reporting Consent"
          name="regulatoryReportingConsent"
          checked={formData.regulatoryReportingConsent}
          onChange={handleChange}
          helperText="Allow ContainerIQ to generate and submit compliance reports to NPA, NIMASA, and other regulators on your behalf"
          required
        />

        <FormCheckbox
          label="Container Handover Transparency"
          name="containerHandoverConsent"
          checked={formData.containerHandoverConsent}
          onChange={handleChange}
          helperText="Provide visibility of container custody chain to shippers, insurers, and regulators to reduce disputes and improve accountability"
          required
        />
      </div>

      <FormTextarea
        label="Special Requirements or Notes"
        name="specialRequirements"
        value={formData.specialRequirements}
        onChange={handleChange}
        placeholder="Any special integration requirements, operational constraints, or additional information..."
        rows={4}
      />

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
        >
          Next: Documents
        </button>
      </div>
    </form>
  );
};

export default ShippingCompanyStep2;
