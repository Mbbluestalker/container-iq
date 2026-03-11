import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';

const ScorecardsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUserType, setFilterUserType] = useState('all');
  const [filterScoreRange, setFilterScoreRange] = useState('all');

  // Demo scorecard data (to be replaced with API)
  const [scorecards] = useState([
    {
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
      scheduleDelays: 3,
      complianceViolations: 1,
      lastUpdated: '2024-03-11 14:23:00',
      trend: 'up',
    },
    {
      id: 'SC-002',
      organizationName: 'Swift Haulage Services',
      userType: 'Fleet Operator',
      overallScore: 78,
      tier: 'Gold',
      deviceCareScore: 75,
      scheduleAdherenceScore: 82,
      complianceScore: 77,
      totalTrips: 64,
      deviceDamageIncidents: 1,
      lowBatteryIncidents: 5,
      scheduleDelays: 8,
      complianceViolations: 3,
      lastUpdated: '2024-03-11 13:45:00',
      trend: 'stable',
    },
    {
      id: 'SC-003',
      organizationName: 'Apapa Port Terminal',
      userType: 'Terminal Operator',
      overallScore: 88,
      tier: 'Gold',
      deviceCareScore: 90,
      scheduleAdherenceScore: 85,
      complianceScore: 89,
      totalTrips: 234,
      deviceDamageIncidents: 1,
      lowBatteryIncidents: 3,
      scheduleDelays: 12,
      complianceViolations: 2,
      lastUpdated: '2024-03-11 14:00:00',
      trend: 'up',
    },
    {
      id: 'SC-004',
      organizationName: 'Tin Can Island Terminal',
      userType: 'Terminal Operator',
      overallScore: 65,
      tier: 'Silver',
      deviceCareScore: 68,
      scheduleAdherenceScore: 60,
      complianceScore: 67,
      totalTrips: 156,
      deviceDamageIncidents: 3,
      lowBatteryIncidents: 8,
      scheduleDelays: 25,
      complianceViolations: 5,
      lastUpdated: '2024-03-11 12:30:00',
      trend: 'down',
    },
    {
      id: 'SC-005',
      organizationName: 'Maersk Line Nigeria',
      userType: 'Shipping Company',
      overallScore: 85,
      tier: 'Gold',
      deviceCareScore: 88,
      scheduleAdherenceScore: 83,
      complianceScore: 84,
      totalTrips: 412,
      deviceDamageIncidents: 2,
      lowBatteryIncidents: 4,
      scheduleDelays: 18,
      complianceViolations: 3,
      lastUpdated: '2024-03-11 15:00:00',
      trend: 'stable',
    },
    {
      id: 'SC-006',
      organizationName: 'ABC Logistics',
      userType: 'Fleet Operator',
      overallScore: 52,
      tier: 'Bronze',
      deviceCareScore: 48,
      scheduleAdherenceScore: 55,
      complianceScore: 53,
      totalTrips: 45,
      deviceDamageIncidents: 5,
      lowBatteryIncidents: 12,
      scheduleDelays: 18,
      complianceViolations: 8,
      lastUpdated: '2024-03-11 11:00:00',
      trend: 'down',
    },
  ]);

  const filteredScorecards = scorecards.filter((scorecard) => {
    const matchesSearch =
      scorecard.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scorecard.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scorecard.userType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUserType = filterUserType === 'all' || scorecard.userType === filterUserType;

    const matchesScoreRange =
      filterScoreRange === 'all' ||
      (filterScoreRange === 'platinum' && scorecard.overallScore >= 90) ||
      (filterScoreRange === 'gold' && scorecard.overallScore >= 75 && scorecard.overallScore < 90) ||
      (filterScoreRange === 'silver' && scorecard.overallScore >= 60 && scorecard.overallScore < 75) ||
      (filterScoreRange === 'bronze' && scorecard.overallScore < 60);

    return matchesSearch && matchesUserType && matchesScoreRange;
  });

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

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
        </svg>
      );
    }
    if (trend === 'down') {
      return (
        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    );
  };

  const stats = [
    {
      label: 'Total Organizations',
      value: scorecards.length,
      icon: '👥',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      label: 'Platinum Tier',
      value: scorecards.filter((s) => s.tier === 'Platinum').length,
      icon: '💎',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      label: 'Gold Tier',
      value: scorecards.filter((s) => s.tier === 'Gold').length,
      icon: '🥇',
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
    {
      label: 'Avg Overall Score',
      value: Math.round(scorecards.reduce((sum, s) => sum + s.overallScore, 0) / scorecards.length),
      icon: '📊',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">3-Pillar Scorecard System</h1>
          <p className="text-sm text-gray-600 mt-1">
            Monitor performance across Device Care, Schedule Adherence, and Compliance
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/scorecards/leaderboard')}
          className="px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          View Leaderboard
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`border-2 rounded-xl p-6 ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl opacity-50">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search organizations, IDs..."
            />
          </div>
          <div>
            <select
              value={filterUserType}
              onChange={(e) => setFilterUserType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All User Types</option>
              <option value="Fleet Operator">Fleet Operators</option>
              <option value="Terminal Operator">Terminal Operators</option>
              <option value="Shipping Company">Shipping Companies</option>
            </select>
          </div>
          <div>
            <select
              value={filterScoreRange}
              onChange={(e) => setFilterScoreRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="all">All Tiers</option>
              <option value="platinum">Platinum (≥90)</option>
              <option value="gold">Gold (75-89)</option>
              <option value="silver">Silver (60-74)</option>
              <option value="bronze">Bronze (&lt;60)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scorecards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScorecards.map((scorecard) => (
          <div
            key={scorecard.id}
            onClick={() => navigate(`/admin/scorecards/${scorecard.id}`)}
            className="bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-secondary hover:shadow-lg transition-all cursor-pointer p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{scorecard.organizationName}</h3>
                <p className="text-xs text-gray-500">{scorecard.id} • {scorecard.userType}</p>
              </div>
              {getTrendIcon(scorecard.trend)}
            </div>

            {/* Overall Score */}
            <div className="mb-4">
              <div className="flex items-end gap-2 mb-1">
                <p className={`text-4xl font-bold ${getScoreColor(scorecard.overallScore)}`}>
                  {scorecard.overallScore}
                </p>
                <p className="text-sm text-gray-500 mb-1">/ 100</p>
              </div>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border-2 ${getTierBadgeColor(scorecard.tier)}`}>
                {scorecard.tier} Tier
              </span>
            </div>

            {/* 3 Pillar Scores */}
            <div className="space-y-2 mb-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">🔧 Device Care</span>
                  <span className="font-semibold">{scorecard.deviceCareScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${scorecard.deviceCareScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">⏰ Schedule Adherence</span>
                  <span className="font-semibold">{scorecard.scheduleAdherenceScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${scorecard.scheduleAdherenceScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">✅ Compliance</span>
                  <span className="font-semibold">{scorecard.complianceScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${scorecard.complianceScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Total Trips</p>
                <p className="text-lg font-bold text-gray-900">{scorecard.totalTrips}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Violations</p>
                <p className="text-lg font-bold text-red-600">{scorecard.complianceViolations}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
              Last updated: {new Date(scorecard.lastUpdated).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {filteredScorecards.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <p className="text-gray-500 font-medium">No scorecards found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default ScorecardsPage;
