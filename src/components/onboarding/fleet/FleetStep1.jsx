import React, { useState } from 'react';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormMultiSelect from '../../common/FormMultiSelect';

const FleetStep1 = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    numberOfTrucks: initialData?.numberOfTrucks || '',
    truckTypes: initialData?.truckTypes || [],
    ownershipModel: initialData?.ownershipModel || '',
    operationalCorridors: initialData?.operationalCorridors || [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.numberOfTrucks.trim()) {
      newErrors.numberOfTrucks = 'Number of trucks is required';
    }

    if (formData.truckTypes.length === 0) {
      newErrors.truckTypes = 'Please select at least one truck type';
    }

    if (!formData.ownershipModel) {
      newErrors.ownershipModel = 'Please select ownership model';
    }

    if (formData.operationalCorridors.length === 0) {
      newErrors.operationalCorridors = 'Please select at least one operational corridor';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
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
          id="numberOfTrucks"
          name="numberOfTrucks"
          type="number"
          value={formData.numberOfTrucks}
          onChange={handleChange}
          error={errors.numberOfTrucks}
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
          id="ownershipModel"
          name="ownershipModel"
          value={formData.ownershipModel}
          onChange={handleChange}
          error={errors.ownershipModel}
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
          id="operationalCorridors"
          name="operationalCorridors"
          options={corridorsOptions}
          selectedValues={formData.operationalCorridors}
          onChange={handleChange}
          error={errors.operationalCorridors}
          description="Select all corridors where you operate (multi-select allowed)"
          required
        />

        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-lg text-base font-semibold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-200 cursor-pointer shadow-lg shadow-secondary/20"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default FleetStep1;
