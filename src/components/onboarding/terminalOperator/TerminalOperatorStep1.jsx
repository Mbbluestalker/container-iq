import React, { useState } from 'react';
import FormInput from '../../common/FormInput';
import FormSelect from '../../common/FormSelect';
import FormMultiSelect from '../../common/FormMultiSelect';

const TerminalOperatorStep1 = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    terminalType: initialData?.terminalType || '',
    terminalLocation: initialData?.terminalLocation || '',
    yardCapacity: initialData?.yardCapacity || '',
    currentOccupancy: initialData?.currentOccupancy || '',
    operatingHours: initialData?.operatingHours || '',
    averageMonthlyThroughput: initialData?.averageMonthlyThroughput || '',
    storageTypes: initialData?.storageTypes || [],
    handlingEquipment: initialData?.handlingEquipment || [],
    specializedServices: initialData?.specializedServices || [],
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

  const terminalTypes = [
    { value: 'seaport', label: 'Seaport Terminal' },
    { value: 'icd', label: 'Inland Container Depot (ICD)' },
    { value: 'dry_port', label: 'Dry Port' },
    { value: 'cfs', label: 'Container Freight Station (CFS)' },
    { value: 'bonded_warehouse', label: 'Bonded Warehouse' },
    { value: 'mixed', label: 'Mixed Operations' },
  ];

  const terminalLocations = [
    { value: 'APM', label: 'Apapa Port Complex, Lagos' },
    { value: 'TIN', label: 'Tin Can Island Port Complex, Lagos' },
    { value: 'LDP', label: 'Lekki Deep Seaport, Lagos' },
    { value: 'ONN', label: 'Onne Port Complex, Rivers' },
    { value: 'PHC', label: 'Port Harcourt Port, Rivers' },
    { value: 'DLT', label: 'Delta Port Complex, Warri' },
    { value: 'CAL', label: 'Calabar Port Complex, Cross River' },
    { value: 'ICD-IKJ', label: 'Ikeja ICD, Lagos' },
    { value: 'ICD-IBD', label: 'Ibadan ICD, Oyo' },
    { value: 'ICD-KAN', label: 'Kano ICD, Kano' },
    { value: 'ICD-KDN', label: 'Kaduna ICD, Kaduna' },
    { value: 'ICD-JOS', label: 'Jos ICD, Plateau' },
    { value: 'ICD-ABA', label: 'Aba ICD, Abia' },
  ];

  const storageTypeOptions = [
    { value: 'dry_container', label: 'Dry Container Storage' },
    { value: 'reefer', label: 'Refrigerated Container Storage' },
    { value: 'hazmat', label: 'Hazardous Materials Storage' },
    { value: 'open_yard', label: 'Open Yard Storage' },
    { value: 'covered_warehouse', label: 'Covered Warehouse' },
    { value: 'bonded_area', label: 'Bonded Storage Area' },
  ];

  const equipmentOptions = [
    { value: 'rtg', label: 'Rubber Tyred Gantry (RTG) Cranes' },
    { value: 'reach_stacker', label: 'Reach Stackers' },
    { value: 'forklift', label: 'Forklifts' },
    { value: 'empty_handler', label: 'Empty Container Handlers' },
    { value: 'mobile_crane', label: 'Mobile Cranes' },
    { value: 'terminal_tractor', label: 'Terminal Tractors' },
  ];

  const servicesOptions = [
    { value: 'customs_clearance', label: 'Customs Clearance Assistance' },
    { value: 'stuffing_destuffing', label: 'Container Stuffing/Destuffing' },
    { value: 'container_repair', label: 'Container Repair & Maintenance' },
    { value: 'fumigation', label: 'Fumigation Services' },
    { value: 'cargo_inspection', label: 'Cargo Inspection Services' },
    { value: 'reefer_monitoring', label: 'Reefer Monitoring' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Terminal Profile</h2>
        <p className="text-sm text-gray-600">Tell us about your terminal facility and operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Terminal Type"
          name="terminalType"
          value={formData.terminalType}
          onChange={handleChange}
          options={terminalTypes}
          required
        />

        <FormSelect
          label="Terminal Location"
          name="terminalLocation"
          value={formData.terminalLocation}
          onChange={handleChange}
          options={terminalLocations}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormInput
          label="Yard Capacity (TEUs)"
          name="yardCapacity"
          type="number"
          value={formData.yardCapacity}
          onChange={handleChange}
          placeholder="e.g., 5000"
          helperText="Total Twenty-foot Equivalent Units"
          required
        />

        <FormInput
          label="Current Occupancy (%)"
          name="currentOccupancy"
          type="number"
          min="0"
          max="100"
          value={formData.currentOccupancy}
          onChange={handleChange}
          placeholder="e.g., 75"
          required
        />

        <FormInput
          label="Average Monthly Throughput (TEUs)"
          name="averageMonthlyThroughput"
          type="number"
          value={formData.averageMonthlyThroughput}
          onChange={handleChange}
          placeholder="e.g., 2000"
          required
        />
      </div>

      <FormSelect
        label="Operating Hours"
        name="operatingHours"
        value={formData.operatingHours}
        onChange={handleChange}
        options={[
          { value: '24_7', label: '24/7 Operations' },
          { value: 'extended', label: 'Extended Hours (16+ hours/day)' },
          { value: 'business', label: 'Business Hours Only (8-12 hours/day)' },
          { value: 'custom', label: 'Custom Schedule' },
        ]}
        required
      />

      <FormMultiSelect
        label="Storage Types Available"
        name="storageTypes"
        selectedValues={formData.storageTypes}
        onChange={(values) => handleMultiSelectChange('storageTypes', values)}
        options={storageTypeOptions}
        required
      />

      <FormMultiSelect
        label="Handling Equipment"
        name="handlingEquipment"
        selectedValues={formData.handlingEquipment}
        onChange={(values) => handleMultiSelectChange('handlingEquipment', values)}
        options={equipmentOptions}
        helperText="Select all handling equipment available at your terminal"
        required
      />

      <FormMultiSelect
        label="Specialized Services"
        name="specializedServices"
        selectedValues={formData.specializedServices}
        onChange={(values) => handleMultiSelectChange('specializedServices', values)}
        options={servicesOptions}
        helperText="Select additional services offered"
      />

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-8 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
        >
          Next: Operations & Integration
        </button>
      </div>
    </form>
  );
};

export default TerminalOperatorStep1;
