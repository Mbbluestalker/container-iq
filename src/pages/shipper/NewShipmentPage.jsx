import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import { useSelector } from 'react-redux';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';

const NewShipmentPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const { user } = useSelector((state) => state.auth);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  const [formData, setFormData] = useState({
    // Section A: Shipper & Consignment Identification
    shipperName: user?.organizationName || '',
    shipperId: user?.id || '',
    consignmentReference: '', // system-generated
    shipperInternalReference: '',
    consignmentCreationDate: new Date().toISOString().split('T')[0],

    // Section B: Cargo Details
    cargoDescription: '',
    hsCode: '',
    cargoCategory: '',
    packagingType: '',
    cargoWeight: '',
    cargoValue: '',
    currency: 'NGN',

    // Section C: Container Information
    containerAssignmentMode: 'now',
    containers: [],

    // Section D: Origin, Destination & Route
    originType: '',
    originLocation: '',
    destinationType: '',
    destinationLocation: '',
    routeSelectionMethod: '',
    assignedRouteId: '',

    // Section E: Transport & Fleet Assignment
    truckAssignmentPreference: 'now',
    fleetOperatorSelection: '',
    truckTypeRequired: '',
    selectedTruckId: '',
    selectedDriverId: '',

    // Section F: Insurance & Risk Parameters
    insurancePolicyType: '',
    coverageScope: '',
    coverageLimit: '',
    deductible: '',

    // Section G: Compliance & Regulatory Data
    paarNcsId: '',
    customsStatus: '',
    hazardDeclaration: false,

    // Section H: Telematics & Data Consents
    consentContainerTracking: false,
    consentCargoRiskScoring: false,
    consentShareData: false,

    // Section I: Commercial & Operational Notes
    earliestPickupDateTime: '',
    latestDeliveryDateTime: '',
    specialHandlingInstructions: '',
    supportingDocuments: [],

    // Section J: Declaration & Submission
    declaration: false,
    digitalSignature: '',
  });

  const [containerForm, setContainerForm] = useState({
    containerNumber: '',
    containerSize: '',
    containerType: '',
    sealNumber: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleContainerChange = (e) => {
    const { name, value } = e.target;
    setContainerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addContainer = () => {
    if (!containerForm.containerNumber || !containerForm.containerSize || !containerForm.containerType) {
      showError('Please fill in all required container fields');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      containers: [...prev.containers, { ...containerForm, id: Date.now() }],
    }));

    setContainerForm({
      containerNumber: '',
      containerSize: '',
      containerType: '',
      sealNumber: '',
    });
    showSuccess('Container added successfully');
  };

  const removeContainer = (id) => {
    setFormData((prev) => ({
      ...prev,
      containers: prev.containers.filter((c) => c.id !== id),
    }));
    showSuccess('Container removed');
  };

  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.shipperInternalReference) {
        showError('Please provide an internal reference');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.cargoDescription || !formData.cargoCategory || !formData.cargoWeight || !formData.cargoValue) {
        showError('Please fill in all required cargo details');
        return;
      }
    } else if (currentStep === 3) {
      if (formData.containerAssignmentMode === 'now' && formData.containers.length === 0) {
        showError('Please add at least one container');
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.originType || !formData.originLocation || !formData.destinationType || !formData.destinationLocation) {
        showError('Please fill in all origin and destination details');
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation
    if (!formData.declaration) {
      showError('Please accept the declaration to proceed');
      return;
    }

    if (!formData.consentContainerTracking || !formData.consentCargoRiskScoring || !formData.consentShareData) {
      showError('All telematics consents are required');
      return;
    }

    try {
      // API call to create shipment
      console.log('Submitting shipment:', formData);
      showSuccess('Shipment request created successfully!');
      setTimeout(() => navigate('/shipper/shipments'), 1500);
    } catch (error) {
      showError('Failed to create shipment. Please try again.');
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full mx-1 transition-all duration-300 ${
                index + 1 <= currentStep ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderSectionA();
      case 2:
        return renderSectionB();
      case 3:
        return renderSectionC();
      case 4:
        return renderSectionD();
      case 5:
        return renderSectionE();
      case 6:
        return renderSectionF();
      case 7:
        return renderSectionG();
      case 8:
        return renderSectionH();
      case 9:
        return renderSectionI();
      case 10:
        return renderSectionJ();
      default:
        return null;
    }
  };

  // Section A: Shipper & Consignment Identification
  const renderSectionA = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipper & Consignment Identification</h2>
        <p className="text-sm text-gray-600">Basic information about your shipment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Shipper Name"
          name="shipperName"
          value={formData.shipperName}
          onChange={handleChange}
          disabled
          helperText="Auto-filled from your profile"
        />

        <FormInput
          label="Shipper ID"
          name="shipperId"
          value={formData.shipperId}
          onChange={handleChange}
          disabled
          helperText="System-generated"
        />

        <FormInput
          label="Shipper Internal Reference"
          name="shipperInternalReference"
          value={formData.shipperInternalReference}
          onChange={handleChange}
          placeholder="PO number, invoice number, or internal reference"
          required
        />

        <FormInput
          label="Consignment Creation Date"
          name="consignmentCreationDate"
          type="date"
          value={formData.consignmentCreationDate}
          onChange={handleChange}
          disabled
        />
      </div>
    </div>
  );

  // Section B: Cargo Details
  const renderSectionB = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cargo Details</h2>
        <p className="text-sm text-gray-600">Information about the cargo being shipped</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Cargo Description <span className="text-red-600">*</span>
          </label>
          <textarea
            name="cargoDescription"
            value={formData.cargoDescription}
            onChange={handleChange}
            rows="3"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
            placeholder="Plain-language description of goods"
          ></textarea>
        </div>

        <FormInput
          label="HS Code"
          name="hsCode"
          value={formData.hsCode}
          onChange={handleChange}
          placeholder="Optional"
        />

        <FormSelect
          label="Cargo Category"
          name="cargoCategory"
          value={formData.cargoCategory}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select category' },
            { value: 'general_cargo', label: 'General cargo' },
            { value: 'fmcg', label: 'FMCG' },
            { value: 'industrial_goods', label: 'Industrial goods' },
            { value: 'agricultural_produce', label: 'Agricultural produce' },
            { value: 'chemicals_non_hazardous', label: 'Chemicals (non-hazardous)' },
            { value: 'hazardous_cargo', label: 'Hazardous cargo (subject to approval)' },
            { value: 'high_value_cargo', label: 'High-value cargo' },
          ]}
        />

        <FormSelect
          label="Packaging Type"
          name="packagingType"
          value={formData.packagingType}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select packaging type' },
            { value: 'containerised', label: 'Containerised' },
            { value: 'palletised', label: 'Palletised' },
            { value: 'bulk', label: 'Bulk' },
          ]}
        />

        <FormInput
          label="Cargo Weight (metric tonnes)"
          name="cargoWeight"
          type="number"
          step="0.01"
          value={formData.cargoWeight}
          onChange={handleChange}
          placeholder="Gross weight"
          required
        />

        <FormInput
          label="Cargo Value Declaration"
          name="cargoValue"
          type="number"
          step="0.01"
          value={formData.cargoValue}
          onChange={handleChange}
          placeholder="Declared value for insurance"
          required
        />

        <FormSelect
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          options={[
            { value: 'NGN', label: 'NGN (₦)' },
            { value: 'USD', label: 'USD ($)' },
            { value: 'EUR', label: 'EUR (€)' },
            { value: 'GBP', label: 'GBP (£)' },
          ]}
        />
      </div>
    </div>
  );

  // Section C: Container Information
  const renderSectionC = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Container Information</h2>
        <p className="text-sm text-gray-600">Assign containers to this shipment</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Container Assignment Mode <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="containerAssignmentMode"
              value="now"
              checked={formData.containerAssignmentMode === 'now'}
              onChange={handleChange}
              className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700">Containers assigned now</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="containerAssignmentMode"
              value="later"
              checked={formData.containerAssignmentMode === 'later'}
              onChange={handleChange}
              className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700">Containers to be assigned later</span>
          </label>
        </div>
      </div>

      {formData.containerAssignmentMode === 'now' && (
        <>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Container</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput
                label="Container Number"
                name="containerNumber"
                value={containerForm.containerNumber}
                onChange={handleContainerChange}
                placeholder="e.g., ABCD1234567"
                required
              />

              <FormSelect
                label="Container Size"
                name="containerSize"
                value={containerForm.containerSize}
                onChange={handleContainerChange}
                required
                options={[
                  { value: '', label: 'Select size' },
                  { value: '20ft', label: '20ft' },
                  { value: '40ft', label: '40ft' },
                  { value: '40HC', label: '40HC (High Cube)' },
                  { value: 'other', label: 'Other' },
                ]}
              />

              <FormSelect
                label="Container Type"
                name="containerType"
                value={containerForm.containerType}
                onChange={handleContainerChange}
                required
                options={[
                  { value: '', label: 'Select type' },
                  { value: 'dry', label: 'Dry' },
                  { value: 'reefer', label: 'Reefer' },
                  { value: 'tank', label: 'Tank' },
                  { value: 'open_top', label: 'Open-top' },
                  { value: 'flat_rack', label: 'Flat-rack' },
                ]}
              />

              <FormInput
                label="Seal Number"
                name="sealNumber"
                value={containerForm.sealNumber}
                onChange={handleContainerChange}
                placeholder="If available (optional)"
              />
            </div>
            <button
              type="button"
              onClick={addContainer}
              className="w-full px-4 py-2 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:from-secondary/90 hover:to-secondary font-semibold transition-all duration-200 cursor-pointer"
            >
              Add Container
            </button>
          </div>

          {formData.containers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Added Containers ({formData.containers.length})</h3>
              {formData.containers.map((container) => (
                <div key={container.id} className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{container.containerNumber}</p>
                    <p className="text-sm text-gray-600">
                      {container.containerSize} • {container.containerType}
                      {container.sealNumber && ` • Seal: ${container.sealNumber}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeContainer(container.id)}
                    className="px-3 py-1 text-sm text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  // Section D: Origin, Destination & Route
  const renderSectionD = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Origin, Destination & Route</h2>
        <p className="text-sm text-gray-600">Specify pickup and delivery locations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Origin Type"
          name="originType"
          value={formData.originType}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select origin type' },
            { value: 'seaport', label: 'Seaport' },
            { value: 'icd', label: 'Inland container depot (ICD)' },
            { value: 'warehouse_factory', label: 'Warehouse / Factory' },
          ]}
        />

        <FormInput
          label="Origin Location"
          name="originLocation"
          value={formData.originLocation}
          onChange={handleChange}
          placeholder="Port / ICD / Address"
          required
        />

        <FormSelect
          label="Destination Type"
          name="destinationType"
          value={formData.destinationType}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select destination type' },
            { value: 'seaport', label: 'Seaport' },
            { value: 'icd', label: 'ICD' },
            { value: 'warehouse_factory', label: 'Warehouse / Factory' },
            { value: 'border_post', label: 'Border post' },
          ]}
        />

        <FormInput
          label="Destination Location"
          name="destinationLocation"
          value={formData.destinationLocation}
          onChange={handleChange}
          placeholder="Port / ICD / Address"
          required
        />

        <FormSelect
          label="Route Selection Method"
          name="routeSelectionMethod"
          value={formData.routeSelectionMethod}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select route method' },
            { value: 'system_recommended', label: 'System-recommended insured route' },
            { value: 'shipper_selected', label: 'Shipper-selected approved route' },
            { value: 'fleet_selected', label: 'Fleet-selected approved route' },
          ]}
        />

        <FormInput
          label="Assigned Route ID"
          name="assignedRouteId"
          value={formData.assignedRouteId}
          onChange={handleChange}
          placeholder="Auto-linked (optional)"
          helperText="Approved corridor under ContainerIQ"
        />
      </div>
    </div>
  );

  // Section E: Transport & Fleet Assignment
  const renderSectionE = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transport & Fleet Assignment</h2>
        <p className="text-sm text-gray-600">Select fleet operator and truck preferences</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Truck Assignment Preference <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="truckAssignmentPreference"
              value="now"
              checked={formData.truckAssignmentPreference === 'now'}
              onChange={handleChange}
              className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700">Assign truck now</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="truckAssignmentPreference"
              value="later"
              checked={formData.truckAssignmentPreference === 'later'}
              onChange={handleChange}
              className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700">Assign later</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Fleet Operator Selection"
          name="fleetOperatorSelection"
          value={formData.fleetOperatorSelection}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select fleet selection method' },
            { value: 'preferred', label: 'Preferred fleet operator(s)' },
            { value: 'from_queue', label: 'From the queue' },
            { value: 'from_leaderboard', label: 'From the leaderboard' },
            { value: 'open_request', label: 'Open request to ContainerIQ-verified fleet operators' },
          ]}
        />

        <FormSelect
          label="Truck Type Required"
          name="truckTypeRequired"
          value={formData.truckTypeRequired}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select truck type' },
            { value: 'flatbed', label: 'Flatbed' },
            { value: 'skeletal', label: 'Skeletal' },
            { value: 'tanker', label: 'Tanker' },
            { value: 'box_curtain_side', label: 'Box / Curtain-side' },
            { value: 'lowbed', label: 'Lowbed' },
          ]}
        />

        {formData.truckAssignmentPreference === 'now' && (
          <>
            <FormInput
              label="Selected Truck ID"
              name="selectedTruckId"
              value={formData.selectedTruckId}
              onChange={handleChange}
              placeholder="Optional"
            />

            <FormInput
              label="Selected Driver ID"
              name="selectedDriverId"
              value={formData.selectedDriverId}
              onChange={handleChange}
              placeholder="Optional"
            />
          </>
        )}
      </div>
    </div>
  );

  // Section F: Insurance & Risk Parameters
  const renderSectionF = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Insurance & Risk Parameters</h2>
        <p className="text-sm text-gray-600">Select insurance coverage for this shipment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="Insurance Policy Type"
          name="insurancePolicyType"
          value={formData.insurancePolicyType}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select policy type' },
            { value: 'marine_cargo', label: 'Marine cargo (inland transit)' },
            { value: 'all_risk', label: 'All-risk cargo insurance' },
            { value: 'theft_only', label: 'Theft-only / Limited perils' },
          ]}
        />

        <FormSelect
          label="Coverage Scope"
          name="coverageScope"
          value={formData.coverageScope}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select coverage scope' },
            { value: 'port_to_port', label: 'Port-to-port' },
            { value: 'warehouse_to_warehouse', label: 'Warehouse-to-warehouse' },
            { value: 'port_to_warehouse', label: 'Port-to-warehouse' },
          ]}
        />

        <FormInput
          label="Coverage Limit (Maximum sum insured)"
          name="coverageLimit"
          type="number"
          step="0.01"
          value={formData.coverageLimit}
          onChange={handleChange}
          placeholder="Enter amount"
          required
        />

        <FormInput
          label="Deductible / Excess"
          name="deductible"
          type="number"
          step="0.01"
          value={formData.deductible}
          onChange={handleChange}
          placeholder="Applicable deductible amount"
          required
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Conditions / Exclusions (Read-only)
        </label>
        <div className="text-sm text-gray-600 space-y-2">
          <p className="font-semibold">Special Conditions:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Required route compliance</li>
            <li>Mandatory telematics activation</li>
            <li>Maximum parking time allowed</li>
            <li>Daytime-only movement</li>
            <li>Escort requirement for high-value cargo</li>
          </ul>
          <p className="font-semibold mt-3">Exclusions:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Loss due to war or civil unrest</li>
            <li>Damage caused by improper packing</li>
            <li>Movement outside approved routes</li>
            <li>Use of unverified drivers or trucks</li>
            <li>Overloading beyond declared weight</li>
          </ul>
          <p className="text-xs italic mt-3">
            These terms are set by the insurer, reinsurer, regulator, and ContainerIQ risk rules and cannot be modified.
          </p>
        </div>
      </div>
    </div>
  );

  // Section G: Compliance & Regulatory Data
  const renderSectionG = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance & Regulatory Data</h2>
        <p className="text-sm text-gray-600">Customs and compliance information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="PAAR / NCS ID"
          name="paarNcsId"
          value={formData.paarNcsId}
          onChange={handleChange}
          placeholder="If applicable"
        />

        <FormSelect
          label="Customs Status"
          name="customsStatus"
          value={formData.customsStatus}
          onChange={handleChange}
          required
          options={[
            { value: '', label: 'Select customs status' },
            { value: 'import', label: 'Import' },
            { value: 'export', label: 'Export' },
            { value: 'domestic_transit', label: 'Domestic transit' },
          ]}
        />

        <div className="md:col-span-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="hazardDeclaration"
              checked={formData.hazardDeclaration}
              onChange={handleChange}
              className="w-4 h-4 text-secondary focus:ring-secondary rounded cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700">Hazardous cargo declaration</span>
          </label>
        </div>
      </div>
    </div>
  );

  // Section H: Telematics & Data Consents
  const renderSectionH = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Telematics & Data Consents</h2>
        <p className="text-sm text-gray-600">Required consents for tracking and monitoring</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-xl">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="consentContainerTracking"
              checked={formData.consentContainerTracking}
              onChange={handleChange}
              className="w-4 h-4 text-secondary focus:ring-secondary rounded cursor-pointer mt-1"
              required
            />
            <div className="ml-3">
              <span className="text-sm font-semibold text-gray-900">Consent to Container Tracking *</span>
              <p className="text-sm text-gray-600 mt-1">
                Allows ContainerIQ to track the movement and status of assigned containers using telematics and location data throughout the journey, to support cargo visibility, risk monitoring, insurance validity, and faster claims resolution.
              </p>
            </div>
          </label>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="consentCargoRiskScoring"
              checked={formData.consentCargoRiskScoring}
              onChange={handleChange}
              className="w-4 h-4 text-secondary focus:ring-secondary rounded cursor-pointer mt-1"
              required
            />
            <div className="ml-3">
              <span className="text-sm font-semibold text-gray-900">Consent to Cargo Risk Scoring *</span>
              <p className="text-sm text-gray-600 mt-1">
                Allows ContainerIQ to assess the risk level of this cargo using approved data such as route conditions, movement patterns, container status, and handling events, to support appropriate insurance coverage, pricing, and faster claims processing.
              </p>
            </div>
          </label>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              name="consentShareData"
              checked={formData.consentShareData}
              onChange={handleChange}
              className="w-4 h-4 text-secondary focus:ring-secondary rounded cursor-pointer mt-1"
              required
            />
            <div className="ml-3">
              <span className="text-sm font-semibold text-gray-900">Consent to Share Data with Insurers & Regulators *</span>
              <p className="text-sm text-gray-600 mt-1">
                Allows ContainerIQ to securely share relevant shipment, tracking, and compliance data with participating insurers and authorised regulators for insurance coverage, claims handling, compliance monitoring, and audit purposes.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  // Section I: Commercial & Operational Notes
  const renderSectionI = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Commercial & Operational Notes</h2>
        <p className="text-sm text-gray-600">Delivery timeline and special instructions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Earliest Pickup Date/Time"
          name="earliestPickupDateTime"
          type="datetime-local"
          value={formData.earliestPickupDateTime}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Latest Delivery Date/Time"
          name="latestDeliveryDateTime"
          type="datetime-local"
          value={formData.latestDeliveryDateTime}
          onChange={handleChange}
          required
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Special Handling Instructions (Optional)
          </label>
          <textarea
            name="specialHandlingInstructions"
            value={formData.specialHandlingInstructions}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
            placeholder="Any special handling requirements or notes"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Supporting Documents Upload (Optional)
          </label>
          <input
            type="file"
            multiple
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
          />
          <p className="text-xs text-gray-500 mt-1">
            Commercial invoice, packing list, bill of lading, etc.
          </p>
        </div>
      </div>
    </div>
  );

  // Section J: Declaration & Submission
  const renderSectionJ = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Declaration & Submission</h2>
        <p className="text-sm text-gray-600">Final review and submission</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-blue-900">System Outcomes After Submission</h3>
            <ul className="mt-2 text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Insurance cover will be provisionally bound</li>
              <li>Fleet operators will receive shipment requests</li>
              <li>Containers, trucks, drivers, and routes will be digitally linked</li>
              <li>Telematics and compliance monitoring will be activated</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            name="declaration"
            checked={formData.declaration}
            onChange={handleChange}
            className="w-4 h-4 text-secondary focus:ring-secondary rounded cursor-pointer mt-1"
            required
          />
          <div className="ml-3">
            <span className="text-sm font-semibold text-gray-900">Declaration *</span>
            <p className="text-sm text-gray-600 mt-1">
              I confirm that the information provided is accurate and complete, and I agree to the ContainerIQ Terms of Service and applicable insurance conditions.
            </p>
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Digital Signature (Name)"
          name="digitalSignature"
          value={formData.digitalSignature || user?.fullName || ''}
          onChange={handleChange}
          placeholder="Your full name"
          helperText="Auto-filled from your profile"
          disabled
        />

        <FormInput
          label="Timestamp"
          name="timestamp"
          value={new Date().toLocaleString()}
          disabled
          helperText="System-generated"
        />
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Shipment</h1>
          <p className="text-sm text-gray-600 mt-1">
            Set up a new consignment for container movement
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-6">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 px-6 py-3 bg-white border-2 border-primary/30 text-primary rounded-xl hover:border-primary hover:shadow-md font-semibold transition-all duration-200 cursor-pointer"
              >
                Previous
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:from-secondary/90 hover:to-secondary font-semibold transition-all duration-200 shadow-lg cursor-pointer"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 font-semibold transition-all duration-200 shadow-lg cursor-pointer"
              >
                Submit Shipment Request
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewShipmentPage;
