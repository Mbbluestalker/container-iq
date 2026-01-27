import React, { useState } from 'react';
import FormTextarea from '../../common/FormTextarea';

const InsuranceStep5 = ({ onSubmit, onBack, initialData, isLoading }) => {
  const [formData, setFormData] = useState({
    claimsContactProtocol: initialData?.claimsContactProtocol || '',
    insuranceLicense: initialData?.insuranceLicense || null,
    naicomApprovalLetter: initialData?.naicomApprovalLetter || null,
  });

  const [errors, setErrors] = useState({});
  const [fileNames, setFileNames] = useState({
    insuranceLicense: initialData?.insuranceLicense?.name || '',
    naicomApprovalLetter: initialData?.naicomApprovalLetter?.name || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setFileNames((prev) => ({ ...prev, [name]: files[0].name }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.claimsContactProtocol.trim()) {
      newErrors.claimsContactProtocol = 'Claims contact protocol is required';
    }

    if (!formData.insuranceLicense) {
      newErrors.insuranceLicense = 'Insurance license document is required';
    }

    if (!formData.naicomApprovalLetter) {
      newErrors.naicomApprovalLetter = 'NAICOM approval letter is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Documents & Claims Protocol</h2>
        <p className="mt-1 text-sm text-gray-600">
          Upload required documents and define your claims contact protocol
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Claims Contact Protocol */}
        <FormTextarea
          label="Claims Contact Protocol"
          id="claimsContactProtocol"
          name="claimsContactProtocol"
          value={formData.claimsContactProtocol}
          onChange={handleChange}
          error={errors.claimsContactProtocol}
          placeholder="Example:&#10;Incident Type: Cargo Theft&#10;- ContainerIQ auto-alert triggered&#10;- Notification sent to: claims@company.com&#10;- WhatsApp Hotline: +234 XXX XXX XXXX&#10;- Acknowledgement required within 30 minutes&#10;- Surveyor appointed within 4 hours&#10;- Regulator notified within 24 hours"
          rows={8}
          required
        />

        {/* File Upload: Insurance License */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Insurance License <span className="text-status-danger">*</span>
          </label>
          <div className="mt-1">
            <input
              type="file"
              id="insuranceLicense"
              name="insuranceLicense"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
            <label
              htmlFor="insuranceLicense"
              className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all"
            >
              <div className="text-center">
                <svg
                  className="mx-auto h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  {fileNames.insuranceLicense || 'Click to upload Insurance License'}
                </p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
            </label>
          </div>
          {errors.insuranceLicense && (
            <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.insuranceLicense}</p>
          )}
        </div>

        {/* File Upload: NAICOM Approval Letter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            NAICOM Approval Letter <span className="text-status-danger">*</span>
          </label>
          <div className="mt-1">
            <input
              type="file"
              id="naicomApprovalLetter"
              name="naicomApprovalLetter"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
            <label
              htmlFor="naicomApprovalLetter"
              className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all"
            >
              <div className="text-center">
                <svg
                  className="mx-auto h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  {fileNames.naicomApprovalLetter || 'Click to upload NAICOM Approval Letter'}
                </p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
            </label>
          </div>
          {errors.naicomApprovalLetter && (
            <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.naicomApprovalLetter}</p>
          )}
        </div>

        {/* Info box about Claims Contact Protocol */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-blue-900">How ContainerIQ Uses This Information</h4>
              <p className="text-sm text-blue-800 mt-1">
                Your claims contact protocol controls alert routing, SLA timers, evidence visibility, API notifications, and regulator dashboards to ensure fast, efficient claims processing.
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
            {isLoading ? 'Completing Onboarding...' : 'Complete Onboarding'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceStep5;
