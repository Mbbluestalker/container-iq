import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { shipmentData, premium, insurerName, paymentMethod, receiptNumber } = location.state || {};

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleDownloadCertificate = () => {
    alert('Insurance certificate download will be available after insurer approval (typically within 24 hours)');
  };

  if (!receiptNumber) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500 font-medium">No payment data found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your shipment request has been submitted and insurance is being processed</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Receipt</h2>
                <p className="text-sm text-gray-600 mt-1">Receipt #{receiptNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Payment Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium capitalize">{paymentMethod?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-medium">₦{premium?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transaction Status</span>
                  <span className="font-medium text-green-600">Successful</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transaction Time</span>
                  <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* Insurance Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Insurance Details</h3>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Insurance Provider</span>
                  <span className="font-medium">{insurerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coverage Type</span>
                  <span className="font-medium">{shipmentData?.insurancePolicyType?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coverage Scope</span>
                  <span className="font-medium capitalize">{shipmentData?.coverageScope?.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coverage Limit</span>
                  <span className="font-medium">₦{shipmentData?.coverageLimit?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Shipment Summary */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Shipment Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cargo Description</span>
                  <span className="font-medium">{shipmentData?.cargoDescription || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cargo Value</span>
                  <span className="font-medium">₦{shipmentData?.cargoValue?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Origin</span>
                  <span className="font-medium">{shipmentData?.originLocation || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Destination</span>
                  <span className="font-medium">{shipmentData?.destinationLocation || 'N/A'}</span>
                </div>
                {shipmentData?.containers && shipmentData.containers.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Containers</span>
                    <span className="font-medium">{shipmentData.containers.length} selected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Your shipment request has been sent to the selected fleet operator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Insurance certificate will be issued within 24 hours after insurer approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>You'll receive email and SMS notifications on shipment status updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>GPS tracking will be activated once the trip begins</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handlePrintReceipt}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>

          <button
            onClick={handleDownloadCertificate}
            className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 font-semibold transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Certificate
          </button>

          <button
            onClick={() => navigate('/shipper/shipments')}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-semibold transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View My Shipments
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
