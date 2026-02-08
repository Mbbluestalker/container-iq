import React, { useState } from 'react';

const FleetStep3 = ({ onSubmit, onBack, initialData, isLoading }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    fleetInsurance: null,
    vehicleLicenses: null,
    driverAccreditation: null,
  });

  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      // Clear error for this field
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      // Store file info (in real implementation, this would upload to server)
      setUploadedFiles((prev) => ({
        ...prev,
        [name]: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      }));
    }
  };

  const handleFileRemove = (fieldName) => {
    setUploadedFiles((prev) => ({ ...prev, [fieldName]: null }));

    // Reset file input
    const fileInput = document.getElementById(fieldName);
    if (fileInput) fileInput.value = '';
  };

  const validate = () => {
    const newErrors = {};

    if (!uploadedFiles.fleetInsurance) {
      newErrors.fleetInsurance = 'Fleet insurance certificate is required';
    }

    if (!uploadedFiles.vehicleLicenses) {
      newErrors.vehicleLicenses = 'Vehicle licenses are required';
    }

    if (!uploadedFiles.driverAccreditation) {
      newErrors.driverAccreditation = 'Driver accreditation proof is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      // In real implementation, files would already be uploaded
      onSubmit(uploadedFiles);
    } else {
      setErrors(newErrors);
    }
  };

  const renderFileUpload = (fieldName, label) => {
    const uploadedFile = uploadedFiles[fieldName];
    const error = errors[fieldName];

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} <span className="text-status-danger">*</span>
        </label>

        {uploadedFile ? (
          <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-900">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-green-700">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleFileRemove(fieldName)}
                className="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-1">
            <input
              type="file"
              id={fieldName}
              name={fieldName}
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
            <label
              htmlFor={fieldName}
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
                <p className="mt-1 text-sm text-gray-600">Click to upload {label}</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
            </label>
          </div>
        )}
        {error && (
          <p className="mt-1.5 text-sm text-status-danger font-medium">{error}</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Required Documents</h2>
        <p className="mt-1 text-sm text-gray-600">
          Upload all required documents to complete your fleet onboarding
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderFileUpload('fleetInsurance', 'Fleet Insurance Certificate')}
        {renderFileUpload('vehicleLicenses', 'Vehicle Licenses')}
        {renderFileUpload('driverAccreditation', 'Driver Accreditation Proof')}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h4 className="text-sm font-semibold text-blue-900">Document Requirements</h4>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                <li>All documents must be clear and legible</li>
                <li>Accepted formats: PDF, JPG, PNG</li>
                <li>Maximum file size: 10MB per document</li>
                <li>Documents must be current and valid</li>
              </ul>
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

export default FleetStep3;
