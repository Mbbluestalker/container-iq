import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import { useSelector } from 'react-redux';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';
import {
  availableContainers,
  fleetOperators,
  availableTrucks,
  insuranceProviders,
  nigerianLocations,
  approvedRoutes,
  containerTypeInfo,
  truckTypeInfo,
} from '../../data/demoShipmentData';

const NewShipmentPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const { user } = useSelector((state) => state.auth);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  // UI State
  const [selectedContainerIds, setSelectedContainerIds] = useState([]);
  const [fleetSelectionMode, setFleetSelectionMode] = useState(''); // 'queue', 'preferred', 'leaderboard', 'truck_type'
  const [selectedTruckTypes, setSelectedTruckTypes] = useState([]);
  const [filteredTrucks, setFilteredTrucks] = useState([]);
  const [selectedTruckId, setSelectedTruckId] = useState('');
  const [insuranceSelectionMode, setInsuranceSelectionMode] = useState(''); // 'queue', 'preferred', 'all'
  const [selectedInsurerId, setSelectedInsurerId] = useState('');

  const [formData, setFormData] = useState({
    // Section A: Shipper & Consignment Identification
    shipperName: user?.organization?.legalEntityName || '',
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
    originLocationId: '',
    destinationType: '',
    destinationLocation: '',
    destinationLocationId: '',
    routeSelectionMethod: 'system_recommended',
    assignedRouteId: '',

    // Section E: Transport & Fleet Assignment
    truckAssignmentPreference: 'now',
    fleetOperatorSelection: '',
    fleetOperatorId: '',
    truckTypeRequired: '',
    selectedTruckId: '',
    selectedDriverId: '',

    // Section F: Insurance & Risk Parameters
    insuranceProviderId: '',
    insurancePolicyType: '',
    coverageScope: '',
    coverageLimit: '',
    deductible: '',
    calculatedPremium: 0,

    // Section G: Compliance & Regulatory Data
    paarNcsId: '',
    customsStatus: '',
    hazardDeclaration: 'no',

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

  // Auto-populate digital signature
  useEffect(() => {
    if (user?.profile) {
      const fullName = `${user.profile.firstName || ''} ${user.profile.lastName || ''}`.trim();
      setFormData(prev => ({ ...prev, digitalSignature: fullName }));
    }
  }, [user]);

  // Auto-link route when origin and destination are selected
  useEffect(() => {
    if (formData.originLocationId && formData.destinationLocationId) {
      const matchedRoute = approvedRoutes.find(
        route =>
          route.origin.id === formData.originLocationId &&
          route.destination.id === formData.destinationLocationId
      );
      if (matchedRoute) {
        setFormData(prev => ({
          ...prev,
          assignedRouteId: matchedRoute.id,
        }));
      }
    }
  }, [formData.originLocationId, formData.destinationLocationId]);

  // Filter trucks by selected types
  useEffect(() => {
    if (selectedTruckTypes.length > 0) {
      const filtered = availableTrucks.filter(truck =>
        selectedTruckTypes.includes(truck.type)
      );
      setFilteredTrucks(filtered);
    } else {
      setFilteredTrucks([]);
    }
  }, [selectedTruckTypes]);

  // Calculate insurance premium
  useEffect(() => {
    if (formData.cargoValue && selectedInsurerId) {
      const insurer = insuranceProviders.find(ins => ins.id === selectedInsurerId);
      if (insurer) {
        const premium = (parseFloat(formData.cargoValue) * insurer.basePremiumRate) / 100;
        setFormData(prev => ({ ...prev, calculatedPremium: premium }));
      }
    }
  }, [formData.cargoValue, selectedInsurerId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Container selection
  const toggleContainerSelection = (containerId) => {
    setSelectedContainerIds(prev => {
      if (prev.includes(containerId)) {
        return prev.filter(id => id !== containerId);
      } else {
        return [...prev, containerId];
      }
    });
  };

  const confirmContainerSelection = () => {
    const selectedContainers = availableContainers.filter(c =>
      selectedContainerIds.includes(c.id)
    );
    setFormData(prev => ({ ...prev, containers: selectedContainers }));
    showSuccess(`${selectedContainers.length} container(s) added to shipment`);
  };

  // Truck type checkbox handler
  const handleTruckTypeToggle = (type) => {
    setSelectedTruckTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  // Select truck
  const selectTruck = (truckId) => {
    const truck = availableTrucks.find(t => t.id === truckId);
    if (truck) {
      setSelectedTruckId(truckId);
      setFormData(prev => ({
        ...prev,
        selectedTruckId: truckId,
        selectedDriverId: truck.assignedDriver.id,
        fleetOperatorId: truck.fleetOperatorId,
        fleetOperatorSelection: truck.fleetOperator,
      }));
      showSuccess(`Truck ${truck.plateNumber} selected`);
    }
  };

  // Select insurer
  const selectInsurer = (insurerId) => {
    const insurer = insuranceProviders.find(ins => ins.id === insurerId);
    if (insurer) {
      setSelectedInsurerId(insurerId);
      setFormData(prev => ({
        ...prev,
        insuranceProviderId: insurerId,
      }));
      showSuccess(`${insurer.name} selected`);
    }
  };

  const nextStep = () => {
    // Soft validation
    if (currentStep === 3 && formData.containerAssignmentMode === 'now' && formData.containers.length === 0) {
      showError('Tip: Select at least one container or choose "assign later"');
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('📦 Shipment Request (Demo Data):', formData);
      showSuccess('Shipment request created successfully! (Demo Mode)');
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
          label="Shipper Internal Reference"
          name="shipperInternalReference"
          value={formData.shipperInternalReference}
          onChange={handleChange}
          placeholder="PO number, invoice number, or internal reference (optional)"
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

  // Section C: Container Selection (REDESIGNED)
  const renderSectionC = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Container Selection</h2>
        <p className="text-sm text-gray-600">Select containers from available inventory</p>
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
            <span className="ml-2 text-sm text-gray-700">Select containers now</span>
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
            <span className="ml-2 text-gray-700">Assign later</span>
          </label>
        </div>
      </div>

      {formData.containerAssignmentMode === 'now' && (
        <>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Containers ({availableContainers.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableContainers.map((container) => (
                <div
                  key={container.id}
                  onClick={() => toggleContainerSelection(container.id)}
                  className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                    selectedContainerIds.includes(container.id)
                      ? 'border-secondary bg-secondary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {selectedContainerIds.includes(container.id) && (
                    <div className="absolute top-2 right-2 bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  )}

                  <img
                    src={container.image}
                    alt={container.type}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{containerTypeInfo[container.type]?.icon || '📦'}</span>
                      <div>
                        <p className="font-bold text-gray-900">{container.id}</p>
                        <p className="text-xs text-gray-500">{container.size} • {containerTypeInfo[container.type]?.name}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1">
                      <p><strong>Owner:</strong> {container.owner.shippingCompany}</p>
                      <p><strong>Terminal:</strong> {container.owner.terminal}</p>
                      <p><strong>Location:</strong> {container.currentLocation}</p>
                      <p className={`font-semibold ${container.detentionDays > 5 ? 'text-red-600' : 'text-green-600'}`}>
                        <strong>Detention:</strong> {container.detentionDays} days (₦{(container.dailyDetentionRate * container.detentionDays).toLocaleString()})
                      </p>
                      <p><strong>Condition:</strong> {container.condition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedContainerIds.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-900">{selectedContainerIds.length} container(s) selected</p>
                  <p className="text-sm text-green-700">Click "Confirm Selection" to add to shipment</p>
                </div>
                <button
                  type="button"
                  onClick={confirmContainerSelection}
                  className="px-6 py-2 bg-secondary text-white rounded-xl hover:bg-secondary/90 font-semibold transition-all cursor-pointer"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          )}

          {formData.containers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Added to Shipment ({formData.containers.length})</h3>
              {formData.containers.map((container) => (
                <div key={container.id} className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={container.image} alt={container.type} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <p className="font-semibold text-gray-900">{container.id}</p>
                      <p className="text-sm text-gray-600">
                        {container.size} • {containerTypeInfo[container.type]?.name} • {container.owner.shippingCompany}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        containers: prev.containers.filter(c => c.id !== container.id)
                      }));
                      setSelectedContainerIds(prev => prev.filter(id => id !== container.id));
                    }}
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

  // Section D: Origin, Destination & Route (WITH LOCATION DROPDOWNS)
  const renderSectionD = () => {
    const getLocationOptions = (type) => {
      if (!type) return [];
      if (type === 'seaport') return nigerianLocations.seaports;
      if (type === 'icd') return nigerianLocations.icds;
      if (type === 'border_post') return nigerianLocations.borderPosts;
      return [];
    };

    return (
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

          <FormSelect
            label="Origin Location"
            name="originLocationId"
            value={formData.originLocationId}
            onChange={(e) => {
              const location = getLocationOptions(formData.originType).find(l => l.id === e.target.value);
              setFormData(prev => ({
                ...prev,
                originLocationId: e.target.value,
                originLocation: location?.name || '',
              }));
            }}
            required
            options={[
              { value: '', label: formData.originType ? 'Select location' : 'Select origin type first' },
              ...getLocationOptions(formData.originType).map(loc => ({
                value: loc.id,
                label: `${loc.name} - ${loc.city}, ${loc.state}`
              }))
            ]}
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

          <FormSelect
            label="Destination Location"
            name="destinationLocationId"
            value={formData.destinationLocationId}
            onChange={(e) => {
              const location = getLocationOptions(formData.destinationType).find(l => l.id === e.target.value);
              setFormData(prev => ({
                ...prev,
                destinationLocationId: e.target.value,
                destinationLocation: location?.name || '',
              }));
            }}
            required
            options={[
              { value: '', label: formData.destinationType ? 'Select location' : 'Select destination type first' },
              ...getLocationOptions(formData.destinationType).map(loc => ({
                value: loc.id,
                label: `${loc.name} - ${loc.city}, ${loc.state}`
              }))
            ]}
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
            disabled
            helperText={formData.assignedRouteId ? "Auto-linked approved corridor" : "Route will auto-link after selecting origin and destination"}
          />
        </div>

        {formData.assignedRouteId && approvedRoutes.find(r => r.id === formData.assignedRouteId) && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📍 Route Details</h4>
            {(() => {
              const route = approvedRoutes.find(r => r.id === formData.assignedRouteId);
              return (
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Route:</strong> {route.name}</p>
                  <p><strong>Distance:</strong> {route.distance} km ({route.estimatedDuration})</p>
                  <p><strong>Risk Level:</strong> {route.riskLevel}</p>
                  <p><strong>Max Parking Time:</strong> {route.maxParkingTime} minutes</p>
                  <p><strong>Daytime Only:</strong> {route.requiresDaytimeOnly ? 'Yes' : 'No'}</p>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    );
  };

  // Section E: Fleet/Truck Selection (COMPLETELY REDESIGNED)
  const renderSectionE = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transport & Fleet Assignment</h2>
        <p className="text-sm text-gray-600">Select fleet operator and truck for this shipment</p>
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

      {formData.truckAssignmentPreference === 'now' && (
        <>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Fleet/Truck by:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFleetSelectionMode('queue')}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  fleetSelectionMode === 'queue' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">🚛 Next in Queue</p>
                <p className="text-sm text-gray-600 mt-1">Select the next available fleet operator</p>
              </button>

              <button
                type="button"
                onClick={() => setFleetSelectionMode('preferred')}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  fleetSelectionMode === 'preferred' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">⭐ Preferred Fleet</p>
                <p className="text-sm text-gray-600 mt-1">Search for your preferred fleet operator</p>
              </button>

              <button
                type="button"
                onClick={() => setFleetSelectionMode('leaderboard')}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  fleetSelectionMode === 'leaderboard' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">🏆 Top Performers</p>
                <p className="text-sm text-gray-600 mt-1">Choose from leaderboard (top 20)</p>
              </button>

              <button
                type="button"
                onClick={() => setFleetSelectionMode('truck_type')}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  fleetSelectionMode === 'truck_type' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">🚚 By Truck Type</p>
                <p className="text-sm text-gray-600 mt-1">Filter by specific truck type needed</p>
              </button>
            </div>
          </div>

          {fleetSelectionMode === 'queue' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Next Available Truck</h4>
              {availableTrucks[0] && (
                <div className="border-2 border-secondary rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <img src={availableTrucks[0].image} alt="Truck" className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-bold text-lg">{availableTrucks[0].plateNumber}</p>
                      <p className="text-sm text-gray-600">{availableTrucks[0].manufacturer} {availableTrucks[0].model} ({availableTrucks[0].year})</p>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Fleet:</strong> {availableTrucks[0].fleetOperator}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Driver:</strong> {availableTrucks[0].assignedDriver.name} ({availableTrucks[0].assignedDriver.experience} yrs exp)
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Type:</strong> {truckTypeInfo[availableTrucks[0].type]?.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => selectTruck(availableTrucks[0].id)}
                        className="mt-3 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all cursor-pointer"
                      >
                        Select This Truck
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {fleetSelectionMode === 'leaderboard' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">🏆 Top Performing Fleets</h4>
              <div className="space-y-3">
                {fleetOperators.slice(0, 6).map((fleet, index) => (
                  <div key={fleet.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                      <img src={fleet.logo} alt={fleet.name} className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{fleet.name}</p>
                        <p className="text-sm text-gray-600">
                          Score: {fleet.scorecard.overall} • {fleet.scorecard.rating} • {fleet.availableTrucks} trucks available
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const fleetTrucks = availableTrucks.filter(t => t.fleetOperatorId === fleet.id);
                          if (fleetTrucks.length > 0) {
                            selectTruck(fleetTrucks[0].id);
                          }
                        }}
                        className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all cursor-pointer"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {fleetSelectionMode === 'truck_type' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Filter by Truck Type</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {Object.entries(truckTypeInfo).map(([type, info]) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTruckTypes.includes(type)}
                      onChange={() => handleTruckTypeToggle(type)}
                      className="w-4 h-4 text-secondary rounded"
                    />
                    <span className="text-sm">
                      {info.icon} {info.name}
                    </span>
                  </label>
                ))}
              </div>

              {filteredTrucks.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{filteredTrucks.length} trucks found</p>
                  {filteredTrucks.map(truck => (
                    <div key={truck.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <img src={truck.image} alt="Truck" className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="font-bold">{truck.plateNumber}</p>
                          <p className="text-sm text-gray-600">{truck.manufacturer} {truck.model}</p>
                          <p className="text-sm text-gray-600">Fleet: {truck.fleetOperator}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => selectTruck(truck.id)}
                          className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all cursor-pointer"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedTruckId && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-semibold text-green-900">✓ Truck Selected</p>
              <p className="text-sm text-green-700">
                {availableTrucks.find(t => t.id === selectedTruckId)?.plateNumber} - {availableTrucks.find(t => t.id === selectedTruckId)?.fleetOperator}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );

  // Section F: Insurance Purchase (REDESIGNED)
  const renderSectionF = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Insurance & Risk Parameters</h2>
        <p className="text-sm text-gray-600">Select insurance coverage for this shipment</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Insurance Provider</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setInsuranceSelectionMode('queue')}
            className={`p-4 border-2 rounded-xl text-left transition-all ${
              insuranceSelectionMode === 'queue' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="font-semibold">📋 Next in Queue</p>
            <p className="text-sm text-gray-600 mt-1">Fastest processing</p>
          </button>

          <button
            type="button"
            onClick={() => setInsuranceSelectionMode('preferred')}
            className={`p-4 border-2 rounded-xl text-left transition-all ${
              insuranceSelectionMode === 'preferred' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="font-semibold">⭐ Preferred Insurer</p>
            <p className="text-sm text-gray-600 mt-1">Your saved choice</p>
          </button>

          <button
            type="button"
            onClick={() => setInsuranceSelectionMode('all')}
            className={`p-4 border-2 rounded-xl text-left transition-all ${
              insuranceSelectionMode === 'all' ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="font-semibold">📊 Compare All</p>
            <p className="text-sm text-gray-600 mt-1">View all options</p>
          </button>
        </div>

        {insuranceSelectionMode === 'queue' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            {insuranceProviders[0] && (
              <div className="border-2 border-secondary rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <img src={insuranceProviders[0].logo} alt={insuranceProviders[0].name} className="w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <p className="font-bold text-lg">{insuranceProviders[0].name}</p>
                    <p className="text-sm text-gray-600">Rating: {'⭐'.repeat(Math.floor(insuranceProviders[0].rating))}</p>
                    <p className="text-sm text-gray-600">Claims: {insuranceProviders[0].claimsSettlementTime}</p>
                    <p className="text-sm text-gray-600">Premium Rate: {insuranceProviders[0].basePremiumRate}%</p>
                    <button
                      type="button"
                      onClick={() => selectInsurer(insuranceProviders[0].id)}
                      className="mt-3 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all cursor-pointer"
                    >
                      Select This Insurer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {insuranceSelectionMode === 'all' && (
          <div className="space-y-3">
            {insuranceProviders.map(insurer => (
              <div key={insurer.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <img src={insurer.logo} alt={insurer.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <p className="font-semibold">{insurer.name}</p>
                    <p className="text-sm text-gray-600">
                      Rate: {insurer.basePremiumRate}% • Claims: {insurer.claimsSettlementTime}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectInsurer(insurer.id)}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedInsurerId && (
        <>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-900">✓ Insurer Selected</p>
            <p className="text-sm text-green-700">
              {insuranceProviders.find(ins => ins.id === selectedInsurerId)?.name}
            </p>
            {formData.calculatedPremium > 0 && (
              <p className="text-sm text-green-700 font-semibold mt-2">
                Estimated Premium: ₦{formData.calculatedPremium.toLocaleString()}
              </p>
            )}
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
        </>
      )}
    </div>
  );

  // Section G: Compliance (FIXED: Hazard Declaration as Radio)
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Hazardous Cargo Declaration <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="hazardDeclaration"
                value="yes"
                checked={formData.hazardDeclaration === 'yes'}
                onChange={handleChange}
                className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="hazardDeclaration"
                value="no"
                checked={formData.hazardDeclaration === 'no'}
                onChange={handleChange}
                className="w-4 h-4 text-secondary focus:ring-secondary cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  // Section H: Telematics Consents (UNCHANGED)
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

  // Section I: Commercial Notes (UNCHANGED)
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

  // Section J: Declaration (FIXED: Digital Signature)
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
          value={formData.digitalSignature}
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
      <div className="max-w-6xl mx-auto">
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

        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-6">
            {renderStep()}
          </div>

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
