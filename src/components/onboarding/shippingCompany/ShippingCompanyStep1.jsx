import React, { useState } from 'react';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormMultiSelect from '../../common/FormMultiSelect';

const ShippingCompanyStep1 = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    vesselOperationType: initialData?.vesselOperationType || '',
    fleetSize: initialData?.fleetSize || '',
    primaryRoutes: initialData?.primaryRoutes || [],
    averageMonthlyContainers: initialData?.averageMonthlyContainers || '',
    containerOwnership: initialData?.containerOwnership || '',
    ownedContainers: initialData?.ownedContainers || '',
    leasedContainers: initialData?.leasedContainers || '',
    nigerianPortsUsed: initialData?.nigerianPortsUsed || [],
    internationalRoutes: initialData?.internationalRoutes || [],
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name, values) => {
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const vesselOperationTypes = [
    { value: 'deep_sea', label: 'Deep Sea / Ocean Carrier' },
    { value: 'feeder', label: 'Feeder Service' },
    { value: 'coastal', label: 'Coastal Shipping' },
    { value: 'ro_ro', label: 'Ro-Ro (Roll-on/Roll-off)' },
    { value: 'bulk', label: 'Bulk Carrier' },
    { value: 'mixed', label: 'Mixed Operations' },
  ];

  const nigerianPorts = [
    { value: 'APM', label: 'Apapa Port Complex, Lagos' },
    { value: 'TIN', label: 'Tin Can Island Port Complex, Lagos' },
    { value: 'LDP', label: 'Lekki Deep Seaport, Lagos' },
    { value: 'ONN', label: 'Onne Port Complex, Rivers' },
    { value: 'PHC', label: 'Port Harcourt Port, Rivers' },
    { value: 'DLT', label: 'Delta Port Complex, Warri' },
    { value: 'CAL', label: 'Calabar Port Complex, Cross River' },
  ];

  const routeOptions = [
    { value: 'west_africa', label: 'West Africa Coastal' },
    { value: 'europe', label: 'Europe - Nigeria' },
    { value: 'asia', label: 'Asia - Nigeria' },
    { value: 'americas', label: 'Americas - Nigeria' },
    { value: 'middle_east', label: 'Middle East - Nigeria' },
    { value: 'south_africa', label: 'South Africa - Nigeria' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vessel Operations Profile</h2>
        <p className="text-sm text-gray-600">Tell us about your shipping operations and vessel fleet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Vessel Operation Type"
          name="vesselOperationType"
          value={formData.vesselOperationType}
          onChange={handleChange}
          options={vesselOperationTypes}
          required
        />

        <FormInput
          label="Fleet Size (Number of Vessels)"
          name="fleetSize"
          type="number"
          value={formData.fleetSize}
          onChange={handleChange}
          placeholder="e.g., 25"
          required
        />
      </div>

      <FormMultiSelect
        label="Primary Trade Routes"
        name="primaryRoutes"
        selectedValues={formData.primaryRoutes}
        onChange={(values) => handleMultiSelectChange('primaryRoutes', values)}
        options={routeOptions}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Average Monthly Containers Handled"
          name="averageMonthlyContainers"
          type="number"
          value={formData.averageMonthlyContainers}
          onChange={handleChange}
          placeholder="e.g., 5000"
          required
        />

        <FormSelect
          label="Container Ownership Model"
          name="containerOwnership"
          value={formData.containerOwnership}
          onChange={handleChange}
          options={[
            { value: 'owned', label: 'Fully Owned' },
            { value: 'leased', label: 'Fully Leased' },
            { value: 'mixed', label: 'Mixed (Owned + Leased)' },
          ]}
          required
        />
      </div>

      {formData.containerOwnership === 'mixed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
          <FormInput
            label="Number of Owned Containers"
            name="ownedContainers"
            type="number"
            value={formData.ownedContainers}
            onChange={handleChange}
            placeholder="e.g., 10000"
          />

          <FormInput
            label="Number of Leased Containers"
            name="leasedContainers"
            type="number"
            value={formData.leasedContainers}
            onChange={handleChange}
            placeholder="e.g., 5000"
          />
        </div>
      )}

      <FormMultiSelect
        label="Nigerian Ports of Call"
        name="nigerianPortsUsed"
        selectedValues={formData.nigerianPortsUsed}
        onChange={(values) => handleMultiSelectChange('nigerianPortsUsed', values)}
        options={nigerianPorts}
        required
      />

      <FormMultiSelect
        label="International Routes"
        name="internationalRoutes"
        selectedValues={formData.internationalRoutes}
        onChange={(values) => handleMultiSelectChange('internationalRoutes', values)}
        options={routeOptions}
        helperText="Select all international trade routes served"
      />

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-8 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
        >
          Next: Compliance & Integration
        </button>
      </div>
    </form>
  );
};

export default ShippingCompanyStep1;
