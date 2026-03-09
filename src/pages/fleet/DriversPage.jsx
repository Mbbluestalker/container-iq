import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetDriversQuery, useDeactivateDriverMutation, useActivateDriverMutation } from '../../services/api';
import { useAlert } from '../../context/AlertContext';
import { useConfirm } from '../../context/ConfirmContext';

const DriversPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { showSuccess, showError } = useAlert();
  const { confirm } = useConfirm();

  const { user } = useSelector((state) => state.auth);
  const fleetId = user?.fleet?.id;

  // Fetch drivers from API
  const { data: driversData, isLoading, isError, error } = useGetDriversQuery(fleetId, {
    skip: !fleetId, // Skip the query if fleetId is not available
  });

  const [deactivateDriver, { isLoading: isDeactivating }] = useDeactivateDriverMutation();
  const [activateDriver, { isLoading: isActivating }] = useActivateDriverMutation();

  const drivers = driversData?.data || [];

  const handleDeactivateDriver = async (e, driverId, driverName) => {
    e.stopPropagation();

    const confirmed = await confirm({
      title: 'Deactivate Driver',
      message: `Are you sure you want to deactivate ${driverName}? This action can be reversed later.`,
      confirmText: 'Deactivate',
      cancelText: 'Cancel',
      type: 'danger',
    });

    if (confirmed) {
      try {
        await deactivateDriver(driverId).unwrap();
        showSuccess('Driver deactivated successfully!');
      } catch (error) {
        showError(error?.data?.message || 'Failed to deactivate driver. Please try again.');
        console.error('Deactivate driver error:', error);
      }
    }
  };

  const handleActivateDriver = async (e, driverId, driverName) => {
    e.stopPropagation();

    const confirmed = await confirm({
      title: 'Activate Driver',
      message: `Are you sure you want to activate ${driverName}?`,
      confirmText: 'Activate',
      cancelText: 'Cancel',
      type: 'info',
    });

    if (confirmed) {
      try {
        await activateDriver(driverId).unwrap();
        showSuccess('Driver activated successfully!');
      } catch (error) {
        showError(error?.data?.message || 'Failed to activate driver. Please try again.');
        console.error('Activate driver error:', error);
      }
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.licenseNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    // Map isActive boolean to status string for filtering
    const driverStatus = driver.isActive ? 'active' : 'inactive';
    const matchesFilter = filterStatus === 'all' || driverStatus === filterStatus.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (isActive) => {
    if (isActive) {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (isActive) => {
    return isActive ? 'Active' : 'Inactive';
  };


  // Loading state
  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-secondary mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-sm font-medium text-gray-900">Loading drivers...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-900">Failed to load drivers</h3>
              <p className="mt-1 text-sm text-red-700">{error?.data?.message || 'An error occurred while fetching drivers.'}</p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Drivers Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your fleet drivers and their information</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/fleet/drivers/bulk-upload')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white to-gray-50 border-2 border-primary/30 text-primary rounded-xl hover:border-primary hover:shadow-md transition-all duration-200 font-semibold cursor-pointer hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Bulk Upload
            </button>
            <button
              onClick={() => navigate('/fleet/drivers/new')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:from-secondary/90 hover:to-secondary transition-all duration-200 font-semibold shadow-lg shadow-secondary/30 cursor-pointer hover:scale-[1.02] hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Driver
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-6 rounded-xl border border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Total Drivers</p>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{drivers.length}</p>
          </div>
          <div className="bg-gradient-to-br from-secondary/5 via-white to-green-50 p-6 rounded-xl border border-secondary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Active</p>
            </div>
            <p className="text-3xl font-bold text-secondary">
              {drivers.filter(d => d.isActive === true).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/5 via-purple-50 to-white p-6 rounded-xl border border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Available</p>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {drivers.filter(d => !d.assignedTruck && d.isActive === true).length}
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
              placeholder="Search by name or license number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md bg-white cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary border-b border-primary">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  License
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Assigned Truck
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <tr key={driver._id || driver.id} className="hover:bg-blue-50/50 transition-all duration-200 cursor-pointer" onClick={() => navigate(`/fleet/drivers/${driver._id || driver.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{driver.fullName}</div>
                        <div className="text-sm text-gray-500">{driver.phoneNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{driver.licenseNumber}</div>
                        <div className="text-xs text-gray-500">Exp: {driver.licenseExpiry ? new Date(driver.licenseExpiry).toLocaleDateString() : 'N/A'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{driver.yearsOfExp || 0} years</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {driver.assignedTruck ? (
                        <span className="text-sm font-medium text-blue-600">{driver.assignedTruck}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(driver.isActive)}`}>
                        {getStatusText(driver.isActive)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/fleet/drivers/${driver._id || driver.id}`);
                          }}
                          className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary rounded-lg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.05]"
                        >
                          <span>View</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        {driver.isActive ? (
                          <button
                            onClick={(e) => handleDeactivateDriver(e, driver._id || driver.id, driver.fullName)}
                            disabled={isDeactivating}
                            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.05] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            <span>Deactivate</span>
                          </button>
                        ) : (
                          <button
                            onClick={(e) => handleActivateDriver(e, driver._id || driver.id, driver.fullName)}
                            disabled={isActivating}
                            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-lg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.05] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Activate</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="mt-4 text-sm font-medium">No drivers found</p>
                    <p className="mt-1 text-xs">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriversPage;
