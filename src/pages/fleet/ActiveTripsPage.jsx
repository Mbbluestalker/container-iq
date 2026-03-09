import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActiveTripsPage = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with API call later
  const activeTrips = [
    {
      id: '1',
      shipmentId: 'SHP-2024-001',
      containerNumber: 'ABCD1234567',
      truck: {
        registration: 'ABC-123-XY',
        type: 'Flatbed',
      },
      driver: {
        name: 'John Doe',
        phone: '08012345678',
      },
      route: {
        origin: 'Apapa Port',
        destination: 'Ikeja Warehouse',
        progress: 65,
      },
      status: 'In Transit',
      currentLocation: 'Ojota, Lagos',
      eta: '2 hours 15 mins',
      startTime: '2024-03-15 08:00 AM',
      sealStatus: 'Intact',
      gpsStatus: 'Active',
      alerts: [],
    },
    {
      id: '2',
      shipmentId: 'SHP-2024-003',
      containerNumber: 'MNOP1357924',
      truck: {
        registration: 'XYZ-456-AB',
        type: 'Skeletal',
      },
      driver: {
        name: 'Jane Smith',
        phone: '08098765432',
      },
      route: {
        origin: 'Lekki Deep Sea Port',
        destination: 'Ibadan Depot',
        progress: 25,
      },
      status: 'In Transit',
      currentLocation: 'Ikorodu, Lagos',
      eta: '4 hours 30 mins',
      startTime: '2024-03-15 10:30 AM',
      sealStatus: 'Intact',
      gpsStatus: 'Active',
      alerts: [],
    },
    {
      id: '3',
      shipmentId: 'SHP-2024-005',
      containerNumber: 'QRST2468013',
      truck: {
        registration: 'DEF-789-CD',
        type: 'Tanker',
      },
      driver: {
        name: 'Mike Johnson',
        phone: '08087654321',
      },
      route: {
        origin: 'Tin Can Island Port',
        destination: 'Kano Industrial Zone',
        progress: 15,
      },
      status: 'Incident',
      currentLocation: 'Berger, Lagos',
      eta: 'Delayed',
      startTime: '2024-03-15 06:00 AM',
      sealStatus: 'Tampered',
      gpsStatus: 'Active',
      alerts: [
        {
          type: 'Seal Breach',
          time: '11:45 AM',
          severity: 'High',
        },
      ],
    },
  ];

  const filteredTrips = activeTrips.filter(trip => {
    if (filterStatus === 'all') return true;
    return trip.status.toLowerCase().replace(' ', '_') === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(' ', '_')) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'incident':
        return 'bg-red-100 text-red-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'delayed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSealStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'intact':
        return 'text-green-600';
      case 'tampered':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Active Trips</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor ongoing shipments and container movements</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-6 rounded-xl border border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Active Trips</p>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {activeTrips.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">In Transit</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {activeTrips.filter(t => t.status === 'In Transit').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 via-white to-red-100 p-6 rounded-xl border border-red-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Incidents</p>
            </div>
            <p className="text-3xl font-bold text-red-600">
              {activeTrips.filter(t => t.status === 'Incident').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-white to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Seal Intact</p>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {activeTrips.filter(t => t.sealStatus === 'Intact').length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md bg-white cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="in_transit">In Transit</option>
            <option value="incident">Incident</option>
            <option value="delivered">Delivered</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
      </div>

      {/* Active Trips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/fleet/trips/${trip.id}`)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{trip.shipmentId}</h3>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
                        {trip.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Container: {trip.containerNumber}</p>
                  </div>
                  {trip.alerts.length > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {trip.alerts.length} Alert{trip.alerts.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                {/* Route Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">{trip.route.origin}</span>
                    <span className="font-semibold text-secondary">{trip.route.progress}%</span>
                    <span className="text-gray-600">{trip.route.destination}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-secondary to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${trip.route.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Truck</p>
                    <p className="text-sm font-semibold text-gray-900">{trip.truck.registration}</p>
                    <p className="text-xs text-gray-600">{trip.truck.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Driver</p>
                    <p className="text-sm font-semibold text-gray-900">{trip.driver.name}</p>
                    <p className="text-xs text-gray-600">{trip.driver.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Current Location</p>
                    <p className="text-sm font-semibold text-gray-900">{trip.currentLocation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">ETA</p>
                    <p className="text-sm font-semibold text-gray-900">{trip.eta}</p>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className={`w-5 h-5 ${getSealStatusColor(trip.sealStatus)}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className={`font-medium ${getSealStatusColor(trip.sealStatus)}`}>
                      Seal: {trip.sealStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-green-600">GPS: {trip.gpsStatus}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 ml-auto">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{trip.startTime}</span>
                  </div>
                </div>

                {/* Alerts */}
                {trip.alerts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {trip.alerts.map((alert, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-red-900">{alert.type}</p>
                          <p className="text-xs text-red-700">{alert.time}</p>
                        </div>
                        <span className="px-2 py-1 bg-red-200 text-red-800 text-xs font-medium rounded">
                          {alert.severity}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <p className="mt-4 text-sm font-medium text-gray-900">No active trips found</p>
              <p className="mt-1 text-xs text-gray-500">Try adjusting your filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveTripsPage;
