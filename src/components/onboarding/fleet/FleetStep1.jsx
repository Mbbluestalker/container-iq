import React, { useState, useEffect } from 'react';
import { useSubmitFleetProfileMutation, useGetFleetDetailsQuery } from '../../../services/api';
import { useAlert } from '../../../context/AlertContext';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormMultiSelect from '../../common/FormMultiSelect';

const FleetStep1 = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    trucksCount: initialData?.trucksCount || '',
    truckTypes: initialData?.truckTypes || [],
    truckOwnership: initialData?.truckOwnership || '',
    truckOperationalCorridor: initialData?.truckOperationalCorridor || [],
  });

  const [errors, setErrors] = useState({});
  const [submitFleetProfile, { isLoading }] = useSubmitFleetProfileMutation();
  const { showSuccess, showError } = useAlert();

  // Fetch existing fleet data for prefilling
  const { data: fleetData, isLoading: isLoadingFleetData } = useGetFleetDetailsQuery();

  // Prefill form when data is loaded
  useEffect(() => {
    if (fleetData?.data) {
      const data = fleetData.data;
      setFormData({
        trucksCount: data.trucksCount || '',
        truckTypes: data.truckTypes || [],
        truckOwnership: data.truckOwnership || '',
        truckOperationalCorridor: data.truckOperationalCorridor || [],
      });
    }
  }, [fleetData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.trucksCount) {
      newErrors.trucksCount = 'Number of trucks is required';
    }

    if (formData.truckTypes.length === 0) {
      newErrors.truckTypes = 'Please select at least one truck type';
    }

    if (!formData.truckOwnership) {
      newErrors.truckOwnership = 'Please select ownership model';
    }

    if (formData.truckOperationalCorridor.length === 0) {
      newErrors.truckOperationalCorridor = 'Please select at least one operational corridor';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      try {
        // Check if fleet data already exists to determine POST or PUT
        const isUpdate = !!fleetData?.data;

        // Convert trucksCount to number for the API
        const payload = {
          ...formData,
          trucksCount: parseInt(formData.trucksCount, 10),
        };

        await submitFleetProfile({ data: payload, isUpdate }).unwrap();
        showSuccess('Fleet profile saved successfully!');
        onNext(formData);
      } catch (error) {
        showError(error?.data?.message || 'Failed to save fleet profile');
        console.error('Fleet profile submission error:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const truckTypesOptions = [
    { value: 'skeletal', label: 'Skeletal' },
    { value: 'flatbed', label: 'Flatbed' },
    { value: 'tanker', label: 'Tanker' },
    { value: 'lowbed', label: 'Lowbed' },
    { value: 'box_dry_van', label: 'Box / Dry Van' },
    { value: 'refrigerated', label: 'Refrigerated (Reefer)' },
    { value: 'curtainsider', label: 'Curtainsider' },
    { value: 'tipper_dump', label: 'Tipper / Dump' },
    { value: 'car_carrier', label: 'Car Carrier' },
    { value: 'other', label: 'Other' },
  ];

  const corridorsOptions = [
    { value: 'ports_only', label: 'Ports Only' },
    { value: 'apapa_port', label: 'Lagos Port Complex (Apapa Port)' },
    { value: 'tin_can', label: 'Tin Can Island Port Complex (Lagos)' },
    { value: 'lekki_port', label: 'Lekki Deep Seaport (Lagos)' },
    { value: 'onne_port', label: 'Onne Port (Rivers State)' },
    { value: 'port_harcourt', label: 'Port of Port Harcourt / Rivers Port Complex (Rivers State)' },
    { value: 'delta_port', label: 'Delta Port Complex (Warri) (Delta State)' },
    { value: 'calabar_port', label: 'Calabar Port Complex (Cross River State)' },
    { value: 'corridors_routes', label: 'Corridors / Trade Routes' },
    { value: 'nationwide', label: 'Nationwide' },
    { value: 'state_regional', label: 'State / Regional' },
    { value: 'city_local', label: 'City / Local' },
    { value: 'international', label: 'International / Cross-Border' },
    { value: 'other', label: 'Other' },
  ];

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
        <h2 className="text-2xl font-bold text-gray-900">Fleet Profile</h2>
        <p className="mt-1 text-sm text-gray-600">
          Tell us about your fleet operations and capabilities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Number of Trucks"
          id="trucksCount"
          name="trucksCount"
          type="number"
          value={formData.trucksCount}
          onChange={handleChange}
          error={errors.trucksCount}
          placeholder="e.g., 50"
          required
        />

        <FormMultiSelect
          label="Truck Types Operated"
          id="truckTypes"
          name="truckTypes"
          options={truckTypesOptions}
          selectedValues={formData.truckTypes}
          onChange={handleChange}
          error={errors.truckTypes}
          description="Select all types of trucks you operate (multi-select allowed)"
          required
        />

        <FormSelect
          label="Ownership Model"
          id="truckOwnership"
          name="truckOwnership"
          value={formData.truckOwnership}
          onChange={handleChange}
          error={errors.truckOwnership}
          options={[
            { value: '', label: 'Select ownership model' },
            { value: 'owned', label: 'Owned' },
            { value: 'leased', label: 'Leased' },
            { value: 'both', label: 'Both (Owned & Leased)' },
          ]}
          required
        />

        <FormMultiSelect
          label="Operational Corridors"
          id="truckOperationalCorridor"
          name="truckOperationalCorridor"
          options={corridorsOptions}
          selectedValues={formData.truckOperationalCorridor}
          onChange={handleChange}
          error={errors.truckOperationalCorridor}
          description="Select all corridors where you operate (multi-select allowed)"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default FleetStep1;
