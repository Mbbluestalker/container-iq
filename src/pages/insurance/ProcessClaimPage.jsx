import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProcessClaimPage = () => {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    claimStatus: '',
    claimDecision: '',
    approvedAmount: '',
    paymentStatus: '',
    surveyorName: '',
    notes: '',
    rejectionReason: '',
  });

  // Mock claim data
  const claim = {
    id: claimId || 'CLM-2024-001',
    shipmentId: 'SHP-2024-001',
    containerNumber: 'MSCU1234567',
    shipper: {
      name: 'ABC Imports Ltd',
      email: 'ops@abcimports.ng',
      phone: '+234 803 123 4567',
    },
    incidentType: 'Cargo Theft',
    incidentDate: '2024-02-15 14:25:00',
    incidentLocation: 'Along Lagos-Ibadan Expressway',
    filedDate: '2024-02-15 15:30:00',
    description: 'Container seal was breached and cargo was stolen during transit. GPS signal was lost for 15 minutes at incident location.',
    status: 'Under Investigation',
    claimAmount: '₦5,500,000',
    policyNumber: 'NIC-2024-12345',
    policyType: 'All-Risk Cargo Insurance',
    sumInsured: '₦5,500,000',
    deductible: '₦50,000',
    surveyor: 'John Okafor',
    priority: 'High',
    // Immutable Evidence (Auto-captured by ContainerIQ)
    evidence: {
      gpsData: {
        routeHistory: [
          { timestamp: '2024-02-15 08:00:00', location: 'Apapa Port', event: 'Journey Started' },
          { timestamp: '2024-02-15 12:30:00', location: 'Rest Stop (Approved)', event: 'Authorized Stop' },
          { timestamp: '2024-02-15 14:25:00', location: 'Lat: 6.5244, Long: 3.3792', event: 'GPS Signal Lost' },
          { timestamp: '2024-02-15 14:40:00', location: 'Lat: 6.5244, Long: 3.3792', event: 'GPS Signal Restored' },
        ],
        routeDeviation: 'No deviation detected before incident',
        lastKnownLocation: 'Lat: 6.5244, Long: 3.3792',
      },
      sealData: {
        status: 'Breached',
        breachTime: '2024-02-15 14:25:00',
        breachLocation: 'Lat: 6.5244, Long: 3.3792',
        sealNumber: 'SEL-789456',
        integrityBeforeBreach: '100%',
      },
      doorEvents: [
        { timestamp: '2024-02-15 08:00:00', event: 'Door Opened', location: 'Apapa Port', authorized: true },
        { timestamp: '2024-02-15 08:15:00', event: 'Door Closed', location: 'Apapa Port', authorized: true },
        { timestamp: '2024-02-15 14:25:00', event: 'Unauthorized Door Opening', location: 'Unknown', authorized: false },
      ],
      tamperAlerts: [
        { timestamp: '2024-02-15 14:25:00', type: 'Seal Breach', severity: 'High', location: 'Lat: 6.5244, Long: 3.3792' },
        { timestamp: '2024-02-15 14:26:00', type: 'GPS Signal Lost', severity: 'Critical', location: 'Lat: 6.5244, Long: 3.3792' },
        { timestamp: '2024-02-15 14:27:00', type: 'Battery Tampering Detected', severity: 'High', location: 'Lat: 6.5244, Long: 3.3792' },
      ],
      dwellTimes: [
        { location: 'Apapa Port', duration: '2 hours 30 minutes', reason: 'Loading' },
        { location: 'Rest Stop (Approved)', duration: '30 minutes', reason: 'Driver Break' },
        { location: 'Incident Location', duration: '15 minutes', reason: 'Unauthorized Stop' },
      ],
      environmental: {
        temperature: 'Normal',
        humidity: 'Normal',
        shock: 'High shock detected at 14:25:00',
      },
    },
    // Shipper-provided info
    shipperInfo: {
      witnessPresent: 'No',
      policeReportFiled: 'Yes',
      policeReportNumber: 'LPD-2024-8976',
      additionalNotes: 'Driver reported being stopped by armed men. No injuries reported.',
    },
    timeline: [
      { date: '2024-02-15 15:30:00', action: 'Claim Filed by Shipper', actor: 'ABC Imports Ltd' },
      { date: '2024-02-15 16:00:00', action: 'Claim Acknowledged', actor: 'System' },
      { date: '2024-02-16 09:00:00', action: 'Surveyor Appointed', actor: 'John Okafor' },
      { date: '2024-02-18 14:00:00', action: 'Investigation Started', actor: 'John Okafor' },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Claim update:', formData);
    alert('Claim updated successfully!');
    navigate('/insurance/claims');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/insurance/claims')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          ← Back to Claims
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Review Claim: {claim.id}</h1>
            <p className="text-gray-600 mt-1">Automated evidence and dispute-free assessment</p>
          </div>
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            {claim.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Claim Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Claim Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Incident Type</p>
                <p className="text-sm font-medium text-gray-900">{claim.incidentType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Claim Amount</p>
                <p className="text-lg font-bold text-gray-900">{claim.claimAmount}</p>
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
                <p className="text-xs text-gray-500">Container</p>
                <p className="text-sm font-medium text-gray-900">{claim.containerNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Policy Number</p>
                <p className="text-sm font-medium text-gray-900">{claim.policyNumber}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500 mb-1">Description</p>
              <p className="text-sm text-gray-900">{claim.description}</p>
            </div>
          </div>

          {/* Immutable Evidence - Key Feature */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h2 className="text-lg font-semibold text-green-900">Immutable Event Logs (Auto-Captured Evidence)</h2>
            </div>

            {/* GPS Data */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">GPS Tracking Data</h3>
              <div className="space-y-2">
                {claim.evidence.gpsData.routeHistory.map((entry, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{entry.timestamp}</span>
                    <span className={`font-medium ${entry.event.includes('Lost') ? 'text-red-600' : 'text-gray-900'}`}>
                      {entry.event}
                    </span>
                    <span className="text-gray-600">{entry.location}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-600">Route Deviation: {claim.evidence.gpsData.routeDeviation}</p>
              </div>
            </div>

            {/* Seal Breach Data */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Seal Integrity Data</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium text-red-600">{claim.evidence.sealData.status}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Seal Number</p>
                  <p className="text-sm font-medium text-gray-900">{claim.evidence.sealData.sealNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Breach Time</p>
                  <p className="text-sm font-medium text-red-600">{claim.evidence.sealData.breachTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Breach Location</p>
                  <p className="text-sm font-medium text-gray-900">{claim.evidence.sealData.breachLocation}</p>
                </div>
              </div>
            </div>

            {/* Tamper Alerts */}
            <div className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tamper Alerts ({claim.evidence.tamperAlerts.length})</h3>
              <div className="space-y-2">
                {claim.evidence.tamperAlerts.map((alert, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-red-50 rounded">
                    <div>
                      <p className="text-sm font-medium text-red-900">{alert.type}</p>
                      <p className="text-xs text-red-700">{alert.timestamp}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-200 text-red-900 rounded">
                      {alert.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Door Events */}
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Door Events ({claim.evidence.doorEvents.length})</h3>
              <div className="space-y-2">
                {claim.evidence.doorEvents.map((event, idx) => (
                  <div key={idx} className={`flex justify-between items-center p-2 rounded ${event.authorized ? 'bg-gray-50' : 'bg-red-50'}`}>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <p className="text-xs text-gray-600">{event.timestamp}</p>
                    </div>
                    <span className={`text-xs ${event.authorized ? 'text-green-600' : 'text-red-600'}`}>
                      {event.authorized ? 'Authorized' : 'Unauthorized'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipper-Provided Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Witness Present</p>
                <p className="text-sm font-medium text-gray-900">{claim.shipperInfo.witnessPresent}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Police Report Filed</p>
                <p className="text-sm font-medium text-gray-900">{claim.shipperInfo.policeReportFiled}</p>
              </div>
              {claim.shipperInfo.policeReportNumber && (
                <div>
                  <p className="text-xs text-gray-500">Police Report Number</p>
                  <p className="text-sm font-medium text-gray-900">{claim.shipperInfo.policeReportNumber}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500">Additional Notes</p>
                <p className="text-sm text-gray-900">{claim.shipperInfo.additionalNotes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Right 1 column */}
        <div className="space-y-6">
          {/* Process Claim Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Process Claim</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claim Status
                </label>
                <select
                  name="claimStatus"
                  value={formData.claimStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  <option value="Acknowledged">Acknowledged</option>
                  <option value="Under Investigation">Under Investigation</option>
                  <option value="Surveyor Appointed">Surveyor Appointed</option>
                  <option value="Decision Issued">Decision Issued</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {formData.claimStatus === 'Decision Issued' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Decision
                    </label>
                    <select
                      name="claimDecision"
                      value={formData.claimDecision}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Decision</option>
                      <option value="Approved">Approved</option>
                      <option value="Partially Approved">Partially Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  {(formData.claimDecision === 'Approved' || formData.claimDecision === 'Partially Approved') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approved Settlement Amount (₦)
                      </label>
                      <input
                        type="number"
                        name="approvedAmount"
                        value={formData.approvedAmount}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  )}

                  {formData.claimDecision === 'Rejected' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rejection Reason
                      </label>
                      <textarea
                        name="rejectionReason"
                        value={formData.rejectionReason}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      ></textarea>
                    </div>
                  )}
                </>
              )}

              {formData.claimStatus === 'Surveyor Appointed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surveyor Name
                  </label>
                  <input
                    type="text"
                    name="surveyorName"
                    value={formData.surveyorName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}

              {(formData.claimDecision === 'Approved' || formData.claimDecision === 'Partially Approved') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status
                  </label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Payment Status</option>
                    <option value="Payment Pending">Payment Pending</option>
                    <option value="Payment Authorised">Payment Authorised</option>
                    <option value="Payment In Progress">Payment In Progress</option>
                    <option value="Fully Paid">Fully Paid</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add internal notes..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Update Claim
              </button>
            </form>
          </div>

          {/* Timeline */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Claim Timeline</h2>
            <div className="space-y-4">
              {claim.timeline.map((entry, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                    <p className="text-xs text-gray-600">{entry.actor}</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                Contact Shipper
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm">
                Generate Evidence Report
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm">
                View Container Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessClaimPage;
