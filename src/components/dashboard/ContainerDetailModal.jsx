import React from 'react';
import RiskScoreCircle from './RiskScoreCircle';

const ContainerDetailModal = ({ container, onClose }) => {
  if (!container) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent z-[9999]"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-full max-w-2xl">
        <div className="bg-white rounded-2xl p-6 shadow-2xl mx-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Section - Company Info */}
            <div>
              {/* Company Avatar */}
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-semibold text-gray-600">
                  {container.company?.charAt(0) || 'J'}
                </span>
              </div>

              {/* Company Name */}
              <h2 className="text-lg font-bold text-black mb-6">
                {container.company || 'Jim Vessels & Co.'}
              </h2>

              {/* Container Details */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-start">
                  <span className="text-sm font-semibold text-black w-32">IMO:</span>
                  <span className="text-sm text-text-medium">{container.imo || '1234567'}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-semibold text-black w-32">Official Num:</span>
                  <span className="text-sm text-text-medium">{container.officialNum || '5NAB8'}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-semibold text-black w-32">MMSI:</span>
                  <span className="text-sm text-text-medium">{container.mmsi || '235123456'}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-sm font-semibold text-black w-32">Port of Registry:</span>
                  <span className="text-sm text-text-medium">
                    {container.portOfRegistry || 'Limassol, Panama City, Lagos.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section - Risk Score */}
            <div className="flex items-center justify-center">
              <RiskScoreCircle score={container.riskScore || 85} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerDetailModal;
