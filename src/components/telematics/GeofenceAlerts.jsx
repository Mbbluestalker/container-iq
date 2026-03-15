import React, { useState } from 'react';

const GeofenceAlerts = ({ shipmentData }) => {
  const [alerts] = useState([
    {
      id: 1,
      type: 'route_deviation',
      severity: 'high',
      title: 'Route Deviation Detected',
      message: 'Vehicle deviated 2.3km from approved route corridor',
      location: 'Ikorodu Road, Lagos',
      timestamp: '2026-03-15 11:32:15',
      distance: '2.3 km',
      status: 'active',
      actionTaken: 'Fleet operator notified'
    },
    {
      id: 2,
      type: 'extended_stop',
      severity: 'medium',
      title: 'Extended Stop Duration',
      message: 'Vehicle stopped for 45 minutes - exceeds 30-minute threshold',
      location: 'Ojota Bus Stop',
      timestamp: '2026-03-15 10:15:00',
      duration: '45 mins',
      status: 'resolved',
      actionTaken: 'Driver provided explanation: Traffic jam'
    },
    {
      id: 3,
      type: 'unauthorized_zone',
      severity: 'critical',
      title: 'Unauthorized Zone Entry',
      message: 'Vehicle entered restricted area - high-risk zone flagged by insurance',
      location: 'Apapa-Oshodi Expressway (Restricted)',
      timestamp: '2026-03-15 09:45:22',
      status: 'escalated',
      actionTaken: 'Insurance provider alerted, premium adjusted'
    }
  ]);

  const [geofenceStatus] = useState({
    routeCompliance: 87,
    totalCheckpoints: 8,
    passedCheckpoints: 6,
    remainingCheckpoints: 2,
    approvedCorridorWidth: '500m',
    currentDeviation: '0m',
    maxDeviationAllowed: '1km'
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'high':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'high':
        return (
          <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">Active</span>;
      case 'resolved':
        return <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">Resolved</span>;
      case 'escalated':
        return <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">Escalated</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
    }
  };

  if (!shipmentData || shipmentData.status !== 'In Transit') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Geofence & Route Monitoring</h3>
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-sm text-gray-500">Geofence monitoring inactive</p>
          <p className="text-xs text-gray-400 mt-1">Monitoring starts when shipment is in transit</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Route Compliance Overview */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Route Compliance Status</h3>

        {/* Compliance Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Compliance</span>
            <span className="text-2xl font-bold text-green-600">{geofenceStatus.routeCompliance}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full flex items-center justify-end px-2"
              style={{ width: `${geofenceStatus.routeCompliance}%` }}
            >
              <span className="text-xs font-bold text-white">Good</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Based on approved corridor adherence and checkpoint validation</p>
        </div>

        {/* Checkpoint Progress */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-xs text-blue-600 font-medium mb-1">Total Checkpoints</p>
            <p className="text-2xl font-bold text-blue-900">{geofenceStatus.totalCheckpoints}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-green-600 font-medium mb-1">Passed</p>
            <p className="text-2xl font-bold text-green-900">{geofenceStatus.passedCheckpoints}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <p className="text-xs text-orange-600 font-medium mb-1">Remaining</p>
            <p className="text-2xl font-bold text-orange-900">{geofenceStatus.remainingCheckpoints}</p>
          </div>
        </div>

        {/* Geofence Parameters */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Geofence Parameters</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-500 mb-1">Approved Corridor Width</p>
              <p className="font-semibold text-gray-900">{geofenceStatus.approvedCorridorWidth}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Current Deviation</p>
              <p className="font-semibold text-green-600">{geofenceStatus.currentDeviation}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Max Deviation Allowed</p>
              <p className="font-semibold text-gray-900">{geofenceStatus.maxDeviationAllowed}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Monitoring Status</p>
              <p className="font-semibold text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Geofence Alerts</h3>
          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
            {alerts.filter(a => a.status === 'active').length} Active
          </span>
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-green-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-500 font-medium">No geofence violations</p>
            <p className="text-xs text-gray-400 mt-1">All movements within approved corridors</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold">{alert.title}</h4>
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-sm mb-2">{alert.message}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div>
                        <span className="font-medium">Location:</span> {alert.location}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {alert.timestamp}
                      </div>
                      {alert.distance && (
                        <div>
                          <span className="font-medium">Distance:</span> {alert.distance}
                        </div>
                      )}
                      {alert.duration && (
                        <div>
                          <span className="font-medium">Duration:</span> {alert.duration}
                        </div>
                      )}
                    </div>
                    <div className="bg-white/50 rounded px-2 py-1 text-xs">
                      <span className="font-medium">Action Taken:</span> {alert.actionTaken}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Real-Time Geofence Monitoring</h4>
            <p className="text-xs text-gray-700">
              ContainerIQ continuously monitors vehicle position against approved route corridors. All deviations trigger
              immediate alerts to fleet operators, insurance providers, and shippers. Geofence violations impact scorecard ratings
              and may affect insurance coverage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeofenceAlerts;
