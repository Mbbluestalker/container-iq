import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';
import FormTextarea from '../../components/common/FormTextarea';

const DeviceFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showSuccess, showError } = useAlert();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    serialNumber: '',
    manufacturer: '',
    model: '',
    firmwareVersion: '',
    simNumber: '',
    imeiNumber: '',
    purchaseDate: '',
    purchaseCost: '',
    warrantyExpiry: '',
    condition: 'Excellent',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Send to backend API
    // try {
    //   if (isEditMode) {
    //     await updateDevice({ id, data: formData }).unwrap();
    //     showSuccess('Device updated successfully!');
    //   } else {
    //     await createDevice(formData).unwrap();
    //     showSuccess('Device registered successfully!');
    //   }
    //   navigate('/admin/devices');
    // } catch (error) {
    //   showError(error?.data?.message || 'Failed to save device');
    // }

    // Mock success
    showSuccess(isEditMode ? 'Device updated successfully!' : 'Device registered successfully!');
    setTimeout(() => navigate('/admin/devices'), 1500);
  };

  const conditionOptions = [
    { value: 'Excellent', label: 'Excellent - Like new, no issues' },
    { value: 'Good', label: 'Good - Minor wear, fully functional' },
    { value: 'Fair', label: 'Fair - Visible wear, some issues' },
    { value: 'Poor', label: 'Poor - Significant damage, requires repair' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/devices')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Device' : 'Register New GPS e-Lock Device'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isEditMode ? 'Update device information and specifications' : 'Add a new GPS e-Lock device to the inventory'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
        {/* Device Identification */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📱 Device Identification</h2>
          <div className="space-y-6">
            <FormInput
              label="Serial Number"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              placeholder="e.g., GPS-2024-001234"
              helperText="Unique identifier for the device"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="IMEI Number"
                name="imeiNumber"
                value={formData.imeiNumber}
                onChange={handleChange}
                placeholder="e.g., 352099001234567"
                helperText="15-digit International Mobile Equipment Identity"
                required
              />

              <FormInput
                label="SIM Card Number"
                name="simNumber"
                value={formData.simNumber}
                onChange={handleChange}
                placeholder="e.g., +234-800-555-0123"
                helperText="SIM card phone number for data transmission"
                required
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Device Specifications */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🔧 Device Specifications</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                placeholder="e.g., GPS Logistics Tech"
                required
              />

              <FormInput
                label="Model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g., GLT-5000 Pro"
                required
              />
            </div>

            <FormInput
              label="Firmware Version"
              name="firmwareVersion"
              value={formData.firmwareVersion}
              onChange={handleChange}
              placeholder="e.g., 2.4.1"
              helperText="Current firmware version installed on the device"
              required
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Purchase Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">💰 Purchase Information</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Purchase Date"
                name="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Purchase Cost (NGN)"
                name="purchaseCost"
                type="number"
                value={formData.purchaseCost}
                onChange={handleChange}
                placeholder="e.g., 125000"
                helperText="Original purchase cost in Nigerian Naira"
                required
              />
            </div>

            <FormInput
              label="Warranty Expiry Date"
              name="warrantyExpiry"
              type="date"
              value={formData.warrantyExpiry}
              onChange={handleChange}
              helperText="Date when manufacturer warranty expires"
              required
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Condition & Notes */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Condition & Notes</h2>
          <div className="space-y-6">
            <FormSelect
              label="Physical Condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              options={conditionOptions}
              helperText="Current physical condition of the device"
              required
            />

            <FormTextarea
              label="Additional Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional notes about the device (e.g., special features, known issues, maintenance history)..."
              rows={4}
              helperText="Optional field for any additional information"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/devices')}
            className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
          >
            {isEditMode ? 'Update Device' : 'Register Device'}
          </button>
        </div>
      </form>

      {/* Information Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Device Registration Guidelines</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Ensure all serial numbers and IMEI numbers are verified before registration</li>
          <li>• SIM cards should be activated and tested for data connectivity</li>
          <li>• Firmware should be updated to the latest version before deployment</li>
          <li>• All devices must pass quality control checks before being marked as "Available"</li>
          <li>• Keep warranty information and purchase receipts for reference</li>
          <li>• Document any pre-existing damage or issues in the notes field</li>
        </ul>
      </div>
    </div>
  );
};

export default DeviceFormPage;
