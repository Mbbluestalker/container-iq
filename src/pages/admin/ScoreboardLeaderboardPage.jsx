import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScoreboardLeaderboardPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [filterUserType, setFilterUserType] = useState('all');

  // Demo leaderboard data (to be replaced with API)
  const [organizations] = useState([
    {
      rank: 1,
      id: 'SC-001',
      organizationName: 'TransLogistics Nigeria Ltd',
      userType: 'Fleet Operator',
      overallScore: 92,
      deviceCareScore: 95,
      scheduleAdherenceScore: 90,
      complianceScore: 91,
      tier: 'Platinum',
      totalTrips: 87,
    },
    {
      rank: 2,
      id: 'SC-003',
      organizationName: 'Apapa Port Terminal',
      userType: 'Terminal Operator',
      overallScore: 88,
      deviceCareScore: 90,
      scheduleAdherenceScore: 85,
      complianceScore: 89,
      tier: 'Gold',
      totalTrips: 234,
    },
    {
      rank: 3,
      id: 'SC-005',
      organizationName: 'Maersk Line Nigeria',
      userType: 'Shipping Company',
      overallScore: 85,
      deviceCareScore: 88,
      scheduleAdherenceScore: 83,
      complianceScore: 84,
      tier: 'Gold',
      totalTrips: 412,
    },
    {
      rank: 4,
      id: 'SC-002',
      organizationName: 'Swift Haulage Services',
      userType: 'Fleet Operator',
      overallScore: 78,
      deviceCareScore: 75,
      scheduleAdherenceScore: 82,
      complianceScore: 77,
      tier: 'Gold',
      totalTrips: 64,
    },
    {
      rank: 5,
      id: 'SC-004',
      organizationName: 'Tin Can Island Terminal',
      userType: 'Terminal Operator',
      overallScore: 65,
      deviceCareScore: 68,
      scheduleAdherenceScore: 60,
      complianceScore: 67,
      tier: 'Silver',
      totalTrips: 156,
    },
    {
      rank: 6,
      id: 'SC-006',
      organizationName: 'ABC Logistics',
      userType: 'Fleet Operator',
      overallScore: 52,
      deviceCareScore: 48,
      scheduleAdherenceScore: 55,
      complianceScore: 53,
      tier: 'Bronze',
      totalTrips: 45,
    },
  ]);

  const getScoreForCategory = (org) => {
    switch (selectedCategory) {
      case 'deviceCare':
        return org.deviceCareScore;
      case 'scheduleAdherence':
        return org.scheduleAdherenceScore;
      case 'compliance':
        return org.complianceScore;
      default:
        return org.overallScore;
    }
  };

  const filteredOrganizations = organizations
    .filter((org) => filterUserType === 'all' || org.userType === filterUserType)
    .sort((a, b) => getScoreForCategory(b) - getScoreForCategory(a))
    .map((org, index) => ({ ...org, displayRank: index + 1 }));

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

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return '🥇';
    } else if (rank === 2) {
      return '🥈';
    } else if (rank === 3) {
      return '🥉';
    }
    return null;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-purple-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-gray-600';
    return 'text-orange-600';
  };

  const getCategoryLabel = () => {
    switch (selectedCategory) {
      case 'deviceCare':
        return 'Device Care';
      case 'scheduleAdherence':
        return 'Schedule Adherence';
      case 'compliance':
        return 'Compliance';
      default:
        return 'Overall Score';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
            <h1 className="text-3xl font-bold text-gray-900">Performance Leaderboard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Rankings based on 3-Pillar Scorecard performance
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            >
              <option value="overall">Overall Score</option>
              <option value="deviceCare">Device Care</option>
              <option value="scheduleAdherence">Schedule Adherence</option>
              <option value="compliance">Compliance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
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
        </div>
      </div>

      {/* Top 3 Podium */}
      {filteredOrganizations.length >= 3 && (
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">🏆 Top Performers - {getCategoryLabel()}</h2>
          <div className="grid grid-cols-3 gap-6 items-end">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-6 mb-3">
                <p className="text-4xl mb-2">🥈</p>
                <p className="font-bold text-gray-900 mb-1">{filteredOrganizations[1]?.organizationName}</p>
                <p className="text-xs text-gray-500 mb-3">{filteredOrganizations[1]?.userType}</p>
                <p className={`text-3xl font-bold ${getScoreColor(getScoreForCategory(filteredOrganizations[1]))}`}>
                  {getScoreForCategory(filteredOrganizations[1])}
                </p>
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border-2 mt-2 ${getTierBadgeColor(filteredOrganizations[1]?.tier)}`}>
                  {filteredOrganizations[1]?.tier}
                </span>
              </div>
              <div className="bg-gray-200 h-32 rounded-t-lg flex items-center justify-center">
                <p className="text-2xl font-bold text-gray-700">#2</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6 mb-3">
                <p className="text-4xl mb-2">🥇</p>
                <p className="font-bold text-gray-900 mb-1">{filteredOrganizations[0]?.organizationName}</p>
                <p className="text-xs text-gray-500 mb-3">{filteredOrganizations[0]?.userType}</p>
                <p className={`text-4xl font-bold ${getScoreColor(getScoreForCategory(filteredOrganizations[0]))}`}>
                  {getScoreForCategory(filteredOrganizations[0])}
                </p>
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border-2 mt-2 ${getTierBadgeColor(filteredOrganizations[0]?.tier)}`}>
                  {filteredOrganizations[0]?.tier}
                </span>
              </div>
              <div className="bg-purple-200 h-40 rounded-t-lg flex items-center justify-center">
                <p className="text-2xl font-bold text-purple-700">#1</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6 mb-3">
                <p className="text-4xl mb-2">🥉</p>
                <p className="font-bold text-gray-900 mb-1">{filteredOrganizations[2]?.organizationName}</p>
                <p className="text-xs text-gray-500 mb-3">{filteredOrganizations[2]?.userType}</p>
                <p className={`text-3xl font-bold ${getScoreColor(getScoreForCategory(filteredOrganizations[2]))}`}>
                  {getScoreForCategory(filteredOrganizations[2])}
                </p>
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border-2 mt-2 ${getTierBadgeColor(filteredOrganizations[2]?.tier)}`}>
                  {filteredOrganizations[2]?.tier}
                </span>
              </div>
              <div className="bg-orange-200 h-24 rounded-t-lg flex items-center justify-center">
                <p className="text-2xl font-bold text-orange-700">#3</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Complete Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getCategoryLabel()}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Trips
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrganizations.map((org) => (
                <tr
                  key={org.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/scorecards/${org.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getRankBadge(org.displayRank) && (
                        <span className="text-2xl">{getRankBadge(org.displayRank)}</span>
                      )}
                      <span className="text-lg font-bold text-gray-900">#{org.displayRank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-semibold text-gray-900">{org.organizationName}</p>
                      <p className="text-xs text-gray-500">{org.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{org.userType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-2xl font-bold ${getScoreColor(getScoreForCategory(org))}`}>
                      {getScoreForCategory(org)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getTierBadgeColor(org.tier)}`}>
                      {org.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{org.totalTrips}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/scorecards/${org.id}`);
                      }}
                      className="text-secondary hover:text-secondary/80 font-semibold text-sm"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrganizations.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500 font-medium">No organizations found</p>
          <p className="text-sm text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default ScoreboardLeaderboardPage;
