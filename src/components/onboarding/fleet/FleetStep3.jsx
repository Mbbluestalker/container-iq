import React, { useState, useEffect } from 'react';
import { useSubmitFleetDocumentsMutation, useUploadFileMutation, useDeleteFileMutation, useGetFleetDetailsQuery } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';

const FleetStep3 = ({ onSubmit, onBack, initialData, isLoading: externalLoading }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    fleetInsureDocUrl: null,
    vehicleDocUrl: null,
    driverProofDocUrl: null,
  });

  const [uploadingFiles, setUploadingFiles] = useState({
    fleetInsureDocUrl: false,
    vehicleDocUrl: false,
    driverProofDocUrl: false,
  });

  const [errors, setErrors] = useState({});

  const [uploadFile] = useUploadFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [submitFleetDocuments, { isLoading }] = useSubmitFleetDocumentsMutation();
  const { showSuccess, showError } = useAlert();

  // Fetch existing fleet data for prefilling
  const { data: fleetData, isLoading: isLoadingFleetData } = useGetFleetDetailsQuery();

  // Prefill uploaded files when data is loaded
  useEffect(() => {
    if (fleetData?.data) {
      const data = fleetData.data;
      const prefilledFiles = {};

      if (data.fleetInsureDocUrl) {
        prefilledFiles.fleetInsureDocUrl = {
          url: data.fleetInsureDocUrl,
          publicId: null, // We don't have publicId from GET response
          originalFilename: 'Fleet Insurance Certificate',
        };
      }

      if (data.vehicleDocUrl) {
        prefilledFiles.vehicleDocUrl = {
          url: data.vehicleDocUrl,
          publicId: null,
          originalFilename: 'Vehicle Licenses',
        };
      }

      if (data.driverProofDocUrl) {
        prefilledFiles.driverProofDocUrl = {
          url: data.driverProofDocUrl,
          publicId: null,
          originalFilename: 'Driver Accreditation Proof',
        };
      }

      if (Object.keys(prefilledFiles).length > 0) {
        setUploadedFiles((prev) => ({ ...prev, ...prefilledFiles }));
      }
    }
  }, [fleetData]);

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      // Clear error for this field
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      // Start uploading
      setUploadingFiles((prev) => ({ ...prev, [name]: true }));

      try {
        const response = await uploadFile({
          file: file,
          folder: 'fleet-documents',
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

  const handleFileRemove = async (fieldName) => {
    const uploadedFile = uploadedFiles[fieldName];

    // Delete from Cloudinary if we have a publicId
    if (uploadedFile?.publicId) {
      try {
        await deleteFile(uploadedFile.publicId).unwrap();
        showSuccess('File deleted successfully');
      } catch (error) {
        showError('Failed to delete file');
        console.error('File delete error:', error);
      }
    }

    setUploadedFiles((prev) => ({ ...prev, [fieldName]: null }));

    // Reset file input
    const fileInput = document.getElementById(fieldName);
    if (fileInput) fileInput.value = '';
  };

  const validate = () => {
    const newErrors = {};

    if (!uploadedFiles.fleetInsureDocUrl) {
      newErrors.fleetInsureDocUrl = 'Fleet insurance certificate is required';
    }

    if (!uploadedFiles.vehicleDocUrl) {
      newErrors.vehicleDocUrl = 'Vehicle licenses are required';
    }

    if (!uploadedFiles.driverProofDocUrl) {
      newErrors.driverProofDocUrl = 'Driver accreditation proof is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        // Extract URLs for submission
        const documentsPayload = {
          fleetInsureDocUrl: uploadedFiles.fleetInsureDocUrl?.url || '',
          vehicleDocUrl: uploadedFiles.vehicleDocUrl?.url || '',
          driverProofDocUrl: uploadedFiles.driverProofDocUrl?.url || '',
        };

        await submitFleetDocuments(documentsPayload).unwrap();
        showSuccess('Documents submitted successfully!');
        onSubmit(uploadedFiles);
      } catch (error) {
        showError(error?.data?.message || 'Failed to submit documents');
        console.error('Fleet documents submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const renderFileUpload = (fieldName, label) => {
    const uploadedFile = uploadedFiles[fieldName];
    const isUploading = uploadingFiles[fieldName];
    const error = errors[fieldName];

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} <span className="text-status-danger">*</span>
        </label>

        {isUploading ? (
          <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm font-medium text-blue-900">Uploading...</p>
            </div>
          </div>
        ) : uploadedFile ? (
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
                  <p className="text-xs text-green-700">
                    File uploaded successfully
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

  if (isLoadingFleetData) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-secondary mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-sm text-gray-600">Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Required Documents</h2>
        <p className="mt-1 text-sm text-gray-600">
          Upload all required documents to complete your fleet onboarding
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderFileUpload('fleetInsureDocUrl', 'Fleet Insurance Certificate')}
        {renderFileUpload('vehicleDocUrl', 'Vehicle Licenses')}
        {renderFileUpload('driverProofDocUrl', 'Driver Accreditation Proof')}

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
            disabled={isLoading || externalLoading}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading || externalLoading}
            className="flex-1 py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isLoading || externalLoading) ? 'Completing Onboarding...' : 'Complete Onboarding'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FleetStep3;
