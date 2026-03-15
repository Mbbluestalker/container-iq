import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';

const ShippingCustodyPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Demo data - devices currently in custody of this shipping company
  const [devices] = useState([
    {
      id: 'DEV-GPS-1245',
      serialNumber: 'GPS-SN-2024-1245',
      status: 'in_transit',
      batteryLevel: 87,
      containerNumber: 'MAEU-1234567',
      voyage: 'V-2024-034',
      route: 'Lagos Port → Apapa Terminal',
      assignedDate: '2024-03-10 08:30:00',
      lastUpdate: '2024-03-11 14:23:00',
      location: 'En route to Apapa',
      expectedHandover: '2024-03-12 10:00:00',
      handoverTo: 'Apapa Port Terminal',
    },
    {
      id: 'DEV-GPS-1246',
      serialNumber: 'GPS-SN-2024-1246',
      status: 'available',
      batteryLevel: 95,
      containerNumber: null,
      voyage: null,
      route: null,
      assignedDate: '2024-03-09 14:00:00',
      lastUpdate: '2024-03-11 16:00:00',
      location: 'Maersk Line Warehouse',
      expectedHandover: null,
      handoverTo: null,
    },
    {
      id: 'DEV-GPS-1247',
      serialNumber: 'GPS-SN-2024-1247',
      status: 'in_transit',
      batteryLevel: 72,
      containerNumber: 'MAEU-7654321',
      voyage: 'V-2024-035',
      route: 'Tin Can Island → Lagos Port',
      assignedDate: '2024-03-11 06:00:00',
      lastUpdate: '2024-03-11 15:45:00',
      location: 'Approaching Lagos Port',
      expectedHandover: '2024-03-11 18:00:00',
      handoverTo: 'Lagos Port Terminal',
    },
    {
      id: 'DEV-GPS-1248',
      serialNumber: 'GPS-SN-2024-1248',
      status: 'needs_charge',
      batteryLevel: 18,
      containerNumber: null,
      voyage: null,
      route: null,
      assignedDate: '2024-03-08 10:00:00',
      lastUpdate: '2024-03-11 12:00:00',
      location: 'Maersk Line Warehouse',
      expectedHandover: null,
      handoverTo: null,
    },
  ]);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (device.containerNumber && device.containerNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || device.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'needs_charge':
        return 'bg-yellow-100 text-yellow-800';
      case 'damaged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'in_transit':
        return 'In Transit';
      case 'needs_charge':
        return 'Needs Charge';
      case 'damaged':
        return 'Damaged';
      default:
        return status;
    }
  };

  const getBatteryColor = (level) => {
    if (level >= 70) return 'text-green-600';
    if (level >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const stats = [
    {
      label: 'Total in Custody',
      value: devices.length,
      icon: '📱',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Available',
      value: devices.filter(d => d.status === 'available').length,
      icon: '✅',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      label: 'In Transit',
      value: devices.filter(d => d.status === 'in_transit').length,
      icon: '🚚',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      label: 'Needs Attention',
      value: devices.filter(d => d.status === 'needs_charge' || d.status === 'damaged').length,
      icon: '⚠️',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Device Custody</h1>
          <p className="text-sm text-gray-600 mt-1">
            GPS e-Lock devices currently in your custody
          </p>
        </div>
        <button
          onClick={() => navigate('/shipping/custody/handover')}
          className="px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Device Handover
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`border-2 rounded-xl p-6 ${stat.color}`}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search devices, containers, locations..."
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="in_transit">In Transit</option>
              <option value="needs_charge">Needs Charge</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-secondary hover:shadow-lg transition-all p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{device.id}</h3>
                <p className="text-xs text-gray-500">{device.serialNumber}</p>
              </div>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(device.status)}`}>
                {getStatusLabel(device.status)}
              </span>
            </div>

            {/* Battery Level */}
            <div className="mb-4 bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Battery Level</span>
                <span className={`text-sm font-bold ${getBatteryColor(device.batteryLevel)}`}>
                  {device.batteryLevel}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${device.batteryLevel >= 70 ? 'bg-green-500' : device.batteryLevel >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${device.batteryLevel}%` }}
                ></div>
              </div>
            </div>

            {/* Container & Voyage Info */}
            {device.containerNumber ? (
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Container</span>
                  <span className="font-semibold text-gray-900">{device.containerNumber}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Voyage</span>
                  <span className="font-semibold text-gray-900">{device.voyage}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Route</span>
                  <span className="font-semibold text-gray-900 text-right">{device.route}</span>
                </div>
              </div>
            ) : (
              <div className="mb-4 bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xs text-blue-600 font-medium">Not assigned to container</p>
              </div>
            )}

            {/* Location & Handover */}
            <div className="pt-4 border-t border-gray-200 space-y-2 text-xs">
              <p className="flex items-center gap-1 text-gray-600">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Location:</span> {device.location}
              </p>
              {device.expectedHandover && (
                <>
                  <p className="flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Expected Handover:</span> {new Date(device.expectedHandover).toLocaleString()}
                  </p>
                  <p className="flex items-center gap-1 text-gray-600">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span className="font-medium">Handover To:</span> {device.handoverTo}
                  </p>
                </>
              )}
              <p className="text-gray-500">Assigned: {new Date(device.assignedDate).toLocaleString()}</p>
              <p className="text-gray-500">Last Update: {new Date(device.lastUpdate).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 font-medium">No devices found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default ShippingCustodyPage;
