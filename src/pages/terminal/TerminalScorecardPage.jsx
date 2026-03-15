import React from 'react';

const TerminalScorecardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Terminal Performance Scorecard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Apapa Port Terminal - Performance Metrics
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 font-medium">Terminal Scorecard Page</p>
        <p className="text-sm text-gray-400 mt-2">Similar to Shipping Scorecard - showing terminal's 3-pillar performance</p>
      </div>
    </div>
  );
};

export default TerminalScorecardPage;
