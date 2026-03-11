import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirm } from '../../context/ConfirmContext';
import { useAlert } from '../../context/AlertContext';

const DeviceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const confirm = useConfirm();
  const { showSuccess, showError } = useAlert();

  // Mock device data (to be replaced with API call)
  const [device] = useState({
    id: 'DEV-GPS-001',
    serialNumber: 'GPS-2024-001234',
    status: 'Assigned – In Transit',
    batteryLevel: 87,
    custodian: 'TransLogistics Nigeria Ltd',
    custodianType: 'Fleet Operator',
    assignedTo: {
      containerNumber: 'MAEU9876543',
      consignmentId: 'CS-2024-0456',
      route: 'Lagos to Ikeja',
      assignedDate: '2024-03-11 09:30:00',
    },
    lastUpdate: '2024-03-11 14:23:00',
    condition: 'Excellent',
    installDate: '2024-01-15',
    warrantyExpiry: '2026-01-15',
    totalTrips: 87,
    manufacturer: 'GPS Logistics Tech',
    model: 'GLT-5000 Pro',
    firmwareVersion: '2.4.1',
    simNumber: '+234-800-555-0123',
    imeiNumber: '352099001234567',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-05-15',
    purchaseDate: '2024-01-10',
    purchaseCost: 125000,
    currentValue: 110000,
  });

  // Battery history (last 7 days)
  const [batteryHistory] = useState([
    { date: '2024-03-05', level: 95 },
    { date: '2024-03-06', level: 89 },
    { date: '2024-03-07', level: 92 },
    { date: '2024-03-08', level: 85 },
    { date: '2024-03-09', level: 91 },
    { date: '2024-03-10', level: 88 },
    { date: '2024-03-11', level: 87 },
  ]);

  // Custody history
  const [custodyHistory] = useState([
    {
      id: 1,
      custodian: 'TransLogistics Nigeria Ltd',
      custodianType: 'Fleet Operator',
      receivedDate: '2024-03-11 09:30:00',
      returnedDate: null,
      status: 'Current Custodian',
      containerNumber: 'MAEU9876543',
      consignmentId: 'CS-2024-0456',
    },
    {
      id: 2,
      custodian: 'Apapa Port Terminal',
      custodianType: 'Terminal Operator',
      receivedDate: '2024-03-10 14:00:00',
      returnedDate: '2024-03-11 09:30:00',
      status: 'Completed',
      containerNumber: 'MAEU9876543',
      consignmentId: 'CS-2024-0456',
    },
    {
      id: 3,
      custodian: 'Tsaron Tech Back Office',
      custodianType: 'Super Admin',
      receivedDate: '2024-03-08 10:00:00',
      returnedDate: '2024-03-10 14:00:00',
      status: 'Completed',
      containerNumber: null,
      consignmentId: null,
    },
  ]);

  // Recent trips
  const [recentTrips] = useState([
    {
      id: 'CS-2024-0456',
      containerNumber: 'MAEU9876543',
      route: 'Lagos to Ikeja',
      startDate: '2024-03-11 09:30:00',
      endDate: null,
      status: 'In Transit',
      distance: 25,
      alerts: 0,
    },
    {
      id: 'CS-2024-0432',
      containerNumber: 'MSCU4567890',
      route: 'Apapa to Ibadan',
      startDate: '2024-03-08 08:00:00',
      endDate: '2024-03-09 14:30:00',
      status: 'Completed',
      distance: 145,
      alerts: 1,
    },
    {
      id: 'CS-2024-0411',
      containerNumber: 'CMAU3456789',
      route: 'Lagos to Oshogbo',
      startDate: '2024-03-05 07:15:00',
      endDate: '2024-03-06 16:45:00',
      status: 'Completed',
      distance: 210,
      alerts: 0,
    },
  ]);

  const handleUnassign = async () => {
    const confirmed = await confirm({
      title: 'Unassign Device',
      message: 'Are you sure you want to unassign this device from the current container? This will end the active trip.',
      type: 'warning',
    });

    if (confirmed) {
      // TODO: Call API to unassign device
      showSuccess('Device unassigned successfully');
      navigate('/admin/devices');
    }
  };

  const handleDecommission = async () => {
    const confirmed = await confirm({
      title: 'Decommission Device',
      message: 'Are you sure you want to decommission this device? This action cannot be undone. Only unassigned devices can be decommissioned.',
      type: 'danger',
    });

    if (confirmed) {
      if (device.assignedTo) {
        showError('Cannot decommission device that is currently assigned. Please unassign first.');
        return;
      }
      // TODO: Call API to decommission device
      showSuccess('Device decommissioned successfully');
      navigate('/admin/devices');
    }
  };

  const getBatteryColor = (level) => {
    if (level >= 40) return 'text-green-600 bg-green-100';
    if (level >= 21) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getBatteryIcon = (level) => {
    if (level >= 75) return '🔋';
    if (level >= 40) return '🔋';
    if (level >= 21) return '⚠️';
    return '🚨';
  };

  const getStatusBadgeColor = (status) => {
    if (status === 'Available') return 'bg-green-100 text-green-800';
    if (status === 'Assigned – In Transit') return 'bg-blue-100 text-blue-800';
    if (status === 'Charging Required') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Low Battery Alert') return 'bg-red-100 text-red-800';
    if (status === 'Maintenance Required') return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getConditionBadgeColor = (condition) => {
    if (condition === 'Excellent') return 'bg-green-100 text-green-800';
    if (condition === 'Good') return 'bg-blue-100 text-blue-800';
    if (condition === 'Fair') return 'bg-yellow-100 text-yellow-800';
    if (condition === 'Poor') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/devices')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{device.id}</h1>
            <p className="text-sm text-gray-600 mt-1">Serial: {device.serialNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {device.assignedTo && (
            <button
              onClick={handleUnassign}
              className="px-6 py-3 bg-yellow-50 border-2 border-yellow-300 text-yellow-700 font-semibold rounded-xl hover:bg-yellow-100 transition-all"
            >
              Unassign Device
            </button>
          )}
          <button
            onClick={handleDecommission}
            className="px-6 py-3 bg-red-50 border-2 border-red-300 text-red-700 font-semibold rounded-xl hover:bg-red-100 transition-all"
          >
            Decommission
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-600">Status</p>
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full mt-2 ${getStatusBadgeColor(device.status)}`}>
            {device.status}
          </span>
        </div>
        <div className={`border-2 rounded-xl p-6 ${getBatteryColor(device.batteryLevel)}`}>
          <p className="text-sm font-medium opacity-80">Battery Level</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl">{getBatteryIcon(device.batteryLevel)}</span>
            <p className="text-3xl font-bold">{device.batteryLevel}%</p>
          </div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-600">Condition</p>
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full mt-2 ${getConditionBadgeColor(device.condition)}`}>
            {device.condition}
          </span>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-600">Total Trips</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{device.totalTrips}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Assignment */}
          {device.assignedTo ? (
            <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📦 Current Assignment</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Container Number</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">{device.assignedTo.containerNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Consignment ID</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">{device.assignedTo.consignmentId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Route</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">{device.assignedTo.route}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Assigned Date</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">
                      {new Date(device.assignedTo.assignedDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">📦 Current Assignment</h2>
              <div className="text-center py-8">
                <p className="text-gray-500">Device is not currently assigned to any container</p>
                <button
                  onClick={() => navigate('/admin/devices/assign')}
                  className="mt-4 px-6 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-all"
                >
                  Assign to Container
                </button>
              </div>
            </div>
          )}

          {/* Battery History Chart */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🔋 Battery History (Last 7 Days)</h2>
            <div className="space-y-2">
              {batteryHistory.map((entry, index) => (
                <div key={index} className="flex items-center gap-4">
                  <p className="text-xs text-gray-600 w-24">{new Date(entry.date).toLocaleDateString()}</p>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className={`h-full ${entry.level >= 40 ? 'bg-green-500' : entry.level >= 21 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${entry.level}%` }}
                    />
                    <p className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {entry.level}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trips */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🚚 Recent Trips</h2>
            <div className="space-y-3">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:border-secondary transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{trip.containerNumber}</p>
                      <p className="text-xs text-gray-500">{trip.id}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${trip.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {trip.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{trip.route}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(trip.startDate).toLocaleString()}</span>
                    <span>{trip.distance} km</span>
                    {trip.alerts > 0 && (
                      <span className="text-red-600 font-semibold">{trip.alerts} alert(s)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custody History */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">👥 Custody History</h2>
            <div className="space-y-3">
              {custodyHistory.map((entry) => (
                <div key={entry.id} className={`border-2 rounded-lg p-4 ${entry.status === 'Current Custodian' ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{entry.custodian}</p>
                      <p className="text-xs text-gray-500">{entry.custodianType}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${entry.status === 'Current Custodian' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      {entry.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Received: {new Date(entry.receivedDate).toLocaleString()}</p>
                    {entry.returnedDate && (
                      <p>Returned: {new Date(entry.returnedDate).toLocaleString()}</p>
                    )}
                    {entry.containerNumber && (
                      <p className="text-gray-700 font-medium">
                        Container: {entry.containerNumber} ({entry.consignmentId})
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Custodian */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">👤 Current Custodian</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Organization</p>
                <p className="text-base font-semibold text-gray-900 mt-1">{device.custodian}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Type</p>
                <p className="text-base font-semibold text-gray-900 mt-1">{device.custodianType}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Last Update</p>
                <p className="text-sm text-gray-600 mt-1">{new Date(device.lastUpdate).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Device Specifications */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🔧 Device Specifications</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Manufacturer</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{device.manufacturer}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Model</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{device.model}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Firmware Version</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{device.firmwareVersion}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">SIM Number</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{device.simNumber}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">IMEI Number</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{device.imeiNumber}</p>
              </div>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🛠️ Maintenance Schedule</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Last Maintenance</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {new Date(device.lastMaintenance).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Next Maintenance</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {new Date(device.nextMaintenance).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Warranty Expiry</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {new Date(device.warrantyExpiry).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">💰 Financial Information</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Purchase Date</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {new Date(device.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Purchase Cost</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">₦{device.purchaseCost.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Current Value</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">₦{device.currentValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Depreciation</p>
                <p className="text-sm font-semibold text-red-600 mt-1">
                  ₦{(device.purchaseCost - device.currentValue).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailPage;
