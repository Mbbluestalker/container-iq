import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import { nigerianLocations } from '../../data/demoShipmentData';

const RoutesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');

  // Demo routes data (to be replaced with API)
  const [routes] = useState([
    {
      id: 'RT-001',
      name: 'Lagos Ports to Ikeja Industrial Corridor',
      origin: { id: 'APM', name: 'Apapa Port Complex', type: 'seaport', city: 'Lagos' },
      destination: { id: 'ICD-IKJ', name: 'Ikeja ICD', type: 'icd', city: 'Lagos' },
      distance: 25,
      estimatedDuration: '2-3 hours',
      riskLevel: 'Low',
      insuranceMultiplier: 1.0,
      maxParkingTime: 30,
      requiresDaytimeOnly: false,
      status: 'Active',
      createdDate: '2024-01-15',
      totalShipments: 1245,
    },
    {
      id: 'RT-002',
      name: 'Apapa to Ibadan Corridor',
      origin: { id: 'APM', name: 'Apapa Port Complex', type: 'seaport', city: 'Lagos' },
      destination: { id: 'ICD-IBD', name: 'Ibadan ICD', type: 'icd', city: 'Ibadan' },
      distance: 145,
      estimatedDuration: '4-6 hours',
      riskLevel: 'Medium',
      insuranceMultiplier: 1.2,
      maxParkingTime: 45,
      requiresDaytimeOnly: true,
      status: 'Active',
      createdDate: '2024-01-10',
      totalShipments: 856,
    },
    {
      id: 'RT-003',
      name: 'Lagos to Port Harcourt Interstate Route',
      origin: { id: 'TIN', name: 'Tin Can Island Port Complex', type: 'seaport', city: 'Lagos' },
      destination: { id: 'ONN', name: 'Onne Port Complex', type: 'seaport', city: 'Port Harcourt' },
      distance: 680,
      estimatedDuration: '12-16 hours',
      riskLevel: 'High',
      insuranceMultiplier: 1.5,
      maxParkingTime: 60,
      requiresDaytimeOnly: true,
      status: 'Active',
      createdDate: '2024-02-01',
      totalShipments: 423,
    },
    {
      id: 'RT-004',
      name: 'Lekki Port to Kano ICD Corridor',
      origin: { id: 'LDP', name: 'Lekki Deep Seaport', type: 'seaport', city: 'Lagos' },
      destination: { id: 'ICD-KAN', name: 'Kano ICD', type: 'icd', city: 'Kano' },
      distance: 1050,
      estimatedDuration: '18-24 hours',
      riskLevel: 'High',
      insuranceMultiplier: 1.8,
      maxParkingTime: 120,
      requiresDaytimeOnly: true,
      status: 'Active',
      createdDate: '2024-02-15',
      totalShipments: 234,
    },
    {
      id: 'RT-005',
      name: 'Tin Can to Seme Border Route',
      origin: { id: 'TIN', name: 'Tin Can Island Port Complex', type: 'seaport', city: 'Lagos' },
      destination: { id: 'BRD-SEM', name: 'Seme Border Post', type: 'border_post', city: 'Badagry' },
      distance: 85,
      estimatedDuration: '3-5 hours',
      riskLevel: 'Medium',
      insuranceMultiplier: 1.3,
      maxParkingTime: 45,
      requiresDaytimeOnly: false,
      status: 'Active',
      createdDate: '2024-01-20',
      totalShipments: 567,
    },
    {
      id: 'RT-006',
      name: 'Apapa to Kaduna ICD Route',
      origin: { id: 'APM', name: 'Apapa Port Complex', type: 'seaport', city: 'Lagos' },
      destination: { id: 'ICD-KDN', name: 'Kaduna ICD', type: 'icd', city: 'Kaduna' },
      distance: 785,
      estimatedDuration: '14-18 hours',
      riskLevel: 'High',
      insuranceMultiplier: 1.6,
      maxParkingTime: 90,
      requiresDaytimeOnly: true,
      status: 'Under Review',
      createdDate: '2024-03-01',
      totalShipments: 0,
    },
  ]);

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.origin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.destination.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || route.status === filterStatus;
    const matchesRisk = filterRisk === 'all' || route.riskLevel === filterRisk;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    {
      label: 'Total Routes',
      value: routes.length,
      icon: '🛣️',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Active Routes',
      value: routes.filter((r) => r.status === 'Active').length,
      icon: '✅',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      label: 'High Risk Routes',
      value: routes.filter((r) => r.riskLevel === 'High').length,
      icon: '⚠️',
      color: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      label: 'Total Shipments',
      value: routes.reduce((sum, r) => sum + r.totalShipments, 0).toLocaleString(),
      icon: '📦',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage approved container transport routes across Nigeria
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/routes/new')}
          className="px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Route
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search routes, origin, destination..."
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Origin
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Distance
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Shipments
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRoutes.map((route) => (
                <tr
                  key={route.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/routes/${route.id}`)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{route.name}</p>
                      <p className="text-xs text-gray-500">{route.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{route.origin.name}</p>
                      <p className="text-xs text-gray-500">{route.origin.city}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{route.destination.name}</p>
                      <p className="text-xs text-gray-500">{route.destination.city}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{route.distance} km</p>
                      <p className="text-xs text-gray-500">{route.estimatedDuration}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRiskBadgeColor(route.riskLevel)}`}>
                      {route.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(route.status)}`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900">{route.totalShipments.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/routes/${route.id}/edit`);
                      }}
                      className="text-secondary hover:text-secondary/80 font-medium text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="mt-4 text-gray-500 font-medium">No routes found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
