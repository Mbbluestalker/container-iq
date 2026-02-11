import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VehiclesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Mock data - replace with API call later
  const vehicles = [
    {
      id: '1',
      registrationNumber: 'ABC-123-XY',
      make: 'Mercedes-Benz',
      model: 'Actros',
      year: 2020,
      color: 'White',
      truckType: 'Flatbed',
      loadCapacity: 30,
      containerCompatibility: ['20ft', '40ft'],
      status: 'Available',
      frscCompliance: 'Compliant',
      hasGps: true,
      hasElock: true,
      assignedDriver: 'John Doe',
    },
    {
      id: '2',
      registrationNumber: 'XYZ-456-AB',
      make: 'Volvo',
      model: 'FH16',
      year: 2019,
      color: 'Blue',
      truckType: 'Skeletal',
      loadCapacity: 35,
      containerCompatibility: ['40ft'],
      status: 'Assigned',
      frscCompliance: 'Compliant',
      hasGps: true,
      hasElock: false,
      assignedDriver: 'Jane Smith',
    },
    {
      id: '3',
      registrationNumber: 'DEF-789-CD',
      make: 'MAN',
      model: 'TGX',
      year: 2021,
      color: 'Red',
      truckType: 'Tanker',
      loadCapacity: 25,
      containerCompatibility: ['20ft'],
      status: 'Under Maintenance',
      frscCompliance: 'Partially Compliant',
      hasGps: true,
      hasElock: true,
      assignedDriver: null,
    },
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch =
      vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vehicle.status.toLowerCase().replace(' ', '_') === filterStatus;
    const matchesType = filterType === 'all' || vehicle.truckType.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(' ', '_')) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'under_maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'out_of_service':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (status) => {
    switch (status.toLowerCase()) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'partially compliant':
        return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vehicles Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your fleet vehicles and their information</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/fleet/vehicles/bulk-upload')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-primary/30 text-primary rounded-xl hover:border-primary hover:shadow-md transition-all duration-200 font-semibold cursor-pointer hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Bulk Upload
            </button>
            <button
              onClick={() => navigate('/fleet/vehicles/new')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:from-secondary/90 hover:to-secondary transition-all duration-200 font-semibold shadow-lg shadow-secondary/30 cursor-pointer hover:scale-[1.02] hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Vehicle
            </button>
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
              <p className="text-sm font-semibold text-gray-600">Total Vehicles</p>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{vehicles.length}</p>
          </div>
          <div className="bg-gradient-to-br from-secondary/5 via-white to-green-50 p-6 rounded-xl border border-secondary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Available</p>
            </div>
            <p className="text-3xl font-bold text-secondary">
              {vehicles.filter(v => v.status === 'Available').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/5 via-purple-50 to-white p-6 rounded-xl border border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Assigned</p>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {vehicles.filter(v => v.status === 'Assigned').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-secondary/5 via-white to-secondary/10 p-6 rounded-xl border border-secondary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">GPS Equipped</p>
            </div>
            <p className="text-3xl font-bold text-secondary">
              {vehicles.filter(v => v.hasGps).length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-secondary transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by registration, make, or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md bg-white cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="skeletal">Skeletal</option>
            <option value="flatbed">Flatbed</option>
            <option value="tanker">Tanker</option>
            <option value="lowbed">Lowbed</option>
            <option value="box">Box / Dry Van</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md bg-white cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="assigned">Assigned</option>
            <option value="under_maintenance">Under Maintenance</option>
            <option value="out_of_service">Out of Service</option>
          </select>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              onClick={() => navigate(`/fleet/vehicles/${vehicle.id}`)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {vehicle.registrationNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>

                {/* Vehicle Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span className="text-gray-700">{vehicle.truckType}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700">{vehicle.loadCapacity}T</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">
                      {vehicle.containerCompatibility.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={`${getComplianceColor(vehicle.frscCompliance)} px-2 py-0.5 rounded text-xs font-medium`}>
                      {vehicle.frscCompliance}
                    </span>
                  </div>
                </div>

                {/* Telematics */}
                <div className="flex items-center gap-3 mb-4 pt-4 border-t border-gray-200">
                  <div className={`flex items-center gap-1 text-xs ${vehicle.hasGps ? 'text-green-600' : 'text-gray-400'}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>GPS</span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${vehicle.hasElock ? 'text-green-600' : 'text-gray-400'}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>E-Lock</span>
                  </div>
                </div>

                {/* Assigned Driver */}
                {vehicle.assignedDriver ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600 pt-3 border-t border-gray-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Driver: <span className="font-medium text-gray-900">{vehicle.assignedDriver}</span></span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 pt-3 border-t border-gray-200">
                    No driver assigned
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
              <p className="mt-4 text-sm font-medium text-gray-900">No vehicles found</p>
              <p className="mt-1 text-xs text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesPage;
