import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import { useConfirm } from '../../context/ConfirmContext';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';

const ModifyShipmentRequestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const { confirm } = useConfirm();

  // Mock data - would come from API based on id
  const [formData, setFormData] = useState({
    shipmentId: 'SHP-2024-002',
    shipper: 'XYZ Enterprises',
    containerNumber: 'EFGH9876543',
    containerSize: '20ft',
    containerType: 'Reefer',
    origin: 'Tin Can Island Port',
    destination: 'Ota Industrial Area',
    distance: '45km',
    detentionPeriod: '24 hours',
    riskProfile: 'Medium',
    insuranceCoverage: '₦75,000,000',
    expectedPickup: '2024-03-16T08:00',

    // Fields that can be modified
    proposedTruck: '',
    proposedDriver: '',
    proposedRoute: '',
    modificationReason: '',
    additionalNotes: '',
  });

  // Mock trucks and drivers - would come from API
  const availableTrucks = [
    { value: 'ABC-123-XY', label: 'ABC-123-XY - Flatbed (Available)' },
    { value: 'XYZ-456-AB', label: 'XYZ-456-AB - Skeletal (Available)' },
    { value: 'DEF-789-CD', label: 'DEF-789-CD - Tanker (Under Maintenance)' },
  ];

  const availableDrivers = [
    { value: '1', label: 'John Doe - Active' },
    { value: '2', label: 'Jane Smith - Active' },
    { value: '3', label: 'Mike Johnson - Active' },
  ];

  const alternateRoutes = [
    { value: 'route1', label: 'Via Third Mainland Bridge - 45km (Fastest)' },
    { value: 'route2', label: 'Via Ikorodu Road - 52km (Less Traffic)' },
    { value: 'route3', label: 'Via Oshodi - 48km (Alternative)' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.modificationReason.trim()) {
      showError('Please provide a reason for modification');
      return;
    }

    const confirmed = await confirm({
      title: 'Submit Modification',
      message: 'The shipper will be notified of these proposed changes. Do you want to proceed?',
      confirmText: 'Submit',
      cancelText: 'Cancel',
      type: 'info',
    });

    if (confirmed) {
      try {
        // API call to submit modification
        showSuccess('Shipper has been notified of your proposed changes');
        setTimeout(() => navigate('/fleet/shipment-requests'), 1000);
      } catch (error) {
        showError('Failed to submit modification. Please try again.');
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/fleet/shipment-requests')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shipment Requests
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Modify Shipment Request</h1>
          <p className="text-sm text-gray-600 mt-1">
            Propose changes to shipment {formData.shipmentId}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Original Shipment Details (Read-Only) */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">📋</span>
              Original Request Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipment ID</label>
                <p className="text-sm text-gray-900 font-semibold">{formData.shipmentId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipper</label>
                <p className="text-sm text-gray-900 font-semibold">{formData.shipper}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Container</label>
                <p className="text-sm text-gray-900 font-semibold">
                  {formData.containerNumber} ({formData.containerSize} - {formData.containerType})
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                <p className="text-sm text-gray-900 font-semibold">
                  {formData.origin} → {formData.destination}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Pickup</label>
                <p className="text-sm text-gray-900 font-semibold">
                  {new Date(formData.expectedPickup).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detention Period</label>
                <p className="text-sm text-gray-900 font-semibold">{formData.detentionPeriod}</p>
              </div>
            </div>
          </div>

          {/* Proposed Changes */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">✏️</span>
              Propose Changes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Proposed Truck (Optional)"
                name="proposedTruck"
                value={formData.proposedTruck}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Keep original truck assignment' },
                  ...availableTrucks,
                ]}
              />

              <FormSelect
                label="Proposed Driver (Optional)"
                name="proposedDriver"
                value={formData.proposedDriver}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Keep original driver assignment' },
                  ...availableDrivers,
                ]}
              />

              <FormSelect
                label="Alternate Route (Optional)"
                name="proposedRoute"
                value={formData.proposedRoute}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Keep original route' },
                  ...alternateRoutes,
                ]}
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Reason for Modification <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="modificationReason"
                  value={formData.modificationReason}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                  placeholder="Explain why you're proposing these changes..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                  placeholder="Any additional information for the shipper..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Information Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-blue-900">Important Information</h3>
                <p className="mt-1 text-sm text-blue-700">
                  Submitting these changes will notify the shipper of your proposed modifications. Please ensure all changes are necessary and clearly explained in your reason for modification.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/fleet/shipment-requests')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-primary/30 text-primary rounded-xl hover:border-primary hover:shadow-md font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:from-secondary/90 hover:to-secondary font-semibold transition-all duration-200 shadow-lg shadow-secondary/30 cursor-pointer hover:scale-[1.02] hover:shadow-xl"
            >
              Submit Modification Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyShipmentRequestPage;
