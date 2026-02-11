import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';
import FormCheckbox from '../../components/common/FormCheckbox';

const DriverFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const isEditMode = !!id;

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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setUploadedFiles((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
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
      setIsLoading(true);
      try {
        // TODO: API call to create/update driver
        await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API call

        showSuccess(isEditMode ? 'Driver updated successfully!' : 'Driver created successfully!');
        setTimeout(() => navigate('/fleet/drivers'), 1000);
      } catch (error) {
        showError('Failed to save driver. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
      showError('Please fill in all required fields');
    }
  };

  const renderFileUpload = (fieldName, label, required = false) => {
    const file = uploadedFiles[fieldName];
    const error = errors[fieldName];

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label} {required && <span className="text-status-danger">*</span>}
        </label>
        {file ? (
          <div className="border-2 border-green-200 bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-green-900">{file.name}</p>
                  <p className="text-xs text-green-700">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUploadedFiles((prev) => ({ ...prev, [fieldName]: null }));
                  document.getElementById(fieldName).value = '';
                }}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
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
              className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all"
            >
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="mt-1 text-xs text-gray-600">Click to upload</p>
              </div>
            </label>
          </>
        )}
        {error && <p className="mt-1 text-sm text-status-danger">{error}</p>}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/fleet/drivers')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Identity */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Identity Information</h2>
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
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Government Identification</h2>
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
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Employment Information</h2>
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
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Driver Competency & Training</h2>
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
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Health Declarations</h2>
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
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Driver–Telematics Linkage</h2>
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
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Supporting Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFileUpload('driverLicense', "Driver's License", true)}
              {renderFileUpload('idDocument', 'ID Document (NIN/Passport)', true)}
              {renderFileUpload('trainingCert', 'Training Certificates (Optional)')}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/fleet/drivers')}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-medium transition-colors shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : isEditMode ? 'Update Driver' : 'Create Driver'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverFormPage;
