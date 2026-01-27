import React from 'react';

const KPICard = ({ title, value, change, changeType, icon, iconColor }) => {
  const isPositive = changeType === 'positive';
  const changeColor = isPositive ? 'text-status-success' : 'text-status-danger';

  return (
    <div className="bg-bg-white rounded-xl p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-text-medium text-xs font-medium">{title}</h3>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-black">{value.toLocaleString()}</span>
          <span className={`text-xs font-medium ${changeColor}`}>
            ({isPositive ? '+' : ''}{change}%)
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-text-medium">7 days Analytics</span>
        <button className="text-text-medium hover:text-text-dark cursor-pointer">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default KPICard;
