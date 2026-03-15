import React, { useState } from 'react';

const ShippingScorecardPage = () => {
  const [timeRange, setTimeRange] = useState('last_30_days');

  // Demo scorecard data for Maersk Line Nigeria
  const scorecardData = {
    organizationName: 'Maersk Line Nigeria',
    period: 'Last 30 Days',
    overallScore: 87.5,
    overallGrade: 'A',

    // Pillar 1: Operational Efficiency
    operationalEfficiency: {
      score: 89,
      grade: 'A',
      metrics: [
        { name: 'Device Handover Timeliness', value: 92, target: 90, unit: '%' },
        { name: 'Device Return Rate', value: 95, target: 95, unit: '%' },
        { name: 'Average Handover Time', value: 8, target: 10, unit: 'mins' },
        { name: 'Container Processing Speed', value: 85, target: 80, unit: 'containers/day' },
      ],
    },

    // Pillar 2: Compliance & Accuracy
    complianceAccuracy: {
      score: 91,
      grade: 'A+',
      metrics: [
        { name: 'Manifest Accuracy', value: 98, target: 95, unit: '%' },
        { name: 'Documentation Completeness', value: 96, target: 95, unit: '%' },
        { name: 'Regulatory Compliance Score', value: 100, target: 100, unit: '%' },
        { name: 'Data Submission Timeliness', value: 94, target: 90, unit: '%' },
      ],
    },

    // Pillar 3: Device Care & Custody
    deviceCare: {
      score: 83,
      grade: 'B+',
      metrics: [
        { name: 'Device Damage Rate', value: 2, target: 3, unit: '%', inverse: true },
        { name: 'Battery Health Maintenance', value: 88, target: 85, unit: '%' },
        { name: 'Device Availability', value: 95, target: 90, unit: '%' },
        { name: 'Custody Chain Integrity', value: 97, target: 95, unit: '%' },
      ],
    },

    // Historical trend
    historicalTrend: [
      { month: 'Nov 2023', score: 82 },
      { month: 'Dec 2023', score: 84 },
      { month: 'Jan 2024', score: 85 },
      { month: 'Feb 2024', score: 86 },
      { month: 'Mar 2024', score: 87.5 },
    ],

    // Recent achievements
    achievements: [
      { title: '30 Days Zero Damage', date: '2024-03-01', icon: '🏆' },
      { title: '100% Compliance Score', date: '2024-02-28', icon: '✅' },
      { title: 'Top Performer - Device Care', date: '2024-02-15', icon: '⭐' },
    ],

    // Areas for improvement
    improvements: [
      { area: 'Device Damage Rate', current: 2, target: 1, priority: 'Medium' },
      { area: 'Battery Health Maintenance', current: 88, target: 95, priority: 'Low' },
    ],
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getMetricStatus = (metric) => {
    if (metric.inverse) {
      return metric.value <= metric.target ? 'success' : 'warning';
    }
    return metric.value >= metric.target ? 'success' : 'warning';
  };

  const getMetricColor = (status) => {
    return status === 'success' ? 'text-green-600' : 'text-yellow-600';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-red-100 text-red-800';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Performance Scorecard</h1>
          <p className="text-sm text-gray-600 mt-1">
            {scorecardData.organizationName} - {scorecardData.period}
          </p>
        </div>
        <div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="last_year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-br from-primary via-primary to-secondary rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium mb-2">Overall Performance Score</p>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-bold">{scorecardData.overallScore}</span>
              <span className="text-3xl font-bold opacity-80">/ 100</span>
            </div>
            <div className="mt-4">
              <span className="inline-flex px-4 py-2 bg-white/20 backdrop-blur rounded-full text-lg font-bold">
                Grade: {scorecardData.overallGrade}
              </span>
            </div>
          </div>
          <div className="text-right">
            <svg className="w-32 h-32 opacity-20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: Operational Efficiency */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Operational Efficiency</h3>
            <span className={`text-2xl font-bold ${getGradeColor(scorecardData.operationalEfficiency.grade)}`}>
              {scorecardData.operationalEfficiency.grade}
            </span>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Score</span>
              <span className="text-lg font-bold text-gray-900">{scorecardData.operationalEfficiency.score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getScoreColor(scorecardData.operationalEfficiency.score)}`}
                style={{ width: `${scorecardData.operationalEfficiency.score}%` }}
              ></div>
            </div>
          </div>
          <div className="space-y-3">
            {scorecardData.operationalEfficiency.metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">{metric.name}</span>
                  <span className={`text-sm font-bold ${getMetricColor(getMetricStatus(metric))}`}>
                    {metric.value}{metric.unit}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Target: {metric.target}{metric.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 2: Compliance & Accuracy */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Compliance & Accuracy</h3>
            <span className={`text-2xl font-bold ${getGradeColor(scorecardData.complianceAccuracy.grade)}`}>
              {scorecardData.complianceAccuracy.grade}
            </span>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Score</span>
              <span className="text-lg font-bold text-gray-900">{scorecardData.complianceAccuracy.score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getScoreColor(scorecardData.complianceAccuracy.score)}`}
                style={{ width: `${scorecardData.complianceAccuracy.score}%` }}
              ></div>
            </div>
          </div>
          <div className="space-y-3">
            {scorecardData.complianceAccuracy.metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">{metric.name}</span>
                  <span className={`text-sm font-bold ${getMetricColor(getMetricStatus(metric))}`}>
                    {metric.value}{metric.unit}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Target: {metric.target}{metric.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 3: Device Care & Custody */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Device Care & Custody</h3>
            <span className={`text-2xl font-bold ${getGradeColor(scorecardData.deviceCare.grade)}`}>
              {scorecardData.deviceCare.grade}
            </span>
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Score</span>
              <span className="text-lg font-bold text-gray-900">{scorecardData.deviceCare.score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getScoreColor(scorecardData.deviceCare.score)}`}
                style={{ width: `${scorecardData.deviceCare.score}%` }}
              ></div>
            </div>
          </div>
          <div className="space-y-3">
            {scorecardData.deviceCare.metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">{metric.name}</span>
                  <span className={`text-sm font-bold ${getMetricColor(getMetricStatus(metric))}`}>
                    {metric.value}{metric.unit}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Target: {metric.target}{metric.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Trend & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Historical Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Performance Trend</h3>
          <div className="space-y-3">
            {scorecardData.historicalTrend.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-600">{item.month}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-8 relative">
                    <div
                      className={`h-8 rounded-full ${getScoreColor(item.score)} flex items-center justify-end pr-3`}
                      style={{ width: `${item.score}%` }}
                    >
                      <span className="text-white text-xs font-bold">{item.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {scorecardData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{achievement.title}</p>
                  <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Areas for Improvement</h4>
            <div className="space-y-2">
              {scorecardData.improvements.map((item, index) => (
                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-900">{item.area}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Current: {item.current} → Target: {item.target}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingScorecardPage;
