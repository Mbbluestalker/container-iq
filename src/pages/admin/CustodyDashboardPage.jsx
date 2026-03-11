import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';

const CustodyDashboardPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCustodianType, setFilterCustodianType] = useState('all');
  const [filterDeviceStatus, setFilterDeviceStatus] = useState('all');

  // Demo custodian inventory data (to be replaced with API)
  const [custodians] = useState([
    {
      id: 'CUST-001',
      organizationName: 'TransLogistics Nigeria Ltd',
      custodianType: 'Fleet Operator',
      devicesInCustody: 12,
      devicesAvailable: 3,
      devicesInTransit: 9,
      devicesNeedingCharge: 2,
      devicesDamaged: 0,
      lastActivity: '2024-03-11 14:23:00',
      totalHandovers: 87,
      pendingHandovers: 2,
      location: 'Lagos, Nigeria',
    },
    {
      id: 'CUST-002',
      organizationName: 'Apapa Port Terminal',
      custodianType: 'Terminal Operator',
      devicesInCustody: 45,
      devicesAvailable: 25,
      devicesInTransit: 15,
      devicesNeedingCharge: 5,
      devicesDamaged: 0,
      lastActivity: '2024-03-11 15:00:00',
      totalHandovers: 234,
      pendingHandovers: 8,
      location: 'Apapa, Lagos',
    },
    {
      id: 'CUST-003',
      organizationName: 'Swift Haulage Services',
      custodianType: 'Fleet Operator',
      devicesInCustody: 8,
      devicesAvailable: 2,
      devicesInTransit: 5,
      devicesNeedingCharge: 1,
      devicesDamaged: 0,
      lastActivity: '2024-03-11 13:45:00',
      totalHandovers: 64,
      pendingHandovers: 1,
      location: 'Ibadan, Nigeria',
    },
    {
      id: 'CUST-004',
      organizationName: 'Tin Can Island Terminal',
      custodianType: 'Terminal Operator',
      devicesInCustody: 38,
      devicesAvailable: 18,
      devicesInTransit: 16,
      devicesNeedingCharge: 3,
      devicesDamaged: 1,
      lastActivity: '2024-03-11 12:30:00',
      totalHandovers: 156,
      pendingHandovers: 5,
      location: 'Tin Can Island, Lagos',
    },
    {
      id: 'CUST-005',
      organizationName: 'Maersk Line Nigeria',
      custodianType: 'Shipping Company',
      devicesInCustody: 22,
      devicesAvailable: 8,
      devicesInTransit: 12,
      devicesNeedingCharge: 2,
      devicesDamaged: 0,
      lastActivity: '2024-03-11 14:00:00',
      totalHandovers: 412,
      pendingHandovers: 4,
      location: 'Lagos, Nigeria',
    },
    {
      id: 'CUST-006',
      organizationName: 'Tsaron Tech Back Office',
      custodianType: 'Super Admin',
      devicesInCustody: 75,
      devicesAvailable: 65,
      devicesInTransit: 0,
      devicesNeedingCharge: 8,
      devicesDamaged: 2,
      lastActivity: '2024-03-11 16:00:00',
      totalHandovers: 1250,
      pendingHandovers: 12,
      location: 'Lagos, Nigeria',
    },
  ]);

  const filteredCustodians = custodians.filter((custodian) => {
    const matchesSearch =
      custodian.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      custodian.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      custodian.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCustodianType = filterCustodianType === 'all' || custodian.custodianType === filterCustodianType;

    const matchesDeviceStatus =
      filterDeviceStatus === 'all' ||
      (filterDeviceStatus === 'available' && custodian.devicesAvailable > 0) ||
      (filterDeviceStatus === 'in_transit' && custodian.devicesInTransit > 0) ||
      (filterDeviceStatus === 'needs_charge' && custodian.devicesNeedingCharge > 0) ||
      (filterDeviceStatus === 'damaged' && custodian.devicesDamaged > 0);

    return matchesSearch && matchesCustodianType && matchesDeviceStatus;
  });

  const getCustodianTypeColor = (type) => {
    switch (type) {
      case 'Fleet Operator':
        return 'bg-blue-100 text-blue-800';
      case 'Terminal Operator':
        return 'bg-green-100 text-green-800';
      case 'Shipping Company':
        return 'bg-purple-100 text-purple-800';
      case 'Super Admin':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalStats = {
    totalDevices: custodians.reduce((sum, c) => sum + c.devicesInCustody, 0),
    totalAvailable: custodians.reduce((sum, c) => sum + c.devicesAvailable, 0),
    totalInTransit: custodians.reduce((sum, c) => sum + c.devicesInTransit, 0),
    totalNeedingCharge: custodians.reduce((sum, c) => sum + c.devicesNeedingCharge, 0),
    totalDamaged: custodians.reduce((sum, c) => sum + c.devicesDamaged, 0),
    totalPendingHandovers: custodians.reduce((sum, c) => sum + c.pendingHandovers, 0),
  };

  const stats = [
    {
      label: 'Total Devices',
      value: totalStats.totalDevices,
      icon: '📱',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Available',
      value: totalStats.totalAvailable,
      icon: '✅',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      label: 'In Transit',
      value: totalStats.totalInTransit,
      icon: '🚚',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      label: 'Pending Handovers',
      value: totalStats.totalPendingHandovers,
      icon: '🔄',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Distributed Custodian Inventory</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track GPS e-Lock devices across all custodian organizations
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/custody/transfers')}
          className="px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          View Transfers
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search custodians, locations..."
            />
          </div>
          <div>
            <select
              value={filterCustodianType}
              onChange={(e) => setFilterCustodianType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Custodian Types</option>
              <option value="Fleet Operator">Fleet Operators</option>
              <option value="Terminal Operator">Terminal Operators</option>
              <option value="Shipping Company">Shipping Companies</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
          <div>
            <select
              value={filterDeviceStatus}
              onChange={(e) => setFilterDeviceStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Device Statuses</option>
              <option value="available">Has Available Devices</option>
              <option value="in_transit">Has Devices In Transit</option>
              <option value="needs_charge">Has Devices Needing Charge</option>
              <option value="damaged">Has Damaged Devices</option>
            </select>
          </div>
        </div>
      </div>

      {/* Custodians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustodians.map((custodian) => (
          <div
            key={custodian.id}
            onClick={() => navigate(`/admin/custody/${custodian.id}`)}
            className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-secondary hover:shadow-lg transition-all cursor-pointer p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{custodian.organizationName}</h3>
                <p className="text-xs text-gray-500">{custodian.id}</p>
              </div>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getCustodianTypeColor(custodian.custodianType)}`}>
                {custodian.custodianType}
              </span>
            </div>

            {/* Total Devices */}
            <div className="mb-4 bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Devices in Custody</p>
              <p className="text-3xl font-bold text-gray-900">{custodian.devicesInCustody}</p>
            </div>

            {/* Device Status Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available
                </span>
                <span className="font-semibold text-gray-900">{custodian.devicesAvailable}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  In Transit
                </span>
                <span className="font-semibold text-gray-900">{custodian.devicesInTransit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Needs Charge
                </span>
                <span className="font-semibold text-gray-900">{custodian.devicesNeedingCharge}</span>
              </div>
              {custodian.devicesDamaged > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Damaged
                  </span>
                  <span className="font-semibold text-red-600">{custodian.devicesDamaged}</span>
                </div>
              )}
            </div>

            {/* Footer Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Total Handovers</p>
                <p className="text-lg font-bold text-gray-900">{custodian.totalHandovers}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-lg font-bold text-yellow-600">{custodian.pendingHandovers}</p>
              </div>
            </div>

            {/* Location & Activity */}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-1 text-xs text-gray-500">
              <p className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {custodian.location}
              </p>
              <p>Last activity: {new Date(custodian.lastActivity).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredCustodians.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-500 font-medium">No custodians found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default CustodyDashboardPage;
