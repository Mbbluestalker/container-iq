import React, { useState } from 'react';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormTextarea from '../../common/FormTextarea';
import FormCheckbox from '../../common/FormCheckbox';

const TerminalOperatorStep2 = ({ onNext, onBack, initialData }) => {
  const [formData, setFormData] = useState({
    npaLicenseNumber: initialData?.npaLicenseNumber || '',
    customsIntegration: initialData?.customsIntegration || '',
    gateOperationSystem: initialData?.gateOperationSystem || '',
    existingTMS: initialData?.existingTMS || '',
    apiIntegrationPreference: initialData?.apiIntegrationPreference || '',
    containerTrackingCapability: initialData?.containerTrackingCapability || '',
    dwellTimeMonitoring: initialData?.dwellTimeMonitoring || false,
    realTimeGateData: initialData?.realTimeGateData || false,
    yardManagementConsent: initialData?.yardManagementConsent || false,
    regulatoryReportingConsent: initialData?.regulatoryReportingConsent || false,
    dataVisibilityConsent: initialData?.dataVisibilityConsent || false,
    averageDwellTime: initialData?.averageDwellTime || '',
    peakSeasonMonths: initialData?.peakSeasonMonths || '',
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Operations & Integration</h2>
        <p className="text-sm text-gray-600">System integration and operational preferences</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">📋 Regulatory Compliance</h3>
        <p className="text-xs text-blue-700">
          Terminal operators must comply with NPA regulations and customs requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="NPA License Number"
          name="npaLicenseNumber"
          value={formData.npaLicenseNumber}
          onChange={handleChange}
          placeholder="e.g., NPA/TERM/2024/1234"
          required
        />

        <FormSelect
          label="Customs Integration Status"
          name="customsIntegration"
          value={formData.customsIntegration}
          onChange={handleChange}
          options={[
            { value: 'fully_integrated', label: 'Fully Integrated with NCS' },
            { value: 'partially_integrated', label: 'Partially Integrated' },
            { value: 'manual', label: 'Manual Processing Only' },
            { value: 'pending', label: 'Integration Pending' },
          ]}
          required
        />
      </div>

      <hr className="border-gray-200 my-6" />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚪 Gate Operations</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Gate Operation System"
          name="gateOperationSystem"
          value={formData.gateOperationSystem}
          onChange={handleChange}
          options={[
            { value: 'automated', label: 'Automated Gate System' },
            { value: 'semi_automated', label: 'Semi-Automated (OCR + Manual)' },
            { value: 'manual', label: 'Manual Gate Operations' },
            { value: 'rfid', label: 'RFID-Based Gate System' },
          ]}
          required
        />

        <FormInput
          label="Existing Terminal Management System (TMS)"
          name="existingTMS"
          value={formData.existingTMS}
          onChange={handleChange}
          placeholder="e.g., Navis N4, TOS, Custom TMS"
        />
      </div>

      <FormSelect
        label="API Integration Preference"
        name="apiIntegrationPreference"
        value={formData.apiIntegrationPreference}
        onChange={handleChange}
        options={[
          { value: 'read_only', label: 'Read Only - View container data only' },
          { value: 'read_write', label: 'Read & Write - Full automation (recommended)' },
          { value: 'no_api', label: 'No API - Manual operations only' },
        ]}
        helperText="Read & Write allows real-time gate-in/gate-out data sync and automated seal recording"
        required
      />

      <FormSelect
        label="Container Tracking Capability"
        name="containerTrackingCapability"
        value={formData.containerTrackingCapability}
        onChange={handleChange}
        options={[
          { value: 'real_time', label: 'Real-Time Tracking (GPS/RFID)' },
          { value: 'periodic', label: 'Periodic Updates (Manual Scans)' },
          { value: 'limited', label: 'Limited Tracking (Gate Events Only)' },
          { value: 'none', label: 'No Tracking' },
        ]}
        required
      />

      <hr className="border-gray-200 my-6" />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Yard Management & Analytics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Average Dwell Time (Days)"
          name="averageDwellTime"
          type="number"
          step="0.1"
          value={formData.averageDwellTime}
          onChange={handleChange}
          placeholder="e.g., 7.5"
          helperText="Average container dwell time at your terminal"
        />

        <FormInput
          label="Peak Season Months"
          name="peakSeasonMonths"
          value={formData.peakSeasonMonths}
          onChange={handleChange}
          placeholder="e.g., Nov-Jan, Jun-Aug"
          helperText="Months with highest container throughput"
        />
      </div>

      <hr className="border-gray-200 my-6" />

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Data Sharing & Consent</h3>
      </div>

      <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
        <FormCheckbox
          label="Enable Dwell Time Monitoring & Alerts"
          name="dwellTimeMonitoring"
          checked={formData.dwellTimeMonitoring}
          onChange={handleChange}
          helperText="Allow ContainerIQ to monitor container dwell time and send alerts for overstayed containers"
          required
        />

        <FormCheckbox
          label="Real-Time Gate-In/Gate-Out Data Sharing"
          name="realTimeGateData"
          checked={formData.realTimeGateData}
          onChange={handleChange}
          helperText="Share container gate events with shipping companies, fleet operators, and insurers in real-time"
          required
        />

        <FormCheckbox
          label="Yard Management Visibility"
          name="yardManagementConsent"
          checked={formData.yardManagementConsent}
          onChange={handleChange}
          helperText="Provide visibility of yard occupancy and container locations to authorized stakeholders"
          required
        />

        <FormCheckbox
          label="Regulatory Reporting Consent"
          name="regulatoryReportingConsent"
          checked={formData.regulatoryReportingConsent}
          onChange={handleChange}
          helperText="Allow ContainerIQ to generate and submit compliance reports to NPA and other regulators on your behalf"
          required
        />

        <FormCheckbox
          label="Data Visibility to Shippers & Insurers"
          name="dataVisibilityConsent"
          checked={formData.dataVisibilityConsent}
          onChange={handleChange}
          helperText="Share seal state, timestamps, and custody chain data with shippers and insurers for transparency"
          required
        />
      </div>

      <FormTextarea
        label="Special Requirements or Notes"
        name="specialRequirements"
        value={formData.specialRequirements}
        onChange={handleChange}
        placeholder="Any special integration requirements, operational constraints, security protocols, or additional information..."
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

export default TerminalOperatorStep2;
