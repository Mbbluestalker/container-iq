import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';

const VehicleFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const { showSuccess, showError } = useAlert();

  const [formData, setFormData] = useState({
    // Vehicle Identification
    registrationNumber: '',
    vinNumber: '',
    chassisNumber: '',
    make: '',
    model: '',
    year: '',
    color: '',

    // Truck Type Configuration
    truckType: '',
    axleConfiguration: '',
    loadCapacity: '',
    containerCompatibility: [],

    // Ownership Details
    ownershipType: '',
    ownerName: '',
    ownerContact: '',

    // Regulatory Compliance
    vehicleLicenseExpiry: '',
    roadworthinessExpiry: '',
    frscCompliance: '',

    // Safety Equipment Declarations
    hasFireExtinguisher: false,
    hasFirstAidKit: false,
    hasReflectiveTriangle: false,
    hasSpareWheel: false,

    // Telematics Details
    hasGps: '',
    gpsProvider: '',
    hasElock: '',
    elockProvider: '',
    hasPanicButton: false,
    supportsGeofencing: false,

    // Operational Details
    currentStatus: '',
    assignedDriver: '',
    assignedDepot: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    vehicleLicense: null,
    roadworthinessCert: null,
    insuranceCert: null,
  });

  const [uploadingFiles, setUploadingFiles] = useState({
    vehicleLicense: false,
    roadworthinessCert: false,
    insuranceCert: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);

    setFormData((prev) => ({
      ...prev,
      [name]: selectedValues,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }

      setUploadingFiles((prev) => ({ ...prev, [name]: true }));

      // Simulate file upload (replace with actual API call later)
      setTimeout(() => {
        setUploadedFiles((prev) => ({
          ...prev,
          [name]: {
            publicId: `mock_${Date.now()}`,
            url: URL.createObjectURL(file),
            originalFilename: file.name,
          },
        }));
        setUploadingFiles((prev) => ({ ...prev, [name]: false }));
        showSuccess(`${file.name} uploaded successfully!`);
      }, 1500);
    }
  };

  const handleFileRemove = (fieldName) => {
    setUploadedFiles((prev) => ({ ...prev, [fieldName]: null }));
    const fileInput = document.getElementById(fieldName);
    if (fileInput) fileInput.value = '';
  };

  const validate = () => {
    const newErrors = {};

    // Vehicle Identification - Required
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.vinNumber.trim()) newErrors.vinNumber = 'VIN number is required';
    if (!formData.chassisNumber.trim()) newErrors.chassisNumber = 'Chassis number is required';
    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.color.trim()) newErrors.color = 'Color is required';

    // Truck Type Configuration - Required
    if (!formData.truckType) newErrors.truckType = 'Truck type is required';
    if (!formData.axleConfiguration) newErrors.axleConfiguration = 'Axle configuration is required';
    if (!formData.loadCapacity) newErrors.loadCapacity = 'Load capacity is required';
    if (formData.containerCompatibility.length === 0) {
      newErrors.containerCompatibility = 'At least one container size is required';
    }

    // Ownership Details - Required
    if (!formData.ownershipType) newErrors.ownershipType = 'Ownership type is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.ownerContact.trim()) newErrors.ownerContact = 'Owner contact is required';

    // Regulatory Compliance - Required
    if (!formData.vehicleLicenseExpiry) newErrors.vehicleLicenseExpiry = 'Vehicle license expiry is required';
    if (!formData.roadworthinessExpiry) newErrors.roadworthinessExpiry = 'Roadworthiness expiry is required';
    if (!formData.frscCompliance) newErrors.frscCompliance = 'FRSC compliance status is required';

    // Safety Equipment - At least one required
    const safetyEquipment = [
      formData.hasFireExtinguisher,
      formData.hasFirstAidKit,
      formData.hasReflectiveTriangle,
      formData.hasSpareWheel,
    ];
    if (!safetyEquipment.some(item => item === true)) {
      newErrors.safetyEquipment = 'At least one safety equipment declaration is required';
    }

    // Telematics - Required
    if (!formData.hasGps) newErrors.hasGps = 'GPS status is required';
    if (formData.hasGps === 'yes' && !formData.gpsProvider.trim()) {
      newErrors.gpsProvider = 'GPS provider is required when GPS is installed';
    }
    if (!formData.hasElock) newErrors.hasElock = 'E-lock status is required';
    if (formData.hasElock === 'yes' && !formData.elockProvider.trim()) {
      newErrors.elockProvider = 'E-lock provider is required when E-lock is installed';
    }

    // Operational Details - Required
    if (!formData.currentStatus) newErrors.currentStatus = 'Current status is required';
    if (!formData.assignedDepot.trim()) newErrors.assignedDepot = 'Assigned depot is required';

    // Document Upload - Required for new vehicles
    if (!isEditMode) {
      if (!uploadedFiles.vehicleLicense) newErrors.vehicleLicense = 'Vehicle license is required';
      if (!uploadedFiles.roadworthinessCert) newErrors.roadworthinessCert = 'Roadworthiness certificate is required';
      if (!uploadedFiles.insuranceCert) newErrors.insuranceCert = 'Insurance certificate is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Simulate API call (replace with actual API later)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const submissionData = {
          ...formData,
          loadCapacity: Number(formData.loadCapacity),
          year: Number(formData.year),
          documents: {
            vehicleLicense: uploadedFiles.vehicleLicense?.url,
            roadworthinessCert: uploadedFiles.roadworthinessCert?.url,
            insuranceCert: uploadedFiles.insuranceCert?.url,
          },
        };

        console.log('Vehicle submission data:', submissionData);

        showSuccess(isEditMode ? 'Vehicle updated successfully!' : 'Vehicle added successfully!');
        navigate('/fleet/vehicles');
      } catch (error) {
        showError(error?.message || 'Failed to save vehicle. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
      showError('Please fill in all required fields');
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
              <svg className="animate-spin h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm font-medium text-blue-900">Uploading...</p>
            </div>
          </div>
        ) : uploadedFile ? (
          <div className="border-2 border-green-200 bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-900">{uploadedFile.originalFilename}</p>
                  <p className="text-xs text-green-700">Uploaded successfully</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleFileRemove(fieldName)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div>
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
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-1 text-sm text-gray-600">Click to upload</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
            </label>
          </div>
        )}
        {error && <p className="mt-1.5 text-sm text-status-danger font-medium">{error}</p>}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/fleet/vehicles')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Vehicles
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {isEditMode ? 'Update vehicle information' : 'Add a new vehicle to your fleet'}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Vehicle Identification */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Vehicle Identification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Registration Number <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="e.g., ABC-123-XY"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.registrationNumber && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.registrationNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  VIN Number <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="vinNumber"
                  value={formData.vinNumber}
                  onChange={handleChange}
                  placeholder="Vehicle Identification Number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.vinNumber && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.vinNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Chassis Number <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={handleChange}
                  placeholder="Chassis Number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.chassisNumber && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.chassisNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Make <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  placeholder="e.g., Mercedes-Benz, Volvo, MAN"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.make && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.make}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Model <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g., Actros, FH16, TGX"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.model && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.model}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Year of Manufacture <span className="text-status-danger">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g., 2020"
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.year && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.year}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Color <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g., White, Blue, Red"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.color && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.color}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Truck Type Configuration */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Truck Type Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Truck Type <span className="text-status-danger">*</span>
                </label>
                <select
                  name="truckType"
                  value={formData.truckType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select truck type</option>
                  <option value="skeletal">Skeletal</option>
                  <option value="flatbed">Flatbed</option>
                  <option value="tanker">Tanker</option>
                  <option value="lowbed">Lowbed</option>
                  <option value="box">Box / Dry Van</option>
                </select>
                {errors.truckType && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.truckType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Axle Configuration <span className="text-status-danger">*</span>
                </label>
                <select
                  name="axleConfiguration"
                  value={formData.axleConfiguration}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select axle configuration</option>
                  <option value="4x2">4x2 (2 axles, 1 driven)</option>
                  <option value="6x2">6x2 (3 axles, 1 driven)</option>
                  <option value="6x4">6x4 (3 axles, 2 driven)</option>
                  <option value="8x4">8x4 (4 axles, 2 driven)</option>
                </select>
                {errors.axleConfiguration && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.axleConfiguration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Load Capacity (Tonnes) <span className="text-status-danger">*</span>
                </label>
                <input
                  type="number"
                  name="loadCapacity"
                  value={formData.loadCapacity}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                  min="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.loadCapacity && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.loadCapacity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Container Compatibility <span className="text-status-danger">*</span>
                </label>
                <select
                  name="containerCompatibility"
                  multiple
                  value={formData.containerCompatibility}
                  onChange={handleMultiSelect}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  size="3"
                >
                  <option value="20ft">20ft Container</option>
                  <option value="40ft">40ft Container</option>
                  <option value="45ft">45ft Container</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
                {errors.containerCompatibility && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.containerCompatibility}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Ownership Details */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Ownership Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ownership Type <span className="text-status-danger">*</span>
                </label>
                <select
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select ownership type</option>
                  <option value="owned">Owned</option>
                  <option value="leased">Leased</option>
                  <option value="financed">Financed</option>
                </select>
                {errors.ownershipType && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.ownershipType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Owner Name <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Owner or leasing company name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.ownerName && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.ownerName}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Owner Contact <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="ownerContact"
                  value={formData.ownerContact}
                  onChange={handleChange}
                  placeholder="Phone number or email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.ownerContact && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.ownerContact}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Regulatory Compliance */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Regulatory Compliance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Vehicle License Expiry <span className="text-status-danger">*</span>
                </label>
                <input
                  type="date"
                  name="vehicleLicenseExpiry"
                  value={formData.vehicleLicenseExpiry}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.vehicleLicenseExpiry && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.vehicleLicenseExpiry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Roadworthiness Expiry <span className="text-status-danger">*</span>
                </label>
                <input
                  type="date"
                  name="roadworthinessExpiry"
                  value={formData.roadworthinessExpiry}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.roadworthinessExpiry && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.roadworthinessExpiry}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  FRSC Compliance Status <span className="text-status-danger">*</span>
                </label>
                <select
                  name="frscCompliance"
                  value={formData.frscCompliance}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select compliance status</option>
                  <option value="compliant">Compliant</option>
                  <option value="partially_compliant">Partially Compliant</option>
                  <option value="non_compliant">Non-Compliant</option>
                </select>
                {errors.frscCompliance && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.frscCompliance}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Safety Equipment Declarations */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Safety Equipment Declarations
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasFireExtinguisher"
                  checked={formData.hasFireExtinguisher}
                  onChange={handleChange}
                  className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-2 focus:ring-secondary cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  Vehicle is equipped with a fire extinguisher
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasFirstAidKit"
                  checked={formData.hasFirstAidKit}
                  onChange={handleChange}
                  className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-2 focus:ring-secondary cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  Vehicle has a first aid kit
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasReflectiveTriangle"
                  checked={formData.hasReflectiveTriangle}
                  onChange={handleChange}
                  className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-2 focus:ring-secondary cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  Vehicle has reflective warning triangle
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="hasSpareWheel"
                  checked={formData.hasSpareWheel}
                  onChange={handleChange}
                  className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-2 focus:ring-secondary cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  Vehicle has functional spare wheel
                </span>
              </label>

              {errors.safetyEquipment && (
                <p className="mt-2 text-sm text-status-danger font-medium">{errors.safetyEquipment}</p>
              )}
            </div>
          </div>

          {/* Section 6: Telematics Details */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Telematics Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  GPS Installed <span className="text-status-danger">*</span>
                </label>
                <select
                  name="hasGps"
                  value={formData.hasGps}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.hasGps && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.hasGps}</p>
                )}
              </div>

              {formData.hasGps === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    GPS Provider <span className="text-status-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="gpsProvider"
                    value={formData.gpsProvider}
                    onChange={handleChange}
                    placeholder="e.g., TechAdvance, TrackLogic"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                  {errors.gpsProvider && (
                    <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.gpsProvider}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  E-lock Installed <span className="text-status-danger">*</span>
                </label>
                <select
                  name="hasElock"
                  value={formData.hasElock}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.hasElock && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.hasElock}</p>
                )}
              </div>

              {formData.hasElock === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    E-lock Provider <span className="text-status-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="elockProvider"
                    value={formData.elockProvider}
                    onChange={handleChange}
                    placeholder="e.g., Neology, Traxroot"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                  {errors.elockProvider && (
                    <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.elockProvider}</p>
                  )}
                </div>
              )}

              <div className="md:col-span-2 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="hasPanicButton"
                    checked={formData.hasPanicButton}
                    onChange={handleChange}
                    className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-2 focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Vehicle has panic button
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="supportsGeofencing"
                    checked={formData.supportsGeofencing}
                    onChange={handleChange}
                    className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-2 focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Vehicle supports geofencing alerts
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 7: Operational Details */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Operational Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Current Status <span className="text-status-danger">*</span>
                </label>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select status</option>
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                  <option value="under_maintenance">Under Maintenance</option>
                  <option value="out_of_service">Out of Service</option>
                </select>
                {errors.currentStatus && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.currentStatus}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Assigned Driver (Optional)
                </label>
                <input
                  type="text"
                  name="assignedDriver"
                  value={formData.assignedDriver}
                  onChange={handleChange}
                  placeholder="Driver name or ID"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Assigned Depot <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  name="assignedDepot"
                  value={formData.assignedDepot}
                  onChange={handleChange}
                  placeholder="e.g., Lagos Depot, Apapa Terminal"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {errors.assignedDepot && (
                  <p className="mt-1.5 text-sm text-status-danger font-medium">{errors.assignedDepot}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 8: Document Upload */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Required Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderFileUpload('vehicleLicense', 'Vehicle License')}
              {renderFileUpload('roadworthinessCert', 'Roadworthiness Certificate')}
              {renderFileUpload('insuranceCert', 'Insurance Certificate')}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/fleet/vehicles')}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleFormPage;
