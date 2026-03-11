import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';

const DevicesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBattery, setFilterBattery] = useState('all');
  const [filterCustodian, setFilterCustodian] = useState('all');

  // Demo devices data (to be replaced with API)
  const [devices] = useState([
    {
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
      },
      lastUpdate: '2024-03-11 14:23:00',
      condition: 'Excellent',
      installDate: '2024-01-15',
      totalTrips: 87,
    },
    {
      id: 'DEV-GPS-002',
      serialNumber: 'GPS-2024-001235',
      status: 'Available',
      batteryLevel: 92,
      custodian: 'Tsaron Tech Back Office',
      custodianType: 'Super Admin',
      assignedTo: null,
      lastUpdate: '2024-03-11 12:00:00',
      condition: 'Excellent',
      installDate: '2024-01-15',
      totalTrips: 123,
    },
    {
      id: 'DEV-GPS-003',
      serialNumber: 'GPS-2024-001236',
      status: 'Charging Required',
      batteryLevel: 34,
      custodian: 'Apapa Port Terminal',
      custodianType: 'Terminal Operator',
      assignedTo: null,
      lastUpdate: '2024-03-11 10:15:00',
      condition: 'Good',
      installDate: '2024-01-18',
      totalTrips: 76,
    },
    {
      id: 'DEV-GPS-004',
      serialNumber: 'GPS-2024-001237',
      status: 'Assigned – In Transit',
      batteryLevel: 68,
      custodian: 'Swift Haulage Services',
      custodianType: 'Fleet Operator',
      assignedTo: {
        containerNumber: 'MSCU4567890',
        consignmentId: 'CS-2024-0457',
        route: 'Apapa to Ibadan',
      },
      lastUpdate: '2024-03-11 14:45:00',
      condition: 'Good',
      installDate: '2024-01-20',
      totalTrips: 64,
    },
    {
      id: 'DEV-GPS-005',
      serialNumber: 'GPS-2024-001238',
      status: 'Maintenance Required',
      batteryLevel: 45,
      custodian: 'Tsaron Tech Back Office',
      custodianType: 'Super Admin',
      assignedTo: null,
      lastUpdate: '2024-03-10 16:30:00',
      condition: 'Fair',
      installDate: '2024-01-22',
      totalTrips: 98,
    },
    {
      id: 'DEV-GPS-006',
      serialNumber: 'GPS-2024-001239',
      status: 'Low Battery Alert',
      batteryLevel: 18,
      custodian: 'Tin Can Island Terminal',
      custodianType: 'Terminal Operator',
      assignedTo: null,
      lastUpdate: '2024-03-11 13:00:00',
      condition: 'Good',
      installDate: '2024-02-01',
      totalTrips: 45,
    },
  ]);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.custodian.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.assignedTo?.containerNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || device.status === filterStatus;

    const matchesBattery =
      filterBattery === 'all' ||
      (filterBattery === 'healthy' && device.batteryLevel >= 40) ||
      (filterBattery === 'warning' && device.batteryLevel >= 21 && device.batteryLevel < 40) ||
      (filterBattery === 'critical' && device.batteryLevel <= 20);

    const matchesCustodian = filterCustodian === 'all' || device.custodianType === filterCustodian;

    return matchesSearch && matchesStatus && matchesBattery && matchesCustodian;
  });

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
    if (status === 'Damaged – Liability Review') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const stats = [
    {
      label: 'Total Devices',
      value: devices.length,
      icon: '📱',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Available',
      value: devices.filter((d) => d.status === 'Available').length,
      icon: '✅',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      label: 'In Transit',
      value: devices.filter((d) => d.status === 'Assigned – In Transit').length,
      icon: '🚚',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      label: 'Low Battery',
      value: devices.filter((d) => d.batteryLevel <= 20).length,
      icon: '🔋',
      color: 'bg-red-50 text-red-700 border-red-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">GPS e-Lock Device Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage GPS e-Lock devices across the entire lifecycle
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/devices/new')}
          className="px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Register New Device
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`border-2 rounded-xl p-6 ${stat.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl opacity-50">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search devices, containers..."
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Assigned – In Transit">In Transit</option>
              <option value="Charging Required">Charging Required</option>
              <option value="Low Battery Alert">Low Battery</option>
              <option value="Maintenance Required">Maintenance</option>
            </select>
          </div>
          <div>
            <select
              value={filterBattery}
              onChange={(e) => setFilterBattery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Battery Levels</option>
              <option value="healthy">Healthy (≥40%)</option>
              <option value="warning">Warning (21-39%)</option>
              <option value="critical">Critical (≤20%)</option>
            </select>
          </div>
          <div>
            <select
              value={filterCustodian}
              onChange={(e) => setFilterCustodian(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Custodians</option>
              <option value="Super Admin">Tsaron Tech</option>
              <option value="Fleet Operator">Fleet Operators</option>
              <option value="Terminal Operator">Terminal Operators</option>
              <option value="Shipping Company">Shipping Companies</option>
            </select>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            onClick={() => navigate(`/admin/devices/${device.id}`)}
            className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-secondary hover:shadow-lg transition-all cursor-pointer p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{device.id}</h3>
                <p className="text-xs text-gray-500">{device.serialNumber}</p>
              </div>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(device.status)}`}>
                {device.status}
              </span>
            </div>

            {/* Battery */}
            <div className={`rounded-lg p-3 mb-4 ${getBatteryColor(device.batteryLevel)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getBatteryIcon(device.batteryLevel)}</span>
                  <div>
                    <p className="text-xs font-medium opacity-80">Battery Level</p>
                    <p className="text-lg font-bold">{device.batteryLevel}%</p>
                  </div>
                </div>
                <div className="w-16 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-current"
                    style={{ width: `${device.batteryLevel}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Custodian */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">Current Custodian</p>
              <p className="text-sm font-semibold text-gray-900">{device.custodian}</p>
              <p className="text-xs text-gray-500">{device.custodianType}</p>
            </div>

            {/* Assignment */}
            {device.assignedTo ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-medium text-blue-900 mb-1">Assigned To</p>
                <p className="text-sm font-semibold text-blue-900">{device.assignedTo.containerNumber}</p>
                <p className="text-xs text-blue-700">{device.assignedTo.route}</p>
                <p className="text-xs text-blue-600 mt-1">{device.assignedTo.consignmentId}</p>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 text-center">Not currently assigned</p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
              <span>{device.totalTrips} trips</span>
              <span>{device.condition}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 font-medium">No devices found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default DevicesPage;
