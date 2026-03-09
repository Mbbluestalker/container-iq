import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClaimsPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [filterStatus, setFilterStatus] = useState('all');

  // Mock claims data
  const claims = [
    {
      id: 'CLM-2024-001',
      shipmentId: 'SHP-2024-001',
      containerNumber: 'MSCU1234567',
      incidentType: 'Cargo Theft',
      incidentDate: '2024-02-15',
      filedDate: '2024-02-15',
      status: 'Under Investigation',
      claimAmount: '₦5,500,000',
      insurer: 'Nigerian Insurance Corp',
      lastUpdate: '2024-02-20',
      assignedSurveyor: 'John Okafor',
    },
    {
      id: 'CLM-2024-002',
      shipmentId: 'SHP-2024-003',
      containerNumber: 'TEMU9876543',
      incidentType: 'Container Damage',
      incidentDate: '2024-02-10',
      filedDate: '2024-02-10',
      status: 'Approved',
      claimAmount: '₦2,300,000',
      approvedAmount: '₦2,300,000',
      insurer: 'AIICO Insurance',
      lastUpdate: '2024-02-18',
      settlementStatus: 'Payment In Progress',
    },
    {
      id: 'CLM-2024-003',
      shipmentId: 'SHP-2024-005',
      containerNumber: 'CSQU4567890',
      incidentType: 'Route Deviation',
      incidentDate: '2024-02-05',
      filedDate: '2024-02-05',
      status: 'Rejected',
      claimAmount: '₦1,800,000',
      insurer: 'Leadway Assurance',
      lastUpdate: '2024-02-12',
      rejectionReason: 'Deviation was authorized by shipper',
    },
    {
      id: 'CLM-2024-004',
      shipmentId: 'SHP-2024-007',
      containerNumber: 'HLBU2345678',
      incidentType: 'Seal Breach',
      incidentDate: '2024-01-28',
      filedDate: '2024-01-28',
      status: 'Closed',
      claimAmount: '₦3,200,000',
      approvedAmount: '₦3,200,000',
      insurer: 'Nigerian Insurance Corp',
      lastUpdate: '2024-02-10',
      settlementStatus: 'Fully Paid',
      settlementDate: '2024-02-10',
    },
  ];

  // Calculate stats
  const stats = {
    total: claims.length,
    pending: claims.filter(c => ['Reported', 'Acknowledged', 'Under Investigation'].includes(c.status)).length,
    approved: claims.filter(c => c.status === 'Approved').length,
    closed: claims.filter(c => c.status === 'Closed').length,
    totalClaimAmount: claims.reduce((sum, c) => sum + parseFloat(c.claimAmount.replace(/[₦,]/g, '')), 0),
  };

  // Filter claims
  const filteredClaims = claims.filter(claim => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return ['Reported', 'Acknowledged', 'Under Investigation'].includes(claim.status);
    if (filterStatus === 'approved') return claim.status === 'Approved';
    if (filterStatus === 'rejected') return claim.status === 'Rejected';
    if (filterStatus === 'closed') return claim.status === 'Closed';
    return true;
  });

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Reported':
      case 'Acknowledged':
        return 'bg-blue-100 text-blue-800';
      case 'Under Investigation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Claims Management</h1>
          <p className="text-gray-600 mt-1">File and track insurance claims for your shipments</p>
        </div>
        <button
          onClick={() => navigate('/shipper/claims/new')}
          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          + File New Claim
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Claims</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Closed</p>
          <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Claimed</p>
          <p className="text-xl font-bold text-gray-900">₦{stats.totalClaimAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg ${
              filterStatus === 'all'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Claims
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg ${
              filterStatus === 'pending'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-4 py-2 rounded-lg ${
              filterStatus === 'approved'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-4 py-2 rounded-lg ${
              filterStatus === 'rejected'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rejected
          </button>
          <button
            onClick={() => setFilterStatus('closed')}
            className={`px-4 py-2 rounded-lg ${
              filterStatus === 'closed'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Closed
          </button>
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {filteredClaims.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-500">No claims found</p>
            <button
              onClick={() => navigate('/shipper/claims/new')}
              className="mt-4 text-primary hover:underline"
            >
              File your first claim
            </button>
          </div>
        ) : (
          filteredClaims.map((claim) => (
            <div key={claim.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{claim.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Shipment: {claim.shipmentId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{claim.claimAmount}</p>
                  {claim.approvedAmount && (
                    <p className="text-sm text-green-600 mt-1">Approved: {claim.approvedAmount}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Container</p>
                  <p className="text-sm font-medium text-gray-900">{claim.containerNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Incident Type</p>
                  <p className="text-sm font-medium text-gray-900">{claim.incidentType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Incident Date</p>
                  <p className="text-sm font-medium text-gray-900">{claim.incidentDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Insurer</p>
                  <p className="text-sm font-medium text-gray-900">{claim.insurer}</p>
                </div>
              </div>

              {/* Additional Info based on status */}
              {claim.assignedSurveyor && (
                <div className="bg-blue-50 p-3 rounded mb-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">Assigned Surveyor:</span> {claim.assignedSurveyor}
                  </p>
                </div>
              )}

              {claim.settlementStatus && (
                <div className="bg-green-50 p-3 rounded mb-4">
                  <p className="text-sm text-green-900">
                    <span className="font-medium">Settlement Status:</span> {claim.settlementStatus}
                  </p>
                  {claim.settlementDate && (
                    <p className="text-sm text-green-900">
                      <span className="font-medium">Settlement Date:</span> {claim.settlementDate}
                    </p>
                  )}
                </div>
              )}

              {claim.rejectionReason && (
                <div className="bg-red-50 p-3 rounded mb-4">
                  <p className="text-sm text-red-900">
                    <span className="font-medium">Rejection Reason:</span> {claim.rejectionReason}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-xs text-gray-500">Last updated: {claim.lastUpdate}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/shipper/claims/${claim.id}`)}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded hover:opacity-90 transition-opacity text-sm"
                  >
                    View Details
                  </button>
                  {claim.status === 'Under Investigation' && (
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                      Add Evidence
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

export default ClaimsPage;
