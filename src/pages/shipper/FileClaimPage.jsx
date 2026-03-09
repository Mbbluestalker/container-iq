import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FileClaimPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    shipmentId: '',
    containerNumber: '',
    incidentType: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    description: '',
    estimatedLoss: '',
    witnessPresent: 'no',
    witnessDetails: '',
    policeReportFiled: 'no',
    policeReportNumber: '',
    additionalNotes: '',
  });

  const [selectedShipment, setSelectedShipment] = useState(null);

  // Mock shipments with evidence data
  const shipments = [
    {
      id: 'SHP-2024-001',
      containerNumber: 'MSCU1234567',
      route: 'Apapa Port → Ikeja',
      status: 'In Transit',
      insuranceProvider: 'Nigerian Insurance Corp',
      policyNumber: 'NIC-2024-12345',
      // Auto-captured evidence
      evidence: {
        gpsData: {
          lastKnownLocation: 'Lat: 6.5244, Long: 3.3792',
          lastUpdate: '2024-02-15 14:30:00',
          routeDeviation: 'No deviation detected',
        },
        sealStatus: {
          status: 'Breached',
          breachTime: '2024-02-15 14:25:00',
          breachLocation: 'Lat: 6.5244, Long: 3.3792',
        },
        doorEvents: [
          { timestamp: '2024-02-15 08:00:00', event: 'Door Opened', location: 'Apapa Port' },
          { timestamp: '2024-02-15 08:15:00', event: 'Door Closed', location: 'Apapa Port' },
          { timestamp: '2024-02-15 14:25:00', event: 'Unauthorized Door Opening', location: 'Unknown' },
        ],
        tamperAlerts: [
          { timestamp: '2024-02-15 14:25:00', type: 'Seal Breach', severity: 'High' },
          { timestamp: '2024-02-15 14:26:00', type: 'GPS Signal Lost', severity: 'Critical' },
        ],
        batteryLevel: '45%',
        dwellTimes: [
          { location: 'Apapa Port', duration: '2 hours 30 minutes' },
          { location: 'Last known position', duration: '15 minutes (ongoing)' },
        ],
      },
    },
    {
      id: 'SHP-2024-003',
      containerNumber: 'TEMU9876543',
      route: 'Tin Can Port → Ota',
      status: 'Delivered',
      insuranceProvider: 'AIICO Insurance',
      policyNumber: 'AIICO-2024-67890',
      evidence: {
        gpsData: {
          lastKnownLocation: 'Lat: 6.6878, Long: 3.1815',
          lastUpdate: '2024-02-10 16:45:00',
          routeDeviation: 'Minor deviation (2.3 km)',
        },
        sealStatus: {
          status: 'Intact',
          lastChecked: '2024-02-10 16:45:00',
        },
        doorEvents: [
          { timestamp: '2024-02-10 09:00:00', event: 'Door Opened', location: 'Tin Can Port' },
          { timestamp: '2024-02-10 09:30:00', event: 'Door Closed', location: 'Tin Can Port' },
          { timestamp: '2024-02-10 16:30:00', event: 'Door Opened', location: 'Ota Warehouse' },
        ],
        tamperAlerts: [],
        batteryLevel: '78%',
        dwellTimes: [
          { location: 'Tin Can Port', duration: '1 hour 15 minutes' },
          { location: 'Rest stop (approved)', duration: '30 minutes' },
        ],
      },
    },
  ];

  const incidentTypes = [
    'Cargo Theft',
    'Container Damage',
    'Seal Breach',
    'Route Deviation',
    'Delay/Detention',
    'Accident/Collision',
    'Fire/Smoke Damage',
    'Water Damage',
    'Tampering',
    'Other',
  ];

  const handleShipmentSelect = (e) => {
    const shipmentId = e.target.value;
    const shipment = shipments.find(s => s.id === shipmentId);
    setSelectedShipment(shipment);
    setFormData({
      ...formData,
      shipmentId: shipmentId,
      containerNumber: shipment ? shipment.containerNumber : '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In real implementation, this would submit to API
    console.log('Claim submission:', {
      ...formData,
      autoEvidenceAttached: selectedShipment?.evidence,
      submittedBy: user?.email,
      submittedAt: new Date().toISOString(),
    });

    // Navigate to claims page
    alert('Claim filed successfully! Your claim ID is CLM-2024-' + Math.floor(Math.random() * 1000));
    navigate('/shipper/claims');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/shipper/claims')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          ← Back to Claims
        </button>
        <h1 className="text-2xl font-bold text-gray-900">File New Claim</h1>
        <p className="text-gray-600 mt-1">No paperwork needed - ContainerIQ already has the evidence</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipment Selection */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Shipment</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipment ID <span className="text-red-500">*</span>
            </label>
            <select
              name="shipmentId"
              value={formData.shipmentId}
              onChange={handleShipmentSelect}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a shipment</option>
              {shipments.map((shipment) => (
                <option key={shipment.id} value={shipment.id}>
                  {shipment.id} - {shipment.containerNumber} ({shipment.status})
                </option>
              ))}
            </select>
          </div>

          {selectedShipment && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Shipment Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-blue-700">Container:</span>
                  <span className="ml-2 text-blue-900 font-medium">{selectedShipment.containerNumber}</span>
                </div>
                <div>
                  <span className="text-blue-700">Route:</span>
                  <span className="ml-2 text-blue-900 font-medium">{selectedShipment.route}</span>
                </div>
                <div>
                  <span className="text-blue-700">Insurance Provider:</span>
                  <span className="ml-2 text-blue-900 font-medium">{selectedShipment.insuranceProvider}</span>
                </div>
                <div>
                  <span className="text-blue-700">Policy Number:</span>
                  <span className="ml-2 text-blue-900 font-medium">{selectedShipment.policyNumber}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Auto-Captured Evidence */}
        {selectedShipment && (
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
            <h2 className="text-lg font-semibold text-green-900 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Auto-Captured Evidence (Already Attached)
            </h2>
            <p className="text-sm text-green-800 mb-4">ContainerIQ has automatically captured and will attach the following evidence to your claim:</p>

            <div className="space-y-3">
              {/* GPS Data */}
              <div className="bg-white p-3 rounded">
                <p className="font-medium text-gray-900 text-sm mb-1">GPS Tracking Data</p>
                <p className="text-xs text-gray-600">Last Location: {selectedShipment.evidence.gpsData.lastKnownLocation}</p>
                <p className="text-xs text-gray-600">Last Update: {selectedShipment.evidence.gpsData.lastUpdate}</p>
                <p className="text-xs text-gray-600">Route Deviation: {selectedShipment.evidence.gpsData.routeDeviation}</p>
              </div>

              {/* Seal Status */}
              <div className="bg-white p-3 rounded">
                <p className="font-medium text-gray-900 text-sm mb-1">Seal Status</p>
                <p className="text-xs text-gray-600">Status: {selectedShipment.evidence.sealStatus.status}</p>
                {selectedShipment.evidence.sealStatus.breachTime && (
                  <>
                    <p className="text-xs text-red-600 font-medium">Breach Time: {selectedShipment.evidence.sealStatus.breachTime}</p>
                    <p className="text-xs text-red-600 font-medium">Breach Location: {selectedShipment.evidence.sealStatus.breachLocation}</p>
                  </>
                )}
              </div>

              {/* Door Events */}
              <div className="bg-white p-3 rounded">
                <p className="font-medium text-gray-900 text-sm mb-1">Door Events ({selectedShipment.evidence.doorEvents.length})</p>
                {selectedShipment.evidence.doorEvents.slice(0, 3).map((event, idx) => (
                  <p key={idx} className="text-xs text-gray-600">
                    {event.timestamp} - {event.event} @ {event.location}
                  </p>
                ))}
              </div>

              {/* Tamper Alerts */}
              {selectedShipment.evidence.tamperAlerts.length > 0 && (
                <div className="bg-white p-3 rounded">
                  <p className="font-medium text-gray-900 text-sm mb-1">Tamper Alerts ({selectedShipment.evidence.tamperAlerts.length})</p>
                  {selectedShipment.evidence.tamperAlerts.map((alert, idx) => (
                    <p key={idx} className="text-xs text-red-600">
                      {alert.timestamp} - {alert.type} (Severity: {alert.severity})
                    </p>
                  ))}
                </div>
              )}

              {/* Battery & Dwell Time */}
              <div className="bg-white p-3 rounded">
                <p className="font-medium text-gray-900 text-sm mb-1">Additional Data</p>
                <p className="text-xs text-gray-600">Battery Level: {selectedShipment.evidence.batteryLevel}</p>
                <p className="text-xs text-gray-600">Dwell Times: {selectedShipment.evidence.dwellTimes.length} recorded</p>
              </div>
            </div>
          </div>
        )}

        {/* Incident Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type <span className="text-red-500">*</span>
              </label>
              <select
                name="incidentType"
                value={formData.incidentType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select incident type</option>
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Loss Amount (₦) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="estimatedLoss"
                value={formData.estimatedLoss}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="incidentTime"
                value={formData.incidentTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Incident Location
            </label>
            <input
              type="text"
              name="incidentLocation"
              value={formData.incidentLocation}
              onChange={handleChange}
              placeholder="If known (GPS data is auto-captured)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description of Incident <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe what happened..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Were there any witnesses?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="witnessPresent"
                    value="yes"
                    checked={formData.witnessPresent === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="witnessPresent"
                    value="no"
                    checked={formData.witnessPresent === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.witnessPresent === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Witness Details
                </label>
                <textarea
                  name="witnessDetails"
                  value={formData.witnessDetails}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Name, contact information, and brief statement..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Was a police report filed?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="policeReportFiled"
                    value="yes"
                    checked={formData.policeReportFiled === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="policeReportFiled"
                    value="no"
                    checked={formData.policeReportFiled === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {formData.policeReportFiled === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Police Report Number
                </label>
                <input
                  type="text"
                  name="policeReportNumber"
                  value={formData.policeReportNumber}
                  onChange={handleChange}
                  placeholder="Enter police report number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={3}
                placeholder="Any other relevant information..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Important:</span> By submitting this claim, you confirm that all information provided is accurate and complete. ContainerIQ will automatically attach all captured telematics evidence to support your claim.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/shipper/claims')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Submit Claim
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FileClaimPage;
