import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';
import FormTextarea from '../../components/common/FormTextarea';
import FormCheckbox from '../../components/common/FormCheckbox';
import { nigerianLocations } from '../../data/demoShipmentData';

const RouteFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showSuccess, showError } = useAlert();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    originType: '',
    originLocationId: '',
    destinationType: '',
    destinationLocationId: '',
    distance: '',
    estimatedDuration: '',
    riskLevel: '',
    insuranceMultiplier: '',
    maxParkingTime: '',
    requiresDaytimeOnly: false,
    tollFees: '',
    alternativeRoutes: '',
    roadConditions: '',
    securityNotes: '',
    waypoints: '',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Send to backend API
    // try {
    //   if (isEditMode) {
    //     await updateRoute({ id, data: formData }).unwrap();
    //     showSuccess('Route updated successfully!');
    //   } else {
    //     await createRoute(formData).unwrap();
    //     showSuccess('Route created successfully!');
    //   }
    //   navigate('/admin/routes');
    // } catch (error) {
    //   showError(error?.data?.message || 'Failed to save route');
    // }

    // Mock success
    showSuccess(isEditMode ? 'Route updated successfully!' : 'Route created successfully!');
    setTimeout(() => navigate('/admin/routes'), 1500);
  };

  const getLocationOptions = (type) => {
    if (!type) return [];
    if (type === 'seaport') return nigerianLocations.seaports;
    if (type === 'icd') return nigerianLocations.icds;
    if (type === 'border_post') return nigerianLocations.borderPosts;
    return [];
  };

  const locationTypes = [
    { value: 'seaport', label: 'Seaport' },
    { value: 'icd', label: 'Inland Container Depot (ICD)' },
    { value: 'border_post', label: 'Border Post' },
  ];

  const riskLevels = [
    { value: 'Low', label: 'Low Risk' },
    { value: 'Medium', label: 'Medium Risk' },
    { value: 'High', label: 'High Risk' },
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/routes')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Route' : 'Create New Route'}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isEditMode ? 'Update route information and settings' : 'Define a new approved container transport route'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
        {/* Basic Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-6">
            <FormInput
              label="Route Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Lagos Ports to Ikeja Industrial Corridor"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Distance (km)"
                name="distance"
                type="number"
                step="0.1"
                value={formData.distance}
                onChange={handleChange}
                placeholder="e.g., 145"
                required
              />

              <FormInput
                label="Estimated Duration"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleChange}
                placeholder="e.g., 4-6 hours"
                required
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Origin */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📍 Origin Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Origin Type"
              name="originType"
              value={formData.originType}
              onChange={handleChange}
              options={locationTypes}
              required
            />

            <FormSelect
              label="Origin Location"
              name="originLocationId"
              value={formData.originLocationId}
              onChange={handleChange}
              options={getLocationOptions(formData.originType).map((loc) => ({
                value: loc.id,
                label: `${loc.name} - ${loc.city}, ${loc.state}`,
              }))}
              disabled={!formData.originType}
              required
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Destination */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📍 Destination Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Destination Type"
              name="destinationType"
              value={formData.destinationType}
              onChange={handleChange}
              options={locationTypes}
              required
            />

            <FormSelect
              label="Destination Location"
              name="destinationLocationId"
              value={formData.destinationLocationId}
              onChange={handleChange}
              options={getLocationOptions(formData.destinationType).map((loc) => ({
                value: loc.id,
                label: `${loc.name} - ${loc.city}, ${loc.state}`,
              }))}
              disabled={!formData.destinationType}
              required
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Risk & Insurance Parameters */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">⚠️ Risk & Insurance Parameters</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                label="Risk Level"
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleChange}
                options={riskLevels}
                helperText="Based on road conditions, security, and historical incident data"
                required
              />

              <FormInput
                label="Insurance Multiplier"
                name="insuranceMultiplier"
                type="number"
                step="0.1"
                min="1.0"
                max="3.0"
                value={formData.insuranceMultiplier}
                onChange={handleChange}
                placeholder="e.g., 1.5"
                helperText="Premium multiplier based on risk (1.0 = base rate)"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Max Parking Time (minutes)"
                name="maxParkingTime"
                type="number"
                value={formData.maxParkingTime}
                onChange={handleChange}
                placeholder="e.g., 45"
                helperText="Maximum allowed parking time without violation"
                required
              />

              <div className="flex items-center h-full pt-8">
                <FormCheckbox
                  label="Requires Daytime-Only Movement"
                  name="requiresDaytimeOnly"
                  checked={formData.requiresDaytimeOnly}
                  onChange={handleChange}
                  helperText="Restrict movement to daytime hours for security"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Additional Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Additional Route Details</h2>
          <div className="space-y-6">
            <FormInput
              label="Toll Fees (NGN)"
              name="tollFees"
              type="number"
              value={formData.tollFees}
              onChange={handleChange}
              placeholder="e.g., 5000"
              helperText="Total toll fees along this route"
            />

            <FormTextarea
              label="Road Conditions"
              name="roadConditions"
              value={formData.roadConditions}
              onChange={handleChange}
              placeholder="Describe road quality, construction zones, known bottlenecks..."
              rows={3}
            />

            <FormTextarea
              label="Security Notes"
              name="securityNotes"
              value={formData.securityNotes}
              onChange={handleChange}
              placeholder="Security considerations, high-risk zones, recommended precautions..."
              rows={3}
            />

            <FormTextarea
              label="Waypoints / Checkpoints"
              name="waypoints"
              value={formData.waypoints}
              onChange={handleChange}
              placeholder="List major waypoints, rest stops, or mandatory checkpoints along this route..."
              rows={3}
            />

            <FormTextarea
              label="Alternative Routes"
              name="alternativeRoutes"
              value={formData.alternativeRoutes}
              onChange={handleChange}
              placeholder="Describe alternative routes in case of road closures or emergencies..."
              rows={3}
            />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Status */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status</h2>
          <FormSelect
            label="Route Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/routes')}
            className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
          >
            {isEditMode ? 'Update Route' : 'Create Route'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RouteFormPage;
