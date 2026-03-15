import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';

const GateOperationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Demo gate activities data
  const [gateActivities] = useState([
    {
      id: 'GATE-2024-1001',
      type: 'entry',
      containerNumber: 'MAEU-1234567',
      truckNumber: 'LAG-789-XY',
      driverName: 'Adewale Johnson',
      deviceId: 'DEV-GPS-1245',
      timestamp: '2024-03-11 14:23:00',
      gateNumber: 'Gate 3',
      status: 'completed',
      documentStatus: 'verified',
      remarks: 'All documentation complete',
    },
    {
      id: 'GATE-2024-1002',
      type: 'exit',
      containerNumber: 'MSCU-7654321',
      truckNumber: 'ABJ-456-ZW',
      driverName: 'Chioma Okeke',
      deviceId: 'DEV-GPS-1246',
      timestamp: '2024-03-11 14:45:00',
      gateNumber: 'Gate 1',
      status: 'completed',
      documentStatus: 'verified',
      remarks: 'Device handover completed',
    },
    {
      id: 'GATE-2024-1003',
      type: 'entry',
      containerNumber: 'CMAU-9876543',
      truckNumber: 'PH-123-AB',
      driverName: 'Ibrahim Mohammed',
      deviceId: 'DEV-GPS-1247',
      timestamp: '2024-03-11 15:12:00',
      gateNumber: 'Gate 2',
      status: 'in_progress',
      documentStatus: 'pending',
      remarks: 'Awaiting customs clearance',
    },
    {
      id: 'GATE-2024-1004',
      type: 'exit',
      containerNumber: 'HLBU-5432109',
      truckNumber: 'KN-987-CD',
      driverName: 'Fatima Bello',
      deviceId: null,
      timestamp: '2024-03-11 15:30:00',
      gateNumber: 'Gate 1',
      status: 'in_progress',
      documentStatus: 'issues',
      remarks: 'GPS device missing - investigation required',
    },
  ]);

  const filteredActivities = gateActivities.filter((activity) => {
    const matchesSearch =
      activity.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.containerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.truckNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.driverName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      filterType === 'all' || activity.type === filterType;

    return matchesSearch && matchesType;
  });

  const getTypeColor = (type) => {
    return type === 'entry' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  const getTypeIcon = (type) => {
    if (type === 'entry') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'issues':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'issues':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const stats = [
    {
      label: 'Total Today',
      value: gateActivities.length,
      icon: '📊',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Entries',
      value: gateActivities.filter(a => a.type === 'entry').length,
      icon: '⬇️',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      label: 'Exits',
      value: gateActivities.filter(a => a.type === 'exit').length,
      icon: '⬆️',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      label: 'In Progress',
      value: gateActivities.filter(a => a.status === 'in_progress').length,
      icon: '⏳',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gate Operations</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track container entry and exit at terminal gates
          </p>
        </div>
        <button
          className="px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Gate Activity
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
              placeholder="Search activities, containers, trucks..."
            />
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Activities</option>
              <option value="entry">Entries Only</option>
              <option value="exit">Exits Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gate Activities */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-secondary hover:shadow-lg transition-all p-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Section - Type Icon */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className={`p-3 rounded-full ${getTypeColor(activity.type)}`}>
                  {getTypeIcon(activity.type)}
                </div>
              </div>

              {/* Middle Section - Details */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{activity.id}</h3>
                    <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(activity.type)}`}>
                      {activity.type.toUpperCase()}
                    </span>
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status === 'in_progress' ? 'IN PROGRESS' : activity.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Container Number</p>
                    <p className="font-semibold text-gray-900">{activity.containerNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Truck Number</p>
                    <p className="font-semibold text-gray-900">{activity.truckNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Driver</p>
                    <p className="font-semibold text-gray-900">{activity.driverName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Gate Number</p>
                    <p className="font-semibold text-gray-900">{activity.gateNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">GPS Device</p>
                    <p className="font-semibold text-gray-900">{activity.deviceId || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Document Status</p>
                    <p className={`font-semibold ${getDocumentStatusColor(activity.documentStatus)}`}>
                      {activity.documentStatus.toUpperCase()}
                    </p>
                  </div>
                </div>

                {activity.remarks && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Remarks:</span> {activity.remarks}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Section - Actions */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all">
                  View Details
                </button>
                {activity.status === 'in_progress' && (
                  <button className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all">
                    Complete
                  </button>
                )}
                <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-all">
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500 font-medium">No gate activities found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default GateOperationsPage;
