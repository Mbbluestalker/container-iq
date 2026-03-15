import React, { useState, useEffect } from 'react';
import LiveTelematicsMap from '../../components/telematics/LiveTelematicsMap';
import RealTimeDeviceStatus from '../../components/telematics/RealTimeDeviceStatus';
import GeofenceAlerts from '../../components/telematics/GeofenceAlerts';

const RealTimeTelematicsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock active shipments with telematics data
  const [activeShipments] = useState([
    {
      id: '1',
      shipmentId: 'SHP-2024-001',
      status: 'In Transit',
      containerNumber: 'ABCD1234567',
      deviceId: 'DEV-2024-003',
      origin: 'Apapa Port, Lagos',
      destination: 'Ikeja Warehouse, Lagos',
      currentLocation: 'Ojota, Lagos',
      truckNumber: 'ABC-123-XY',
      driverName: 'John Doe',
      eta: '2 hours 15 mins',
      progress: 65,
      batteryLevel: 85,
      sealStatus: 'Intact',
      gpsStatus: 'Active',
      lastUpdate: '5 mins ago',
      alerts: []
    },
    {
      id: '2',
      shipmentId: 'SHP-2024-007',
      status: 'In Transit',
      containerNumber: 'WXYZ9876543',
      deviceId: 'DEV-2024-008',
      origin: 'Tin Can Island Port',
      destination: 'Ibadan Depot',
      currentLocation: 'Lagos-Ibadan Expressway',
      truckNumber: 'XYZ-456-AB',
      driverName: 'Jane Smith',
      eta: '3 hours 45 mins',
      progress: 42,
      batteryLevel: 67,
      sealStatus: 'Intact',
      gpsStatus: 'Active',
      lastUpdate: '2 mins ago',
      alerts: [
        {
          type: 'Battery Low',
          severity: 'medium',
          time: '10 mins ago'
        }
      ]
    },
    {
      id: '3',
      shipmentId: 'SHP-2024-012',
      status: 'In Transit',
      containerNumber: 'PQRS5432109',
      deviceId: 'DEV-2024-012',
      origin: 'Port Harcourt Terminal',
      destination: 'Aba Warehouse',
      currentLocation: 'Port Harcourt-Aba Highway',
      truckNumber: 'PQR-789-CD',
      driverName: 'Mike Johnson',
      eta: '1 hour 30 mins',
      progress: 78,
      batteryLevel: 92,
      sealStatus: 'Intact',
      gpsStatus: 'Active',
      lastUpdate: '1 min ago',
      alerts: []
    }
  ]);

  const [dashboardStats] = useState({
    totalActiveDevices: 24,
    devicesOnline: 23,
    devicesOffline: 1,
    criticalAlerts: 2,
    lowBatteryDevices: 5,
    sealBreaches: 0,
    routeDeviations: 1
  });

  useEffect(() => {
    // Auto-select first shipment on mount
    if (activeShipments.length > 0 && !selectedDevice) {
      setSelectedDevice(activeShipments[0]);
    }
  }, [activeShipments, selectedDevice]);

  const filteredShipments = activeShipments.filter(shipment => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'alerts') return shipment.alerts && shipment.alerts.length > 0;
    if (filterStatus === 'low-battery') return shipment.batteryLevel < 70;
    return true;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Real-Time Telematics Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Live monitoring of all GPS e-Lock devices and active shipments</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-600">LIVE • Updates every 30s</span>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-gray-600 mb-1">Active Devices</p>
          <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalActiveDevices}</p>
        </div>
        <div className="bg-green-50 rounded-xl border border-green-200 shadow-sm p-4">
          <p className="text-xs text-green-700 mb-1">Online</p>
          <p className="text-2xl font-bold text-green-900">{dashboardStats.devicesOnline}</p>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 shadow-sm p-4">
          <p className="text-xs text-red-700 mb-1">Offline</p>
          <p className="text-2xl font-bold text-red-900">{dashboardStats.devicesOffline}</p>
        </div>
        <div className="bg-orange-50 rounded-xl border border-orange-200 shadow-sm p-4">
          <p className="text-xs text-orange-700 mb-1">Critical Alerts</p>
          <p className="text-2xl font-bold text-orange-900">{dashboardStats.criticalAlerts}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl border border-yellow-200 shadow-sm p-4">
          <p className="text-xs text-yellow-700 mb-1">Low Battery</p>
          <p className="text-2xl font-bold text-yellow-900">{dashboardStats.lowBatteryDevices}</p>
        </div>
        <div className="bg-purple-50 rounded-xl border border-purple-200 shadow-sm p-4">
          <p className="text-xs text-purple-700 mb-1">Seal Breaches</p>
          <p className="text-2xl font-bold text-purple-900">{dashboardStats.sealBreaches}</p>
        </div>
        <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-sm p-4">
          <p className="text-xs text-blue-700 mb-1">Route Deviations</p>
          <p className="text-2xl font-bold text-blue-900">{dashboardStats.routeDeviations}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Live Tracking Overview
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'devices'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Device Fleet Status
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                activeTab === 'alerts'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Alerts
              {dashboardStats.criticalAlerts > 0 && (
                <span className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {dashboardStats.criticalAlerts}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Shipment List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">Active Shipments</h3>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="all">All</option>
                  <option value="alerts">With Alerts</option>
                  <option value="low-battery">Low Battery</option>
                </select>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredShipments.map(shipment => (
                  <button
                    key={shipment.id}
                    onClick={() => setSelectedDevice(shipment)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedDevice?.id === shipment.id
                        ? 'bg-secondary/10 border-secondary'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-900">{shipment.shipmentId}</p>
                      {shipment.alerts && shipment.alerts.length > 0 && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{shipment.containerNumber}</p>
                    <p className="text-xs text-gray-500">{shipment.currentLocation}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-green-500 h-1 rounded-full"
                          style={{ width: `${shipment.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{shipment.progress}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Map and Device Status */}
          <div className="lg:col-span-3 space-y-6">
            {selectedDevice ? (
              <>
                {/* Live Map */}
                <LiveTelematicsMap shipmentData={selectedDevice} />

                {/* Real-Time Device Status */}
                <RealTimeDeviceStatus shipmentData={selectedDevice} />

                {/* Geofence Alerts */}
                <GeofenceAlerts shipmentData={selectedDevice} />
              </>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-600 font-medium">No shipment selected</p>
                <p className="text-sm text-gray-500 mt-1">Select a shipment from the list to view live telematics</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'devices' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Device Fleet Status</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Container</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPS Signal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seal Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeShipments.map(shipment => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{shipment.deviceId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{shipment.containerNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                          <div
                            className={`h-2 rounded-full ${
                              shipment.batteryLevel > 60 ? 'bg-green-500' : shipment.batteryLevel > 30 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${shipment.batteryLevel}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{shipment.batteryLevel}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{shipment.gpsStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{shipment.sealStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Active Alerts & Incidents</h3>

          {activeShipments.filter(s => s.alerts && s.alerts.length > 0).length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-green-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-600 font-medium">No active alerts</p>
              <p className="text-sm text-gray-500 mt-1">All shipments are running smoothly</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeShipments
                .filter(s => s.alerts && s.alerts.length > 0)
                .map(shipment =>
                  shipment.alerts.map((alert, idx) => (
                    <div key={`${shipment.id}-${idx}`} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-bold text-orange-900">{alert.type}</h4>
                            <span className="px-2 py-1 text-xs font-semibold bg-orange-200 text-orange-900 rounded-full">
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-sm text-orange-800 mt-1">Shipment: {shipment.shipmentId} • Container: {shipment.containerNumber}</p>
                          <p className="text-xs text-orange-700 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RealTimeTelematicsDashboard;
