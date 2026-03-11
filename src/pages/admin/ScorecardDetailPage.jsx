import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ScorecardDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock scorecard data (to be replaced with API call)
  const [scorecard] = useState({
    id: 'SC-001',
    organizationName: 'TransLogistics Nigeria Ltd',
    userType: 'Fleet Operator',
    overallScore: 92,
    tier: 'Platinum',
    deviceCareScore: 95,
    scheduleAdherenceScore: 90,
    complianceScore: 91,
    totalTrips: 87,
    deviceDamageIncidents: 0,
    lowBatteryIncidents: 2,
    lateReturns: 3,
    scheduleDelays: 3,
    complianceViolations: 1,
    lastUpdated: '2024-03-11 14:23:00',
    trend: 'up',
    insuranceEligibility: 'Eligible',
    premiumDiscount: 15,
    preferredProvider: 'Yes',
  });

  // Score history (last 30 days)
  const [scoreHistory] = useState([
    { date: '2024-02-10', overall: 88, deviceCare: 90, scheduleAdherence: 85, compliance: 89 },
    { date: '2024-02-17', overall: 89, deviceCare: 92, scheduleAdherence: 87, compliance: 88 },
    { date: '2024-02-24', overall: 90, deviceCare: 93, scheduleAdherence: 88, compliance: 89 },
    { date: '2024-03-03', overall: 91, deviceCare: 94, scheduleAdherence: 89, compliance: 90 },
    { date: '2024-03-11', overall: 92, deviceCare: 95, scheduleAdherence: 90, compliance: 91 },
  ]);

  // Recent incidents
  const [recentIncidents] = useState([
    {
      id: 1,
      type: 'Low Battery',
      pillar: 'Device Care',
      date: '2024-03-08',
      description: 'Device DEV-GPS-003 returned with 18% battery',
      impact: '-2 points',
      severity: 'warning',
    },
    {
      id: 2,
      type: 'Schedule Delay',
      pillar: 'Schedule Adherence',
      date: '2024-03-05',
      description: 'Trip CS-2024-0432 delayed by 45 minutes',
      impact: '-1 point',
      severity: 'warning',
    },
    {
      id: 3,
      type: 'Low Battery',
      pillar: 'Device Care',
      date: '2024-03-02',
      description: 'Device DEV-GPS-005 returned with 15% battery',
      impact: '-2 points',
      severity: 'warning',
    },
  ]);

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Silver':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-purple-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-gray-600';
    return 'text-orange-600';
  };

  const getSeverityBadgeColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/scorecards')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{scorecard.organizationName}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {scorecard.id} • {scorecard.userType}
            </p>
          </div>
        </div>
      </div>

      {/* Overall Score Card */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-gray-600 mb-2">Overall Score</p>
            <p className={`text-6xl font-bold ${getScoreColor(scorecard.overallScore)}`}>
              {scorecard.overallScore}
            </p>
            <p className="text-sm text-gray-500 mt-1">out of 100</p>
            <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full border-2 mt-4 ${getTierBadgeColor(scorecard.tier)}`}>
              {scorecard.tier} Tier
            </span>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-medium text-gray-600 mb-4">3-Pillar Breakdown</p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔧</span>
                    <span className="font-semibold text-gray-900">Device Care</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{scorecard.deviceCareScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all"
                    style={{ width: `${scorecard.deviceCareScore}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {scorecard.deviceDamageIncidents} damage incidents, {scorecard.lowBatteryIncidents} low battery returns
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏰</span>
                    <span className="font-semibold text-gray-900">Schedule Adherence</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{scorecard.scheduleAdherenceScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all"
                    style={{ width: `${scorecard.scheduleAdherenceScore}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {scorecard.lateReturns} late returns, {scorecard.scheduleDelays} schedule delays
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <span className="font-semibold text-gray-900">Compliance</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{scorecard.complianceScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-purple-500 h-4 rounded-full transition-all"
                    style={{ width: `${scorecard.complianceScore}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {scorecard.complianceViolations} violations in last 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Insurance Eligibility</p>
          <p className="text-2xl font-bold text-green-600 mt-2">{scorecard.insuranceEligibility}</p>
          <p className="text-sm text-gray-500 mt-1">Premium Discount: {scorecard.premiumDiscount}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Total Trips Completed</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{scorecard.totalTrips}</p>
          <p className="text-sm text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600">Preferred Provider Status</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{scorecard.preferredProvider}</p>
          <p className="text-sm text-gray-500 mt-1">Based on performance</p>
        </div>
      </div>

      {/* Score History Chart */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📈 Score History (Last 30 Days)</h2>
        <div className="space-y-3">
          {scoreHistory.map((entry, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-600">{new Date(entry.date).toLocaleDateString()}</p>
                <p className={`text-2xl font-bold ${getScoreColor(entry.overall)}`}>{entry.overall}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-gray-500">Device Care</p>
                  <p className="font-semibold text-blue-600">{entry.deviceCare}</p>
                </div>
                <div>
                  <p className="text-gray-500">Schedule Adherence</p>
                  <p className="font-semibold text-green-600">{entry.scheduleAdherence}</p>
                </div>
                <div>
                  <p className="text-gray-500">Compliance</p>
                  <p className="font-semibold text-purple-600">{entry.compliance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🚨 Recent Incidents & Deductions</h2>
        <div className="space-y-3">
          {recentIncidents.map((incident) => (
            <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${getSeverityBadgeColor(incident.severity)}`}>
                      {incident.type}
                    </span>
                    <span className="text-xs text-gray-500">{incident.pillar}</span>
                  </div>
                  <p className="text-sm text-gray-900">{incident.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{new Date(incident.date).toLocaleDateString()}</p>
                  <p className="text-sm font-semibold text-red-600">{incident.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scorecard Methodology */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 Scorecard Methodology</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-800">
          <div>
            <p className="font-semibold mb-2">🔧 Device Care (33.3%)</p>
            <ul className="space-y-1 text-xs">
              <li>• Device damage incidents: -10 points each</li>
              <li>• Low battery returns (&lt;20%): -5 points each</li>
              <li>• Missing devices: -15 points each</li>
              <li>• Timely battery charging: +2 points</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">⏰ Schedule Adherence (33.3%)</p>
            <ul className="space-y-1 text-xs">
              <li>• Late returns (&gt;1 hour): -5 points each</li>
              <li>• Early/on-time returns: +2 points</li>
              <li>• Schedule delays: -3 points each</li>
              <li>• Route violations: -7 points each</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">✅ Compliance (33.3%)</p>
            <ul className="space-y-1 text-xs">
              <li>• Parking violations: -5 points each</li>
              <li>• Speed violations: -7 points each</li>
              <li>• Unauthorized stops: -5 points each</li>
              <li>• Document compliance: +3 points</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorecardDetailPage;
