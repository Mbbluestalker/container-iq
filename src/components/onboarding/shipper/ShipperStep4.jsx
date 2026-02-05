import React, { useState } from 'react';
import { useUploadFileMutation, useDeleteFileMutation } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';

const ShipperStep4 = ({ onSubmit, onBack, initialData, isLoading }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    cacCertificate: null,
    importExportLicense: null,
    customsRegistration: null,
    nxpForm: null,
    exportDeclaration: null,
    shippingBill: null,
    regulatoryPermits: null,
  });

  const [errors, setErrors] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState({
    cacCertificate: false,
    importExportLicense: false,
    customsRegistration: false,
    nxpForm: false,
    exportDeclaration: false,
    shippingBill: false,
    regulatoryPermits: false,
  });

  const [uploadFile] = useUploadFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const { showSuccess, showError } = useAlert();

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      setUploadingFiles((prev) => ({ ...prev, [name]: true }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      try {
        const response = await uploadFile({
          file: file,
          folder: 'shipper-documents',
        }).unwrap();

        setUploadedFiles((prev) => ({
          ...prev,
          [name]: {
            publicId: response.data.publicId,
            url: response.data.secureUrl,
            originalFilename: file.name,
          },
        }));

        showSuccess(`${file.name} uploaded successfully!`);
      } catch (error) {
        showError(error?.data?.message || `Failed to upload ${file.name}`);
        console.error('File upload error:', error);
      } finally {
        setUploadingFiles((prev) => ({ ...prev, [name]: false }));
      }
    }
  };

  const handleFileDelete = async (fieldName) => {
    const fileInfo = uploadedFiles[fieldName];
    if (!fileInfo) return;

    try {
      await deleteFile(fileInfo.publicId).unwrap();

      setUploadedFiles((prev) => ({ ...prev, [fieldName]: null }));

      const fileInput = document.getElementById(fieldName);
      if (fileInput) fileInput.value = '';

      showSuccess('File deleted successfully!');
    } catch (error) {
      showError(error?.data?.message || 'Failed to delete file');
      console.error('File delete error:', error);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!uploadedFiles.cacCertificate) {
      newErrors.cacCertificate = 'CAC Certificate is required';
    }

    if (!uploadedFiles.importExportLicense) {
      newErrors.importExportLicense = 'Import/Export License is required';
    }

    if (!uploadedFiles.customsRegistration) {
      newErrors.customsRegistration = 'Customs Registration (PAAR/NCS ID) is required';
    }

    if (!uploadedFiles.nxpForm) {
      newErrors.nxpForm = 'NXP Form is required';
    }

    if (!uploadedFiles.exportDeclaration) {
      newErrors.exportDeclaration = 'Export Declaration documents are required';
    }

    if (!uploadedFiles.shippingBill) {
      newErrors.shippingBill = 'Shipping Bill/Export Clearance is required';
    }

    if (!uploadedFiles.regulatoryPermits) {
      newErrors.regulatoryPermits = 'Regulatory Permits are required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      onSubmit(uploadedFiles);
    } else {
      setErrors(newErrors);
    }
  };

  const renderFileUpload = (fieldName, label) => {
    const isUploading = uploadingFiles[fieldName];
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
                    {uploadedFile.originalFilename}
                  </p>
                  <p className="text-xs text-green-700">Uploaded successfully</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleFileDelete(fieldName)}
                className="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Delete
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
              disabled={isUploading}
            />
            <label
              htmlFor={fieldName}
              className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="text-center">
                {isUploading ? (
                  <>
                    <svg className="animate-spin mx-auto h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">Uploading...</p>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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

  const isAnyFileUploading = Object.values(uploadingFiles).some(status => status);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Required Documents</h2>
        <p className="mt-1 text-sm text-gray-600">
          Upload all required regulatory documents to complete your onboarding
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderFileUpload('cacCertificate', 'CAC Certificate')}
        {renderFileUpload('importExportLicense', 'Import / Export License')}
        {renderFileUpload('customsRegistration', 'Customs Registration (PAAR / NCS ID)')}
        {renderFileUpload('nxpForm', 'NXP Form (Nigeria Export Proceeds Form)')}
        {renderFileUpload('exportDeclaration', 'Export Declaration Documents')}
        {renderFileUpload('shippingBill', 'Shipping Bill / Export Clearance')}
        {renderFileUpload('regulatoryPermits', 'Relevant Regulatory Permits (e.g. NAFDAC, SON, Quarantine)')}

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading || isAnyFileUploading}
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

export default ShipperStep4;
