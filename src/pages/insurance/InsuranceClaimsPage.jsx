import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InsuranceClaimsPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [filterStatus, setFilterStatus] = useState('all');

  // Mock claims data
  const claims = [
    {
      id: 'CLM-2024-001',
      shipmentId: 'SHP-2024-001',
      containerNumber: 'MSCU1234567',
      shipper: 'ABC Imports Ltd',
      incidentType: 'Cargo Theft',
      incidentDate: '2024-02-15 14:25:00',
      filedDate: '2024-02-15 15:30:00',
      status: 'Under Investigation',
      claimAmount: '₦5,500,000',
      policyNumber: 'NIC-2024-12345',
      surveyor: 'John Okafor',
      priority: 'High',
      daysOpen: 14,
      // Evidence
      evidenceAvailable: true,
      evidenceTypes: ['GPS Data', 'Seal Breach Log', 'Tamper Alerts', 'Door Events'],
    },
    {
      id: 'CLM-2024-002',
      shipmentId: 'SHP-2024-003',
      containerNumber: 'TEMU9876543',
      shipper: 'XYZ Logistics',
      incidentType: 'Container Damage',
      incidentDate: '2024-02-10 09:15:00',
      filedDate: '2024-02-10 10:00:00',
      status: 'Reported',
      claimAmount: '₦2,300,000',
      policyNumber: 'AIICO-2024-67890',
      surveyor: null,
      priority: 'Medium',
      daysOpen: 19,
      evidenceAvailable: true,
      evidenceTypes: ['GPS Data', 'Route History', 'Dwell Times'],
    },
    {
      id: 'CLM-2024-003',
      shipmentId: 'SHP-2024-005',
      containerNumber: 'CSQU4567890',
      shipper: 'Global Traders Inc',
      incidentType: 'Route Deviation',
      incidentDate: '2024-02-05 16:30:00',
      filedDate: '2024-02-05 18:00:00',
      status: 'Decision Issued',
      decision: 'Rejected',
      claimAmount: '₦1,800,000',
      policyNumber: 'NIC-2024-54321',
      surveyor: 'Ada Nwosu',
      priority: 'Low',
      daysOpen: 24,
      rejectionReason: 'Deviation was authorized by shipper',
      evidenceAvailable: true,
      evidenceTypes: ['GPS Data', 'Route Compliance', 'Authorization Records'],
    },
    {
      id: 'CLM-2024-004',
      shipmentId: 'SHP-2024-007',
      containerNumber: 'HLBU2345678',
      shipper: 'Premium Foods Ltd',
      incidentType: 'Seal Breach',
      incidentDate: '2024-01-28 11:45:00',
      filedDate: '2024-01-28 12:30:00',
      status: 'Approved',
      decision: 'Approved',
      claimAmount: '₦3,200,000',
      approvedAmount: '₦3,200,000',
      policyNumber: 'NIC-2024-12345',
      surveyor: 'Emeka Obi',
      priority: 'High',
      daysOpen: 32,
      settlementStatus: 'Payment In Progress',
      evidenceAvailable: true,
      evidenceTypes: ['Seal Breach Log', 'Timestamp Data', 'GPS Location'],
    },
  ];

  // Calculate stats
  const stats = {
    total: claims.length,
    reported: claims.filter(c => c.status === 'Reported').length,
    underInvestigation: claims.filter(c => c.status === 'Under Investigation').length,
    approved: claims.filter(c => c.status === 'Approved').length,
    rejected: claims.filter(c => c.status === 'Decision Issued' && c.decision === 'Rejected').length,
    totalClaimAmount: claims.reduce((sum, c) => sum + parseFloat(c.claimAmount.replace(/[₦,]/g, '')), 0),
  };

  // Filter claims
  const filteredClaims = claims.filter(claim => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'reported') return claim.status === 'Reported';
    if (filterStatus === 'under_investigation') return claim.status === 'Under Investigation';
    if (filterStatus === 'approved') return claim.status === 'Approved';
    if (filterStatus === 'decision_issued') return claim.status === 'Decision Issued';
    return true;
  });

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Reported':
        return 'bg-blue-100 text-blue-800';
      case 'Acknowledged':
        return 'bg-indigo-100 text-indigo-800';
      case 'Under Investigation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Surveyor Appointed':
        return 'bg-purple-100 text-purple-800';
      case 'Decision Issued':
        return 'bg-gray-100 text-gray-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Claims Management</h1>
        <p className="text-gray-600 mt-1">Process and review insurance claims with automated evidence</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Claims</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Reported</p>
          <p className="text-2xl font-bold text-blue-600">{stats.reported}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Investigating</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.underInvestigation}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Amount</p>
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
            onClick={() => setFilterStatus('reported')}
            className={`px-4 py-2 rounded-lg ${
              filterStatus === 'reported'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Reported
          </button>
          <button
            onClick={() => setFilterStatus('under_investigation')}
            className={`px-4 py-2 rounded-lg ${
              filterStatus === 'under_investigation'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Under Investigation
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
            onClick={() => setFilterStatus('decision_issued')}
            className={`px-4 py-2 rounded-lg ${
              filterStatus === 'decision_issued'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Decision Issued
          </button>
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {filteredClaims.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-500">No claims found</p>
          </div>
        ) : (
          filteredClaims.map((claim) => (
            <div key={claim.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">{claim.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(claim.priority)}`}>
                      {claim.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Container: {claim.containerNumber} | Shipper: {claim.shipper}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{claim.claimAmount}</p>
                  {claim.approvedAmount && (
                    <p className="text-sm text-green-600 mt-1">Approved: {claim.approvedAmount}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{claim.daysOpen} days open</p>
                </div>
              </div>

              {/* Claim Details */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Incident Type</p>
                  <p className="text-sm font-medium text-gray-900">{claim.incidentType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Incident Date</p>
                  <p className="text-sm font-medium text-gray-900">{claim.incidentDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Filed Date</p>
                  <p className="text-sm font-medium text-gray-900">{claim.filedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Policy Number</p>
                  <p className="text-sm font-medium text-gray-900">{claim.policyNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Surveyor</p>
                  <p className="text-sm font-medium text-gray-900">{claim.surveyor || 'Not Assigned'}</p>
                </div>
              </div>

              {/* Evidence Badge */}
              {claim.evidenceAvailable && (
                <div className="bg-green-50 p-3 rounded mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium text-green-900">Automated Evidence Available</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {claim.evidenceTypes.map((type, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white text-green-800 rounded text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Settlement Status */}
              {claim.settlementStatus && (
                <div className="bg-blue-50 p-3 rounded mb-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">Settlement Status:</span> {claim.settlementStatus}
                  </p>
                </div>
              )}

              {/* Rejection Reason */}
              {claim.rejectionReason && (
                <div className="bg-red-50 p-3 rounded mb-4">
                  <p className="text-sm text-red-900">
                    <span className="font-medium">Rejection Reason:</span> {claim.rejectionReason}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-2">
                  {claim.status === 'Reported' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                      Acknowledge Claim
                    </button>
                  )}
                  {claim.status === 'Acknowledged' && (
                    <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm">
                      Assign Surveyor
                    </button>
                  )}
                  {claim.status === 'Under Investigation' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                      Issue Decision
                    </button>
                  )}
                </div>
                <button
                  onClick={() => navigate(`/insurance/claims/${claim.id}`)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded hover:opacity-90 transition-opacity text-sm"
                >
                  Review Claim & Evidence
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InsuranceClaimsPage;
