import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirm } from '../../context/ConfirmContext';
import { useAlert } from '../../context/AlertContext';

const RouteDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const confirm = useConfirm();
  const { showSuccess, showError } = useAlert();

  // Mock route data (to be replaced with API call)
  const [route] = useState({
    id: 'RT-001',
    name: 'Lagos Ports to Ikeja Industrial Corridor',
    origin: {
      id: 'APM',
      name: 'Apapa Port Complex',
      type: 'seaport',
      city: 'Lagos',
      state: 'Lagos'
    },
    destination: {
      id: 'ICD-IKJ',
      name: 'Ikeja ICD',
      type: 'icd',
      city: 'Ikeja',
      state: 'Lagos'
    },
    distance: 25,
    estimatedDuration: '2-3 hours',
    riskLevel: 'Low',
    insuranceMultiplier: 1.0,
    maxParkingTime: 30,
    requiresDaytimeOnly: false,
    tollFees: 2500,
    roadConditions: 'Generally good road conditions. Some traffic congestion during peak hours (7-10am, 4-7pm). Well-maintained highway with clear signage.',
    securityNotes: 'Low security risk. Well-patrolled route. No major security concerns reported in the past 12 months.',
    waypoints: 'Apapa Port Complex → Costain Roundabout → Funsho Williams Avenue → Ikorodu Road → Ikeja ICD',
    alternativeRoutes: 'In case of traffic: Use Third Mainland Bridge → Ojota → Ikorodu Road → Ikeja',
    status: 'Active',
    createdDate: '2024-01-15',
    lastUpdated: '2024-03-01',
    totalShipments: 1245,
    activeShipments: 23,
    completedShipments: 1222,
    averageTransitTime: '2.5 hours',
    onTimeDeliveryRate: 94.5,
  });

  const handleDeactivate = async () => {
    const confirmed = await confirm({
      title: 'Deactivate Route',
      message: 'Are you sure you want to deactivate this route? Active shipments on this route will not be affected, but no new shipments can be assigned.',
      type: 'warning',
    });

    if (confirmed) {
      // TODO: Call API to deactivate route
      showSuccess('Route deactivated successfully');
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Route',
      message: 'Are you sure you want to delete this route? This action cannot be undone. Only routes with zero shipments can be deleted.',
      type: 'danger',
    });

    if (confirmed) {
      if (route.totalShipments > 0) {
        showError('Cannot delete route with existing shipments. Please deactivate instead.');
        return;
      }
      // TODO: Call API to delete route
      showSuccess('Route deleted successfully');
      navigate('/admin/routes');
    }
  };

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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/routes')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{route.name}</h1>
            <p className="text-sm text-gray-600 mt-1">Route ID: {route.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/admin/routes/${route.id}/edit`)}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Edit Route
          </button>
          <button
            onClick={handleDeactivate}
            className="px-6 py-3 bg-yellow-50 border-2 border-yellow-300 text-yellow-700 font-semibold rounded-xl hover:bg-yellow-100 transition-all"
          >
            Deactivate
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-50 border-2 border-red-300 text-red-700 font-semibold rounded-xl hover:bg-red-100 transition-all"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-600">Total Shipments</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{route.totalShipments.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-1">{route.activeShipments} currently active</p>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-600">Avg Transit Time</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{route.averageTransitTime}</p>
          <p className="text-xs text-gray-500 mt-1">Estimated: {route.estimatedDuration}</p>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-600">On-Time Rate</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{route.onTimeDeliveryRate}%</p>
          <p className="text-xs text-gray-500 mt-1">Last 90 days</p>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <p className="text-sm font-medium text-gray-600">Status</p>
          <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full mt-2 ${getStatusBadgeColor(route.status)}`}>
            {route.status}
          </span>
        </div>
      </div>

      {/* Route Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Origin & Destination */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📍 Route Endpoints</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Origin</p>
              <p className="text-base font-semibold text-gray-900 mt-1">{route.origin.name}</p>
              <p className="text-sm text-gray-600">{route.origin.city}, {route.origin.state}</p>
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 mt-1">
                {route.origin.type === 'seaport' ? 'Seaport' : route.origin.type === 'icd' ? 'ICD' : 'Border Post'}
              </span>
            </div>

            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Destination</p>
              <p className="text-base font-semibold text-gray-900 mt-1">{route.destination.name}</p>
              <p className="text-sm text-gray-600">{route.destination.city}, {route.destination.state}</p>
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-800 mt-1">
                {route.destination.type === 'seaport' ? 'Seaport' : route.destination.type === 'icd' ? 'ICD' : 'Border Post'}
              </span>
            </div>
          </div>
        </div>

        {/* Distance & Duration */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🚚 Distance & Duration</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Distance</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{route.distance} km</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Estimated Duration</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">{route.estimatedDuration}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Toll Fees</p>
              <p className="text-xl font-semibold text-gray-900 mt-1">₦{route.tollFees.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk & Insurance */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Risk & Insurance Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Risk Level</p>
            <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full mt-2 ${getRiskBadgeColor(route.riskLevel)}`}>
              {route.riskLevel} Risk
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Insurance Multiplier</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{route.insuranceMultiplier}x</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Max Parking Time</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{route.maxParkingTime} min</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase">Movement Restriction</p>
            <p className="text-sm font-semibold text-gray-900 mt-3">
              {route.requiresDaytimeOnly ? '🌞 Daytime Only' : '🌓 24/7 Allowed'}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📝 Additional Route Information</h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Road Conditions</p>
            <p className="text-sm text-gray-600 mt-2">{route.roadConditions}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Security Notes</p>
            <p className="text-sm text-gray-600 mt-2">{route.securityNotes}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Waypoints / Checkpoints</p>
            <p className="text-sm text-gray-600 mt-2">{route.waypoints}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Alternative Routes</p>
            <p className="text-sm text-gray-600 mt-2">{route.alternativeRoutes}</p>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Created Date:</p>
            <p className="font-semibold text-gray-900">{new Date(route.createdDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Last Updated:</p>
            <p className="font-semibold text-gray-900">{new Date(route.lastUpdated).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailPage;
