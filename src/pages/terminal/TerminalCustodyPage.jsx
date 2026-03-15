import React from 'react';
import { useNavigate } from 'react-router-dom';

const TerminalCustodyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Terminal Device Custody</h1>
          <p className="text-sm text-gray-600 mt-1">
            GPS e-Lock devices currently in terminal custody
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 font-medium">Terminal Custody Page</p>
        <p className="text-sm text-gray-400 mt-2">Similar functionality to Shipping Custody - tracking devices at the terminal</p>
      </div>
    </div>
  );
};

export default TerminalCustodyPage;
