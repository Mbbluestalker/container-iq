import React, { useState } from 'react';
import { useUploadFileMutation } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';

const ShippingCompanyStep3 = ({ onSubmit, onBack, initialData, isLoading }) => {
  const [uploadFile] = useUploadFileMutation();
  const { showSuccess, showError } = useAlert();

  const [formData, setFormData] = useState({
    nimasaLicense: initialData?.nimasaLicense || null,
    npaRegistration: initialData?.npaRegistration || null,
    vesselRegistrationCertificate: initialData?.vesselRegistrationCertificate || null,
    insuranceCertificate: initialData?.insuranceCertificate || null,
    imoCompliance: initialData?.imoCompliance || null,
    ...initialData,
  });

  const [uploading, setUploading] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({
    nimasaLicense: initialData?.nimasaLicense || null,
    npaRegistration: initialData?.npaRegistration || null,
    vesselRegistrationCertificate: initialData?.vesselRegistrationCertificate || null,
    insuranceCertificate: initialData?.insuranceCertificate || null,
    imoCompliance: initialData?.imoCompliance || null,
  });

  const handleFileUpload = async (e, fieldName, folderName) => {
    const file = e.target.files[0];
    if (!file) return;

    // File size validation (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      showError('File size must be less than 10MB');
      return;
    }

    setUploading((prev) => ({ ...prev, [fieldName]: true }));

    try {
      const result = await uploadFile({ file, folder: folderName }).unwrap();
      setUploadedFiles((prev) => ({ ...prev, [fieldName]: result }));
      setFormData((prev) => ({ ...prev, [fieldName]: result }));
      showSuccess(`${fieldName.replace(/([A-Z])/g, ' $1').trim()} uploaded successfully`);
    } catch (error) {
      showError(error?.data?.message || 'File upload failed');
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const documentFields = [
    {
      name: 'nimasaLicense',
      label: 'NIMASA License',
      folder: 'shipping-licenses',
      required: true,
      description: 'Upload your NIMASA (Nigerian Maritime Administration and Safety Agency) license certificate',
    },
    {
      name: 'npaRegistration',
      label: 'NPA Registration Certificate',
      folder: 'shipping-licenses',
      required: true,
      description: 'Upload your Nigerian Ports Authority registration certificate',
    },
    {
      name: 'vesselRegistrationCertificate',
      label: 'Vessel Registration Certificate',
      folder: 'shipping-licenses',
      required: true,
      description: 'Upload vessel registration certificate for your primary vessel (or fleet manifest)',
    },
    {
      name: 'insuranceCertificate',
      label: 'Marine Insurance Certificate',
      folder: 'shipping-licenses',
      required: true,
      description: 'Upload current marine insurance certificate covering vessel operations',
    },
    {
      name: 'imoCompliance',
      label: 'IMO Compliance Documentation',
      folder: 'shipping-licenses',
      required: false,
      description: 'Upload IMO compliance certificate (if applicable)',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Supporting Documents</h2>
        <p className="text-sm text-gray-600">
          Upload required regulatory and operational documents
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-yellow-900">Document Requirements</h3>
            <ul className="text-xs text-yellow-700 mt-2 space-y-1 list-disc list-inside">
              <li>All documents must be valid and current</li>
              <li>Accepted formats: PDF, JPG, PNG (Max 10MB per file)</li>
              <li>Documents will be verified by ContainerIQ compliance team</li>
              <li>Onboarding approval typically takes 24-48 hours</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {documentFields.map((field) => (
          <div key={field.name} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-secondary/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <p className="text-xs text-gray-600">{field.description}</p>
              </div>
              {uploadedFiles[field.name] && (
                <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Uploaded
                </span>
              )}
            </div>

            <div className="mt-3">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, field.name, field.folder)}
                  className="hidden"
                  disabled={uploading[field.name]}
                />
                <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                  uploading[field.name]
                    ? 'border-gray-300 bg-gray-50'
                    : uploadedFiles[field.name]
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-secondary bg-gray-50 hover:bg-secondary/5'
                }`}>
                  {uploading[field.name] ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-secondary" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  ) : uploadedFiles[field.name] ? (
                    <div className="text-sm text-green-700">
                      <svg className="w-8 h-8 mx-auto mb-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <p className="font-medium">{uploadedFiles[field.name].originalName || 'File uploaded'}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to replace</p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">📌 What Happens Next?</h3>
        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
          <li>ContainerIQ compliance team will review your documents within 24-48 hours</li>
          <li>You'll receive an email notification once your account is approved</li>
          <li>Upon approval, you'll have full access to vessel manifest uploads, container tracking, and custody handover features</li>
          <li>You can start integrating ContainerIQ with your existing systems immediately after approval</li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          disabled={isLoading}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Completing Onboarding...
            </>
          ) : (
            'Complete Onboarding'
          )}
        </button>
      </div>
    </form>
  );
};

export default ShippingCompanyStep3;
