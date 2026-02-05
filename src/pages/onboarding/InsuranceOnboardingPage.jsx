import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, logout } from '../../store/authSlice';
import { useAlert } from '../../context/AlertContext';
import InsuranceStep1 from '../../components/onboarding/insurance/InsuranceStep1';
import InsuranceStep2 from '../../components/onboarding/insurance/InsuranceStep2';
import InsuranceStep3 from '../../components/onboarding/insurance/InsuranceStep3';
import InsuranceStep4 from '../../components/onboarding/insurance/InsuranceStep4';
import InsuranceStep5 from '../../components/onboarding/insurance/InsuranceStep5';
import logo from '../../assets/CIQ Logo 1.png';

const InsuranceOnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { showSuccess, showError } = useAlert();

  // Step handlers
  const handleStep1Next = (data) => {
    setOnboardingData((prev) => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  const handleStep2Next = (data) => {
    setOnboardingData((prev) => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleStep3Next = (data) => {
    setOnboardingData((prev) => ({ ...prev, step3: data }));
    setCurrentStep(4);
  };

  const handleStep4Next = (data) => {
    setOnboardingData((prev) => ({ ...prev, step4: data }));
    setCurrentStep(5);
  };

  const handleStep5Submit = async (data) => {
    setIsLoading(true);
    const finalData = {
      ...onboardingData,
      step5: data,
    };

    // TODO: Send to backend API when ready
    // try {
    //   const response = await completeInsuranceOnboarding(finalData).unwrap();
    //   dispatch(setCredentials({
    //     token: response.token,
    //     user: { ...response.user, onboardingCompleted: true }
    //   }));
    //   showSuccess('Insurance onboarding completed successfully!');
    //   setTimeout(() => navigate('/dashboard'), 1500);
    // } catch (error) {
    //   showError(error?.data?.message || 'Failed to complete onboarding');
    //   setIsLoading(false);
    //   return;
    // }

    // Mock success - mark onboarding as completed
    setTimeout(() => {
      dispatch(setCredentials({
        token: localStorage.getItem('token'),
        user: { ...user, onboardingCompleted: true }
      }));

      showSuccess('Insurance onboarding completed successfully!');
      setIsLoading(false);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="ContainerIQ Logo" className="h-10" />
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-lg font-bold text-gray-900">Insurance Company Onboarding</h1>
                <p className="text-xs text-gray-600">Complete your profile to access the platform</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            {[
              { num: 1, label: 'License & Classification' },
              { num: 2, label: 'Coverage Geography' },
              { num: 3, label: 'Policy Types' },
              { num: 4, label: 'Claims & Integration' },
              { num: 5, label: 'Documents' },
            ].map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentStep >= step.num
                        ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                        : 'bg-white text-gray-400 border-2 border-gray-300'
                    }`}
                  >
                    {currentStep > step.num ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.num
                    )}
                  </div>
                  <p className={`text-xs mt-2 font-medium text-center whitespace-nowrap ${
                    currentStep >= step.num ? 'text-secondary' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {idx < 4 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > step.num ? 'bg-secondary' : 'bg-gray-300'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {currentStep === 1 && (
              <InsuranceStep1
                onNext={handleStep1Next}
                initialData={onboardingData.step1}
              />
            )}

            {currentStep === 2 && (
              <InsuranceStep2
                onNext={handleStep2Next}
                onBack={handleBack}
                initialData={onboardingData.step2}
              />
            )}

            {currentStep === 3 && (
              <InsuranceStep3
                onNext={handleStep3Next}
                onBack={handleBack}
                initialData={onboardingData.step3}
              />
            )}

            {currentStep === 4 && (
              <InsuranceStep4
                onNext={handleStep4Next}
                onBack={handleBack}
                initialData={onboardingData.step4}
              />
            )}

            {currentStep === 5 && (
              <InsuranceStep5
                onSubmit={handleStep5Submit}
                onBack={handleBack}
                initialData={onboardingData.step5}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-8">
          <p className="text-center text-sm text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:support@containeriq.com" className="text-secondary font-semibold hover:underline">
              support@containeriq.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceOnboardingPage;
