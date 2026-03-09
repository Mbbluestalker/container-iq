import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TrackShipmentsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shipmentIdFromUrl = searchParams.get('id');

  const [selectedShipmentId, setSelectedShipmentId] = useState(shipmentIdFromUrl || '1');

  // Mock data - would come from API
  const shipments = [
    {
      id: '1',
      shipmentId: 'SHP-2024-001',
      consignmentReference: 'CNS-2024-001',
      status: 'In Transit',
      containerNumber: 'ABCD1234567',
      origin: 'Apapa Port, Lagos',
      destination: 'Ikeja Warehouse, Lagos',
      currentLocation: 'Ojota, Lagos',
      truckNumber: 'ABC-123-XY',
      driverName: 'John Doe',
      driverPhone: '08012345678',
      fleetOperator: 'ABC Transport Ltd',
      eta: '2 hours 15 mins',
      progress: 65,
      startTime: '2024-03-15 08:00 AM',
      expectedDelivery: '2024-03-15 06:00 PM',
      sealStatus: 'Intact',
      gpsStatus: 'Active',
      batteryLevel: 85,
      lastUpdate: '5 mins ago',
      alerts: [],
      timeline: [
        {
          event: 'Container picked up from port',
          location: 'Apapa Port',
          time: '2024-03-15 08:00 AM',
          status: 'completed'
        },
        {
          event: 'GPS and seal activated',
          location: 'Apapa Port Gate',
          time: '2024-03-15 08:15 AM',
          status: 'completed'
        },
        {
          event: 'In transit - Checkpoint 1',
          location: 'Third Mainland Bridge',
          time: '2024-03-15 09:30 AM',
          status: 'completed'
        },
        {
          event: 'In transit - Current location',
          location: 'Ojota, Lagos',
          time: '2024-03-15 11:45 AM',
          status: 'current'
        },
        {
          event: 'Expected arrival at destination',
          location: 'Ikeja Warehouse',
          time: '2024-03-15 06:00 PM',
          status: 'pending'
        }
      ]
    },
    {
      id: '2',
      shipmentId: 'SHP-2024-002',
      consignmentReference: 'CNS-2024-002',
      status: 'Pending Acceptance',
      containerNumber: 'EFGH9876543',
      origin: 'Tin Can Island Port',
      destination: 'Ota Industrial Area',
      currentLocation: 'Awaiting dispatch',
      truckNumber: 'Pending',
      driverName: 'Pending',
      fleetOperator: 'XYZ Logistics',
      timeline: [
        {
          event: 'Shipment request created',
          location: 'System',
          time: '2024-03-14 10:00 AM',
          status: 'completed'
        },
        {
          event: 'Awaiting fleet operator acceptance',
          location: 'Pending',
          time: 'Pending',
          status: 'pending'
        }
      ]
    }
  ];

  const selectedShipment = shipments.find(s => s.id === selectedShipmentId);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/shipper/shipments')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to My Shipments
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Track Shipments</h1>
            <p className="text-sm text-gray-600 mt-1">Real-time tracking and monitoring</p>
          </div>
        </div>
      </div>

      {/* Shipment Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Shipment to Track</label>
        <select
          value={selectedShipmentId}
          onChange={(e) => setSelectedShipmentId(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md bg-white cursor-pointer"
        >
          {shipments.map(shipment => (
            <option key={shipment.id} value={shipment.id}>
              {shipment.shipmentId} - {shipment.status}
            </option>
          ))}
        </select>
      </div>

      {selectedShipment && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map and Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-100 h-96 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                <div className="relative text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium text-gray-600">Live GPS Tracking Map</p>
                  <p className="text-xs text-gray-500 mt-1">Map integration with Google Maps API</p>
                  {selectedShipment.status === 'In Transit' && (
                    <div className="mt-4">
                      <p className="text-lg font-bold text-gray-900">{selectedShipment.currentLocation}</p>
                      <p className="text-sm text-gray-600">Last updated: {selectedShipment.lastUpdate}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress and Route */}
            {selectedShipment.status === 'In Transit' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Route Progress</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">{selectedShipment.origin}</span>
                    <span className="font-semibold text-secondary">{selectedShipment.progress}%</span>
                    <span className="text-gray-600">{selectedShipment.destination}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-secondary to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${selectedShipment.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Current Location</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedShipment.currentLocation}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">ETA</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedShipment.eta}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Shipment Timeline</h3>
              <div className="space-y-4">
                {selectedShipment.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.status === 'completed'
                            ? 'bg-green-500'
                            : item.status === 'current'
                            ? 'bg-blue-500 ring-4 ring-blue-100'
                            : 'bg-gray-300'
                        }`}
                      >
                        {item.status === 'completed' && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {item.status === 'current' && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      {index < selectedShipment.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="font-semibold text-gray-900">{item.event}</p>
                      <p className="text-sm text-gray-600">{item.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Shipment Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Shipment Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Shipment ID:</span>
                  <div className="font-semibold text-gray-900">{selectedShipment.shipmentId}</div>
                </div>
                <div>
                  <span className="text-gray-600">Consignment Ref:</span>
                  <div className="font-semibold text-gray-900">{selectedShipment.consignmentReference}</div>
                </div>
                <div>
                  <span className="text-gray-600">Container:</span>
                  <div className="font-semibold text-gray-900">{selectedShipment.containerNumber}</div>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <div className="font-semibold text-gray-900">{selectedShipment.status}</div>
                </div>
              </div>
            </div>

            {/* Transport Info */}
            {selectedShipment.status === 'In Transit' && (
              <>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Transport Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Fleet Operator:</span>
                      <div className="font-semibold text-gray-900">{selectedShipment.fleetOperator}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Truck Number:</span>
                      <div className="font-semibold text-gray-900">{selectedShipment.truckNumber}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Driver:</span>
                      <div className="font-semibold text-gray-900">{selectedShipment.driverName}</div>
                      <div className="text-gray-600">{selectedShipment.driverPhone}</div>
                    </div>
                  </div>
                </div>

                {/* Telematics Status */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Telematics Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className={`w-5 h-5 ${selectedShipment.sealStatus === 'Intact' ? 'text-green-600' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">Container Seal</span>
                      </div>
                      <span className={`text-sm font-semibold ${selectedShipment.sealStatus === 'Intact' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedShipment.sealStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">GPS Status</span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">{selectedShipment.gpsStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">Battery Level</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">{selectedShipment.batteryLevel}%</span>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {selectedShipment.alerts && selectedShipment.alerts.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h3 className="text-sm font-bold text-red-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Active Alerts
                    </h3>
                    <div className="space-y-2">
                      {selectedShipment.alerts.map((alert, idx) => (
                        <div key={idx} className="text-sm text-red-800">
                          <p className="font-semibold">{alert.type}</p>
                          <p className="text-xs">{alert.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackShipmentsPage;
