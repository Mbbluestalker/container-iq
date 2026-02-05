import React, { useState } from 'react';
import { useUploadFileMutation, useDeleteFileMutation } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';

const InsuranceStep5 = ({ onSubmit, onBack, initialData, isLoading }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    insuranceLicense: null, // Will store { publicId, url, originalFilename }
    naicomApprovalLetter: null,
  });

  const [errors, setErrors] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState({
    insuranceLicense: false,
    naicomApprovalLetter: false,
  });

  const [uploadFile] = useUploadFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const { showSuccess, showError } = useAlert();

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      // Set uploading state
      setUploadingFiles((prev) => ({ ...prev, [name]: true }));

      // Clear any previous errors
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      try {
        // Upload file immediately
        const response = await uploadFile({
          file: file,
          folder: 'insurance-documents',
        }).unwrap();

        // Store uploaded file info
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

      // Clear uploaded file info
      setUploadedFiles((prev) => ({ ...prev, [fieldName]: null }));

      // Reset file input
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

    if (!uploadedFiles.insuranceLicense) {
      newErrors.insuranceLicense = 'Insurance license document is required';
    }

    if (!uploadedFiles.naicomApprovalLetter) {
      newErrors.naicomApprovalLetter = 'NAICOM approval letter is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      // Files are already uploaded, just complete onboarding
      onSubmit(uploadedFiles);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Required Documents</h2>
        <p className="mt-1 text-sm text-gray-600">
          Upload required regulatory documents to complete your onboarding
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* File Upload: Insurance License */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Insurance License <span className="text-status-danger">*</span>
          </label>

          {uploadedFiles.insuranceLicense ? (
            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {uploadedFiles.insuranceLicense.originalFilename}
                    </p>
                    <p className="text-xs text-green-700">Uploaded successfully</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFileDelete('insuranceLicense')}
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
                id="insuranceLicense"
                name="insuranceLicense"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                disabled={uploadingFiles.insuranceLicense}
              />
              <label
                htmlFor="insuranceLicense"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all ${
                  uploadingFiles.insuranceLicense ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="text-center">
                  {uploadingFiles.insuranceLicense ? (
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
                      <p className="mt-1 text-sm text-gray-600">Click to upload Insurance License</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          )}
          {errors.insuranceLicense && (
            <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.insuranceLicense}</p>
          )}
        </div>

        {/* File Upload: NAICOM Approval Letter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            NAICOM Approval Letter <span className="text-status-danger">*</span>
          </label>

          {uploadedFiles.naicomApprovalLetter ? (
            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {uploadedFiles.naicomApprovalLetter.originalFilename}
                    </p>
                    <p className="text-xs text-green-700">Uploaded successfully</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleFileDelete('naicomApprovalLetter')}
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
                id="naicomApprovalLetter"
                name="naicomApprovalLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                disabled={uploadingFiles.naicomApprovalLetter}
              />
              <label
                htmlFor="naicomApprovalLetter"
                className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all ${
                  uploadingFiles.naicomApprovalLetter ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="text-center">
                  {uploadingFiles.naicomApprovalLetter ? (
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
                      <p className="mt-1 text-sm text-gray-600">Click to upload NAICOM Approval Letter</p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          )}
          {errors.naicomApprovalLetter && (
            <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.naicomApprovalLetter}</p>
          )}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading || uploadingFiles.insuranceLicense || uploadingFiles.naicomApprovalLetter}
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
