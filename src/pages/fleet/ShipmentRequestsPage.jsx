import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';
import { useConfirm } from '../../context/ConfirmContext';

const ShipmentRequestsPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  const { confirm } = useConfirm();
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with API call later
  const shipmentRequests = [
    {
      id: '1',
      shipmentId: 'SHP-2024-001',
      shipper: {
        name: 'ABC Logistics Ltd',
        contact: '08012345678',
      },
      containers: [
        {
          number: 'ABCD1234567',
          size: '40ft',
          type: 'Dry',
        },
      ],
      assignedTruck: 'ABC-123-XY',
      route: {
        origin: 'Apapa Port',
        destination: 'Ikeja Warehouse',
        distance: '25km',
      },
      detentionPeriod: '48 hours',
      riskProfile: 'Low',
      insuranceCoverage: '₦50,000,000',
      expectedPickup: '2024-03-15 10:00 AM',
      status: 'Pending',
      requestDate: '2024-03-14',
    },
    {
      id: '2',
      shipmentId: 'SHP-2024-002',
      shipper: {
        name: 'XYZ Enterprises',
        contact: '08098765432',
      },
      containers: [
        {
          number: 'EFGH9876543',
          size: '20ft',
          type: 'Reefer',
        },
        {
          number: 'IJKL5432109',
          size: '20ft',
          type: 'Reefer',
        },
      ],
      assignedTruck: null,
      route: {
        origin: 'Tin Can Island Port',
        destination: 'Ota Industrial Area',
        distance: '45km',
      },
      detentionPeriod: '24 hours',
      riskProfile: 'Medium',
      insuranceCoverage: '₦75,000,000',
      expectedPickup: '2024-03-16 08:00 AM',
      status: 'Pending',
      requestDate: '2024-03-14',
    },
    {
      id: '3',
      shipmentId: 'SHP-2024-003',
      shipper: {
        name: 'Global Traders Inc',
        contact: '08087654321',
      },
      containers: [
        {
          number: 'MNOP1357924',
          size: '40ft',
          type: 'Dry',
        },
      ],
      assignedTruck: 'XYZ-456-AB',
      route: {
        origin: 'Lekki Deep Sea Port',
        destination: 'Ibadan Depot',
        distance: '120km',
      },
      detentionPeriod: '72 hours',
      riskProfile: 'High',
      insuranceCoverage: '₦100,000,000',
      expectedPickup: '2024-03-17 06:00 AM',
      status: 'Accepted',
      requestDate: '2024-03-14',
    },
  ];

  const filteredRequests = shipmentRequests.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status.toLowerCase() === filterStatus;
  });

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'modified':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAccept = async (request) => {
    const confirmed = await confirm({
      title: 'Accept Shipment Request',
      message: `Are you sure you want to accept shipment ${request.shipmentId}?`,
      confirmText: 'Accept',
      cancelText: 'Cancel',
      type: 'info',
    });

    if (confirmed) {
      showSuccess(`Shipment ${request.shipmentId} accepted successfully!`);
      // API call to accept shipment
    }
  };

  const handleDecline = async (request) => {
    const confirmed = await confirm({
      title: 'Decline Shipment Request',
      message: `Are you sure you want to decline shipment ${request.shipmentId}? Please provide a reason.`,
      confirmText: 'Decline',
      cancelText: 'Cancel',
      type: 'danger',
    });

    if (confirmed) {
      showSuccess(`Shipment ${request.shipmentId} declined.`);
      // API call to decline shipment
    }
  };

  const handleModify = (request) => {
    navigate(`/fleet/shipment-requests/${request.id}/modify`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shipment Requests</h1>
            <p className="text-sm text-gray-600 mt-1">View and manage incoming shipment requests from shippers</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-6 rounded-xl border border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Total Requests</p>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {shipmentRequests.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-6 rounded-xl border border-yellow-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Pending</p>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {shipmentRequests.filter(r => r.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-white to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Accepted</p>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {shipmentRequests.filter(r => r.status === 'Accepted').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-50 via-white to-red-100 p-6 rounded-xl border border-red-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Declined</p>
            </div>
            <p className="text-3xl font-bold text-red-600">
              {shipmentRequests.filter(r => r.status === 'Declined').length}
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
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="modified">Modified</option>
          </select>
        </div>
      </div>

      {/* Shipment Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{request.shipmentId}</h3>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getRiskColor(request.riskProfile)}`}>
                        {request.riskProfile} Risk
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>{request.shipper.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span>{request.shipper.contact}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>Requested: {request.requestDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {/* Containers */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Containers ({request.containers.length})
                    </h4>
                    <div className="space-y-2">
                      {request.containers.map((container, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-gray-900">{container.number}</div>
                          <div className="text-gray-600">{container.size} • {container.type}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Route */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Route
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">From:</span>
                        <div className="font-medium text-gray-900">{request.route.origin}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">To:</span>
                        <div className="font-medium text-gray-900">{request.route.destination}</div>
                      </div>
                      <div className="text-gray-600">Distance: {request.route.distance}</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      {request.assignedTruck && (
                        <div>
                          <span className="text-gray-600">Truck:</span>
                          <div className="font-medium text-gray-900">{request.assignedTruck}</div>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600">Detention:</span>
                        <div className="font-medium text-gray-900">{request.detentionPeriod}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Insurance:</span>
                        <div className="font-medium text-gray-900">{request.insuranceCoverage}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Pickup:</span>
                        <div className="font-medium text-gray-900">{request.expectedPickup}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {request.status === 'Pending' && (
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleDecline(request)}
                      className="px-4 py-2 text-sm font-semibold text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-all duration-200 cursor-pointer"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleModify(request)}
                      className="px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                    >
                      Modify Request
                    </button>
                    <button
                      onClick={() => handleAccept(request)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      Accept
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-sm font-medium text-gray-900">No shipment requests found</p>
            <p className="mt-1 text-xs text-gray-500">Try adjusting your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentRequestsPage;
