import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from '../../context/AlertContext';
import { useCreateDriverMutation, useUpdateDriverMutation, useUploadFileMutation, useGetDriverByIdQuery } from '../../services/api';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';
import FormCheckbox from '../../components/common/FormCheckbox';

const DriverFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const { user } = useSelector((state) => state.auth);
  const isEditMode = !!id;

  const [createDriver, { isLoading: isCreating }] = useCreateDriverMutation();
  const [updateDriver, { isLoading: isUpdating }] = useUpdateDriverMutation();
  const [uploadFile] = useUploadFileMutation();

  // Fetch driver data in edit mode
  const { data: driverData, isLoading: isFetchingDriver, isError: isFetchError } = useGetDriverByIdQuery(id, {
    skip: !isEditMode, // Skip the query if not in edit mode
  });

  const [formData, setFormData] = useState({
    // Basic Identity
    fullName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    nationality: 'Nigerian',

    // Government ID
    nin: '',
    licenseNumber: '',
    licenseClass: '',
    licenseIssueDate: '',
    licenseExpiryDate: '',

    // Employment
    employmentType: '',
    driverId: '',
    dateEngaged: '',
    assignedDepot: '',

    // Competency
    yearsExperience: '',
    hasHeavyVehicleExp: false,
    hasSafetyTraining: false,
    lastTrainingDate: '',

    // Compliance
    isMedicallyFit: false,
    noLicenseSuspension: false,
    noTrafficConvictions: false,

    // Telematics
    hasDriverApp: false,
    behaviorMonitoringConsent: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    driverLicense: null,
    idDocument: null,
    trainingCert: null,
  });

  const [uploadingFiles, setUploadingFiles] = useState({
    driverLicense: false,
    idDocument: false,
    trainingCert: false,
  });

  const [errors, setErrors] = useState({});
  const isLoading = isCreating || isUpdating;

  // Populate form when driver data is fetched in edit mode
  useEffect(() => {
    if (isEditMode && driverData?.data) {
      const driver = driverData.data;

      setFormData({
        // Basic Identity
        fullName: driver.fullName || '',
        dateOfBirth: driver.dob || '',
        phone: driver.phoneNumber || '',
        email: driver.email || '',
        address: driver.residentialAddress || '',
        nationality: driver.nationality || 'Nigerian',

        // Government ID
        nin: driver.nin || '',
        licenseNumber: driver.licenseNumber || '',
        licenseClass: driver.licenseClass || '',
        licenseIssueDate: driver.licenseIssueDate || '',
        licenseExpiryDate: driver.licenseExpiry || '',

        // Employment
        employmentType: driver.employmentType || '',
        driverId: driver.driverId || '',
        dateEngaged: driver.dateEngaged || '',
        assignedDepot: driver.assignedDepot || '',

        // Competency
        yearsExperience: driver.yearsOfExp || '',
        hasHeavyVehicleExp: driver.heavyExp || false,
        hasSafetyTraining: driver.safeDefTraining || false,
        lastTrainingDate: driver.lastTrainingDate || '',

        // Compliance
        isMedicallyFit: driver.isMedFitness || false,
        noLicenseSuspension: driver.isNotSuspended || false,
        noTrafficConvictions: driver.isNotTrafficConvict || false,

        // Telematics
        hasDriverApp: driver.isAppInstalled || false,
        behaviorMonitoringConsent: driver.isMonitorConsent || false,
      });

      // Populate existing file URLs
      setUploadedFiles({
        driverLicense: driver.driverLicenseDocUrl ? {
          url: driver.driverLicenseDocUrl,
          originalFilename: 'Driver License',
          size: 0,
        } : null,
        idDocument: driver.identityDocUrl ? {
          url: driver.identityDocUrl,
          originalFilename: 'ID Document',
          size: 0,
        } : null,
        trainingCert: driver.trainCertDocUrl ? {
          url: driver.trainCertDocUrl,
          originalFilename: 'Training Certificate',
          size: 0,
        } : null,
      });
    }
  }, [isEditMode, driverData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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

      try {
        const response = await uploadFile({
          file: file,
          folder: 'driver-documents',
        }).unwrap();

        setUploadedFiles((prev) => ({
          ...prev,
          [name]: {
            publicId: response.data.publicId,
            url: response.data.secureUrl,
            originalFilename: file.name,
            size: file.size,
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

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.nin.trim()) newErrors.nin = 'NIN is required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    if (!formData.licenseClass) newErrors.licenseClass = 'License class is required';
    if (!formData.licenseExpiryDate) newErrors.licenseExpiryDate = 'License expiry date is required';
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
    if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';

    if (!formData.isMedicallyFit) newErrors.isMedicallyFit = 'Medical fitness declaration required';
    if (!formData.noLicenseSuspension) newErrors.noLicenseSuspension = 'License suspension declaration required';
    if (!formData.noTrafficConvictions) newErrors.noTrafficConvictions = 'Traffic convictions declaration required';
    if (!formData.behaviorMonitoringConsent) newErrors.behaviorMonitoringConsent = 'Behavior monitoring consent required';

    if (!uploadedFiles.driverLicense && !isEditMode) newErrors.driverLicense = "Driver's license is required";
    if (!uploadedFiles.idDocument && !isEditMode) newErrors.idDocument = 'ID document is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        // Map form data to API payload format
        const payload = {
          fleetId: user?.fleet?.id || '', // Fleet ID from user.fleet.id
          fullName: formData.fullName,
          dob: formData.dateOfBirth,
          phoneNumber: formData.phone,
          email: formData.email || '',
          residentialAddress: formData.address || '',
          nationality: formData.nationality,
          nin: formData.nin,
          licenseNumber: formData.licenseNumber,
          licenseClass: formData.licenseClass,
          licenseExpiry: formData.licenseExpiryDate,
          employmentType: formData.employmentType,
          driverId: formData.driverId || '',
          assignedDepot: formData.assignedDepot || '',
          dateEngaged: formData.dateEngaged || '',
          yearsOfExp: formData.yearsExperience.toString(),
          lastTrainingDate: formData.lastTrainingDate || '',
          heavyExp: formData.hasHeavyVehicleExp,
          safeDefTraining: formData.hasSafetyTraining,
          isMedFitness: formData.isMedicallyFit,
          isNotSuspended: formData.noLicenseSuspension,
          isNotTrafficConvict: formData.noTrafficConvictions,
          isAppInstalled: formData.hasDriverApp,
          isMonitorConsent: formData.behaviorMonitoringConsent,
          driverLicenseDocUrl: uploadedFiles.driverLicense?.url || '',
          identityDocUrl: uploadedFiles.idDocument?.url || '',
          trainCertDocUrl: uploadedFiles.trainingCert?.url || '',
        };

        if (isEditMode) {
          await updateDriver({ id, driverData: payload }).unwrap();
          showSuccess('Driver updated successfully!');
        } else {
          await createDriver(payload).unwrap();
          showSuccess('Driver created successfully!');
        }

        setTimeout(() => navigate('/fleet/drivers'), 1000);
      } catch (error) {
        showError(error?.data?.message || 'Failed to save driver. Please try again.');
        console.error('Driver save error:', error);
      }
    } else {
      setErrors(newErrors);
      showError('Please fill in all required fields');
    }
  };

  const renderFileUpload = (fieldName, label, required = false) => {
    const file = uploadedFiles[fieldName];
    const isUploading = uploadingFiles[fieldName];
    const error = errors[fieldName];

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-status-danger">*</span>}
        </label>
        {isUploading ? (
          <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm font-medium text-blue-900">Uploading...</p>
            </div>
          </div>
        ) : file ? (
          <div className="border-2 border-green-200 bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-900">{file.originalFilename}</p>
                  <p className="text-xs text-green-700">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUploadedFiles((prev) => ({ ...prev, [fieldName]: null }));
                  document.getElementById(fieldName).value = '';
                }}
                className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <>
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
              className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-all duration-200 hover:scale-[1.01] group"
            >
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-gray-400 group-hover:text-secondary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-1 text-xs text-gray-600 group-hover:text-secondary transition-colors">Click to upload</p>
              </div>
            </label>
          </>
        )}
        {error && <p className="mt-1 text-sm text-status-danger">{error}</p>}
      </div>
    );
  };

  // Loading state while fetching driver data
  if (isEditMode && isFetchingDriver) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-secondary mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-sm font-medium text-gray-900">Loading driver data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state if fetching driver fails
  if (isEditMode && isFetchError) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-900">Failed to load driver data</h3>
                <p className="mt-1 text-sm text-red-700">The driver could not be found or there was an error loading the data.</p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate('/fleet/drivers')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium cursor-pointer"
              >
                Back to Drivers
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/fleet/drivers')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Drivers
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Driver' : 'Add New Driver'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isEditMode ? 'Update driver information' : 'Complete the form to add a new driver to your fleet'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Identity */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">1</span>
              Basic Identity Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
              />
              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                required
              />
              <FormInput
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
              <FormInput
                label="Email (Optional)"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <FormInput
                  label="Residential Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <FormSelect
                label="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                options={[
                  { value: 'Nigerian', label: 'Nigerian' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
            </div>
          </div>

          {/* Government ID */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">2</span>
              Government Identification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="NIN"
                name="nin"
                value={formData.nin}
                onChange={handleChange}
                error={errors.nin}
                required
              />
              <FormInput
                label="Driver's License Number"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                error={errors.licenseNumber}
                required
              />
              <FormSelect
                label="License Class"
                name="licenseClass"
                value={formData.licenseClass}
                onChange={handleChange}
                error={errors.licenseClass}
                options={[
                  { value: '', label: 'Select license class' },
                  { value: 'A', label: 'Class A' },
                  { value: 'B', label: 'Class B' },
                  { value: 'C', label: 'Class C' },
                  { value: 'D', label: 'Class D' },
                  { value: 'E', label: 'Class E' },
                ]}
                required
              />
              <FormInput
                label="License Issue Date"
                name="licenseIssueDate"
                type="date"
                value={formData.licenseIssueDate}
                onChange={handleChange}
              />
              <FormInput
                label="License Expiry Date"
                name="licenseExpiryDate"
                type="date"
                value={formData.licenseExpiryDate}
                onChange={handleChange}
                error={errors.licenseExpiryDate}
                required
              />
            </div>
          </div>

          {/* Employment Information */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">3</span>
              Employment Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Employment Type"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                error={errors.employmentType}
                options={[
                  { value: '', label: 'Select employment type' },
                  { value: 'Full-time', label: 'Full-time' },
                  { value: 'Contract', label: 'Contract' },
                  { value: 'Third-party', label: 'Third-party' },
                ]}
                required
              />
              <FormInput
                label="Driver ID (Internal)"
                name="driverId"
                value={formData.driverId}
                onChange={handleChange}
              />
              <FormInput
                label="Date Engaged"
                name="dateEngaged"
                type="date"
                value={formData.dateEngaged}
                onChange={handleChange}
              />
              <FormInput
                label="Assigned Depot/Location"
                name="assignedDepot"
                value={formData.assignedDepot}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Competency */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">4</span>
              Driver Competency & Training
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Years of Driving Experience"
                name="yearsExperience"
                type="number"
                value={formData.yearsExperience}
                onChange={handleChange}
                error={errors.yearsExperience}
                required
              />
              <FormInput
                label="Last Training Date"
                name="lastTrainingDate"
                type="date"
                value={formData.lastTrainingDate}
                onChange={handleChange}
              />
              <div className="md:col-span-2 space-y-3">
                <FormCheckbox
                  label="Heavy Vehicle Experience"
                  name="hasHeavyVehicleExp"
                  checked={formData.hasHeavyVehicleExp}
                  onChange={handleChange}
                />
                <FormCheckbox
                  label="Safety/Defensive Driving Training"
                  name="hasSafetyTraining"
                  checked={formData.hasSafetyTraining}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Compliance & Health Declarations */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">5</span>
              Compliance & Health Declarations
            </h2>
            <div className="space-y-3">
              <FormCheckbox
                label="I declare medical fitness"
                description="Driver is medically fit to operate commercial vehicles"
                name="isMedicallyFit"
                checked={formData.isMedicallyFit}
                onChange={handleChange}
                error={errors.isMedicallyFit}
                required
              />
              <FormCheckbox
                label="No active license suspension"
                description="Driver's license is not currently suspended or restricted"
                name="noLicenseSuspension"
                checked={formData.noLicenseSuspension}
                onChange={handleChange}
                error={errors.noLicenseSuspension}
                required
              />
              <FormCheckbox
                label="No serious traffic convictions"
                description="No serious traffic violations in the past 3 years"
                name="noTrafficConvictions"
                checked={formData.noTrafficConvictions}
                onChange={handleChange}
                error={errors.noTrafficConvictions}
                required
              />
            </div>
          </div>

          {/* Telematics */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">6</span>
              Driver–Telematics Linkage
            </h2>
            <div className="space-y-3">
              <FormCheckbox
                label="Driver App Installed"
                name="hasDriverApp"
                checked={formData.hasDriverApp}
                onChange={handleChange}
              />
              <FormCheckbox
                label="Driver Behaviour Monitoring Consent"
                description="Allows ContainerIQ to use driving behaviour data (such as speed patterns, braking, and route compliance) collected via telematics to improve safety, risk assessment, and insurance outcomes, with due consideration given to road conditions, infrastructure limitations, and other environmental factors beyond the driver's or fleet operator's control."
                name="behaviorMonitoringConsent"
                checked={formData.behaviorMonitoringConsent}
                onChange={handleChange}
                error={errors.behaviorMonitoringConsent}
                required
              />
            </div>
          </div>

          {/* Document Uploads */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">7</span>
              Supporting Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFileUpload('driverLicense', "Driver's License", true)}
              {renderFileUpload('idDocument', 'ID Document (NIN/Passport)', true)}
              {renderFileUpload('trainingCert', 'Training Certificates (Optional)')}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/fleet/drivers')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-primary/30 text-primary rounded-xl hover:border-primary hover:shadow-md font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:from-secondary/90 hover:to-secondary font-semibold transition-all duration-200 shadow-lg shadow-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-[1.02] hover:shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                isEditMode ? 'Update Driver' : 'Create Driver'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverFormPage;
