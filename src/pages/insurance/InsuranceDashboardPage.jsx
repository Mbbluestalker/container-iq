import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InsuranceDashboardPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  // Mock containers data
  const containers = [
    {
      id: 'MSCU1234567',
      shipmentId: 'SHP-2024-001',
      shipper: 'ABC Imports Ltd',
      status: 'In Transit',
      insuranceStatus: 'Active',
      policyNumber: 'NIC-2024-12345',
      route: 'Apapa Port → Ikeja',
      riskScore: 75,
      riskLevel: 'Medium',
      cargoValue: '₦5,500,000',
      premium: '₦165,000',
      // Telematics data
      sealStatus: 'Intact',
      batteryLevel: 85,
      lastLocation: 'Lat: 6.5244, Long: 3.3792',
      lastUpdate: '2024-03-01 14:30:00',
      tamperEvents: 0,
      doorEvents: 2,
      dwellTime: '45 minutes',
    },
    {
      id: 'TEMU9876543',
      shipmentId: 'SHP-2024-003',
      shipper: 'XYZ Logistics',
      status: 'At Terminal',
      insuranceStatus: 'Active',
      policyNumber: 'AIICO-2024-67890',
      route: 'Tin Can Port → Ota',
      riskScore: 92,
      riskLevel: 'Low',
      cargoValue: '₦2,300,000',
      premium: '₦69,000',
      sealStatus: 'Intact',
      batteryLevel: 78,
      lastLocation: 'Tin Can Island Port',
      lastUpdate: '2024-03-01 13:45:00',
      tamperEvents: 0,
      doorEvents: 1,
      dwellTime: '2 hours 15 minutes',
    },
    {
      id: 'CSQU4567890',
      shipmentId: 'SHP-2024-005',
      shipper: 'Global Traders Inc',
      status: 'In Transit',
      insuranceStatus: 'Active',
      policyNumber: 'NIC-2024-54321',
      route: 'Lekki Port → Aba',
      riskScore: 45,
      riskLevel: 'High',
      cargoValue: '₦8,200,000',
      premium: '₦328,000',
      sealStatus: 'Breached',
      batteryLevel: 65,
      lastLocation: 'Lat: 6.1234, Long: 3.5678',
      lastUpdate: '2024-03-01 14:25:00',
      tamperEvents: 2,
      doorEvents: 5,
      dwellTime: '15 minutes',
      alerts: ['Seal Breach Detected', 'Unauthorized Door Opening'],
    },
    {
      id: 'HLBU2345678',
      shipmentId: 'SHP-2024-007',
      shipper: 'Premium Foods Ltd',
      status: 'Delivered',
      insuranceStatus: 'Completed',
      policyNumber: 'LEA-2024-98765',
      route: 'Apapa Port → Ikeja',
      riskScore: 88,
      riskLevel: 'Low',
      cargoValue: '₦3,200,000',
      premium: '₦96,000',
      sealStatus: 'Intact',
      batteryLevel: 92,
      lastLocation: 'Ikeja Warehouse',
      lastUpdate: '2024-02-28 16:00:00',
      tamperEvents: 0,
      doorEvents: 2,
      dwellTime: 'N/A',
    },
    {
      id: 'APZU8901234',
      shipmentId: 'SHP-2024-009',
      shipper: 'Tech Imports Nigeria',
      status: 'Seeking Insurance',
      insuranceStatus: 'Pending Approval',
      policyNumber: 'Pending',
      route: 'Onne Port → Port Harcourt',
      riskScore: 68,
      riskLevel: 'Medium',
      cargoValue: '₦12,500,000',
      premium: '₦500,000',
      sealStatus: 'Not Started',
      batteryLevel: 100,
      lastLocation: 'Awaiting Assignment',
      lastUpdate: 'N/A',
      tamperEvents: 0,
      doorEvents: 0,
      dwellTime: 'N/A',
    },
  ];

  // Calculate stats
  const stats = {
    totalContainers: containers.length,
    activeInsured: containers.filter(c => c.insuranceStatus === 'Active').length,
    seekingInsurance: containers.filter(c => c.insuranceStatus === 'Pending Approval').length,
    highRisk: containers.filter(c => c.riskLevel === 'High').length,
    totalPremium: containers.reduce((sum, c) => sum + parseFloat(c.premium.replace(/[₦,]/g, '')), 0),
    activeClaims: 3, // This would come from claims data
  };

  // Filter containers
  const filteredContainers = containers.filter(container => {
    if (filterStatus !== 'all' && container.insuranceStatus.toLowerCase().replace(' ', '_') !== filterStatus) return false;
    if (filterRisk !== 'all' && container.riskLevel.toLowerCase() !== filterRisk) return false;
    return true;
  });

  // Risk color mapping
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'High':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Insurance Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor live containers, assess risk, and manage policies</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Containers</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalContainers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Active Insured</p>
          <p className="text-2xl font-bold text-green-600">{stats.activeInsured}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Seeking Insurance</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.seekingInsurance}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">High Risk</p>
          <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Premium</p>
          <p className="text-xl font-bold text-gray-900">₦{stats.totalPremium.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Active Claims</p>
          <p className="text-2xl font-bold text-orange-600">{stats.activeClaims}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Insurance Status</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterStatus === 'all'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterStatus === 'active'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus('pending_approval')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterStatus === 'pending_approval'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">Risk Level</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterRisk('all')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterRisk === 'all'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Risk
              </button>
              <button
                onClick={() => setFilterRisk('high')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterRisk === 'high'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                High Risk
              </button>
              <button
                onClick={() => setFilterRisk('medium')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterRisk === 'medium'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Medium Risk
              </button>
              <button
                onClick={() => setFilterRisk('low')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterRisk === 'low'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Low Risk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Containers List */}
      <div className="space-y-4">
        {filteredContainers.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-500">No containers found</p>
          </div>
        ) : (
          filteredContainers.map((container) => (
            <div key={container.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{container.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(container.insuranceStatus)}`}>
                      {container.insuranceStatus}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(container.riskLevel)}`}>
                      Risk: {container.riskScore}/100 ({container.riskLevel})
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Shipment: {container.shipmentId} | Shipper: {container.shipper}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Cargo Value</p>
                  <p className="text-xl font-bold text-gray-900">{container.cargoValue}</p>
                  <p className="text-xs text-gray-500 mt-1">Premium: {container.premium}</p>
                </div>
              </div>

              {/* Telematics Data */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Seal Status</p>
                  <p className={`text-sm font-medium ${container.sealStatus === 'Breached' ? 'text-red-600' : 'text-green-600'}`}>
                    {container.sealStatus}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Battery Level</p>
                  <p className="text-sm font-medium text-gray-900">{container.batteryLevel}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tamper Events</p>
                  <p className={`text-sm font-medium ${container.tamperEvents > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                    {container.tamperEvents}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Door Events</p>
                  <p className="text-sm font-medium text-gray-900">{container.doorEvents}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Dwell Time</p>
                  <p className="text-sm font-medium text-gray-900">{container.dwellTime}</p>
                </div>
              </div>

              {/* Route & Location */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Route</p>
                  <p className="text-sm font-medium text-gray-900">{container.route}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium text-gray-900">{container.status}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Policy Number</p>
                  <p className="text-sm font-medium text-gray-900">{container.policyNumber}</p>
                </div>
              </div>

              {/* Alerts */}
              {container.alerts && container.alerts.length > 0 && (
                <div className="bg-red-50 p-3 rounded mb-4">
                  <p className="text-sm font-medium text-red-900 mb-2">Active Alerts:</p>
                  {container.alerts.map((alert, idx) => (
                    <p key={idx} className="text-sm text-red-800">• {alert}</p>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-xs text-gray-500">Last update: {container.lastUpdate}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/insurance/containers/${container.id}`)}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded hover:opacity-90 transition-opacity text-sm"
                  >
                    View Details
                  </button>
                  {container.insuranceStatus === 'Pending Approval' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                      Approve Coverage
                    </button>
                  )}
                  {container.insuranceStatus === 'Active' && container.riskLevel === 'High' && (
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm">
                      Review Risk
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InsuranceDashboardPage;
