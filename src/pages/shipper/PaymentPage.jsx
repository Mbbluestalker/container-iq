import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useAlert();

  // Get payment data from location state
  const { shipmentData, premium, insurerName } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);

  // Bank Transfer form
  const [bankTransferData, setBankTransferData] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
  });

  // Card Payment form
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Wallet form
  const [walletData, setWalletData] = useState({
    walletProvider: '',
    phoneNumber: '',
  });

  // USSD form
  const [ussdData, setUssdData] = useState({
    bank: '',
    code: '',
  });

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      showError('Please select a payment method');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      showSuccess('Payment successful! Your insurance certificate is being generated...');

      // Navigate to success page
      setTimeout(() => {
        navigate('/shipper/payment/success', {
          state: {
            shipmentData,
            premium,
            insurerName,
            paymentMethod,
            receiptNumber: 'RCP-' + Date.now(),
          }
        });
      }, 1500);
    }, 3000);
  };

  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Transfer to our designated bank account',
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: '💳',
      description: 'Pay securely with your card',
    },
    {
      id: 'wallet',
      name: 'Mobile Wallet',
      icon: '📱',
      description: 'Pay with mobile wallet (Paystack, Flutterwave)',
    },
    {
      id: 'ussd',
      name: 'USSD',
      icon: '📞',
      description: 'Pay using USSD banking code',
    },
  ];

  const nigerianBanks = [
    'Access Bank', 'Zenith Bank', 'GTBank', 'First Bank', 'UBA',
    'Fidelity Bank', 'Union Bank', 'Sterling Bank', 'Stanbic IBTC',
    'Ecobank', 'Keystone Bank', 'FCMB', 'Polaris Bank', 'Wema Bank',
  ];

  const walletProviders = [
    { id: 'paystack', name: 'Paystack', code: '*901*' },
    { id: 'flutterwave', name: 'Flutterwave', code: '*894*' },
    { id: 'opay', name: 'OPay', code: '*955*' },
    { id: 'kuda', name: 'Kuda', code: '*5573*' },
  ];

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'bank_transfer':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Bank Account Details</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>Bank Name:</strong> Zenith Bank Plc</p>
                <p><strong>Account Name:</strong> ContainerIQ Limited</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>Amount:</strong> ₦{premium?.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Bank Name <span className="text-red-600">*</span>
                </label>
                <select
                  value={bankTransferData.bankName}
                  onChange={(e) => setBankTransferData(prev => ({ ...prev, bankName: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select your bank</option>
                  {nigerianBanks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Account Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={bankTransferData.accountNumber}
                  onChange={(e) => setBankTransferData(prev => ({ ...prev, accountNumber: e.target.value }))}
                  required
                  maxLength="10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Enter 10-digit account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Account Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={bankTransferData.accountName}
                  onChange={(e) => setBankTransferData(prev => ({ ...prev, accountName: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your account name"
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> After making the transfer, please upload proof of payment or provide transaction reference.
              </p>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Card Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={cardData.cardNumber}
                onChange={(e) => setCardData(prev => ({ ...prev, cardNumber: e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim() }))}
                required
                maxLength="19"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Cardholder Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={cardData.cardName}
                onChange={(e) => setCardData(prev => ({ ...prev, cardName: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Name on card"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Expiry Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={cardData.expiryDate}
                  onChange={(e) => setCardData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  required
                  maxLength="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  CVV <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                  required
                  maxLength="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="123"
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-green-800">Your payment is secured with 256-bit SSL encryption</p>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Wallet Provider <span className="text-red-600">*</span>
              </label>
              <select
                value={walletData.walletProvider}
                onChange={(e) => setWalletData(prev => ({ ...prev, walletProvider: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
              >
                <option value="">Choose wallet</option>
                {walletProviders.map(provider => (
                  <option key={provider.id} value={provider.id}>{provider.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                value={walletData.phoneNumber}
                onChange={(e) => setWalletData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="+234 800 000 0000"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                After clicking "Pay Now", you'll receive a payment prompt on your phone to authorize the transaction.
              </p>
            </div>
          </div>
        );

      case 'ussd':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Your Bank <span className="text-red-600">*</span>
              </label>
              <select
                value={ussdData.bank}
                onChange={(e) => setUssdData(prev => ({ ...prev, bank: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent"
              >
                <option value="">Choose bank</option>
                {nigerianBanks.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>

            {ussdData.bank && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Dial this USSD code:</h3>
                <div className="text-center py-4">
                  <p className="text-3xl font-bold text-blue-900">*737*50*{Math.floor(premium)}#</p>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>Amount:</strong> ₦{premium?.toLocaleString()}</p>
                  <p><strong>Instructions:</strong></p>
                  <ol className="list-decimal list-inside ml-2 space-y-1">
                    <li>Dial the code on your phone</li>
                    <li>Follow the prompts on your screen</li>
                    <li>Enter your PIN when requested</li>
                    <li>Wait for transaction confirmation</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!shipmentData || !premium) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 font-medium">No payment data found</p>
          <button
            onClick={() => navigate('/shipper/shipments/new')}
            className="mt-4 px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-all"
          >
            Create New Shipment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
          <p className="text-sm text-gray-600 mt-1">
            Complete your insurance payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        paymentMethod === method.id
                          ? 'border-secondary bg-secondary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{method.icon}</div>
                      <p className="font-semibold text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details Form */}
              {paymentMethod && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h2>
                  {renderPaymentForm()}
                </div>
              )}

              {/* Submit Button */}
              {paymentMethod && (
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 font-semibold transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    `Pay ₦${premium?.toLocaleString()}`
                  )}
                </button>
              )}
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Insurance Provider</p>
                  <p className="font-semibold text-gray-900">{insurerName}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cargo Value</span>
                    <span className="font-medium">₦{shipmentData?.cargoValue?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Premium Rate</span>
                    <span className="font-medium">0.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Premium</span>
                    <span className="font-medium">₦{premium?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-bold text-2xl text-secondary">₦{premium?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> Your insurance certificate will be issued immediately after successful payment confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
