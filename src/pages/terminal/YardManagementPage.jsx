import React from 'react';

const YardManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yard Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Monitor container placement and dwell time in terminal yard
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 font-medium">Yard Management Page</p>
        <p className="text-sm text-gray-400 mt-2">Track container locations and dwell time in the yard</p>
      </div>
    </div>
  );
};

export default YardManagementPage;
