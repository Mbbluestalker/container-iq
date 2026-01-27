import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useSignupMutation,
  useCreateProfileMutation,
  useCreateOrganizationMutation
} from '../services/api';
import { setCredentials } from '../store/authSlice';
import { useAlert } from '../context/AlertContext';
import SignupStep1 from '../components/auth/SignupStep1';
import SignupStep2 from '../components/auth/SignupStep2';
import SignupStep3 from '../components/auth/SignupStep3';
import logo from '../assets/CIQ Logo 1.png';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState({});
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useAlert();

  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [createProfile, { isLoading: isProfileLoading }] = useCreateProfileMutation();
  const [createOrganization, { isLoading: isOrganizationLoading }] = useCreateOrganizationMutation();

  // Step 1: Initial Signup
  const handleStep1Next = async (data) => {
    try {
      const response = await signup(data).unwrap();

      // Store token and credentials immediately after signup
      if (response.data?.token) {
        dispatch(setCredentials({
          token: response.data.token,
          user: {
            id: response.data.id,
            email: response.data.email,
            userType: response.data.userType,
            onboardingCompleted: false, // User still needs to complete steps 2 & 3
          }
        }));
      }

      showSuccess('Account created successfully!');
      setSignupData(data);
      setCurrentStep(2);
    } catch (error) {
      showError(error?.data?.message || 'Signup failed. Please try again.');
    }
  };

  // Step 2: Primary Contact Person
  const handleStep2Next = async (data) => {
    try {
      const response = await createProfile(data).unwrap();

      showSuccess('Profile created successfully!');
      setProfileData(data);
      setCurrentStep(3);
    } catch (error) {
      showError(error?.data?.message || 'Failed to create profile. Please try again.');
    }
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  // Step 3: Organization Identity
  const handleStep3Submit = async (data) => {
    try {
      await createOrganization(data).unwrap();

      showSuccess('Registration completed successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      showError(error?.data?.message || 'Failed to create organization. Please try again.');
    }
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-[#0d2847] to-secondary relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start px-16 text-white">
          <img src={logo} alt="ContainerIQ Logo" className="h-16 mb-8" />
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Smart Container<br />Telematics Platform
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-md">
            Track, monitor, and optimize your container logistics with real-time insights and analytics.
          </p>

          {/* Feature highlights */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Real-Time Tracking</h3>
                <p className="text-white/80 text-sm">Monitor your containers 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure & Compliant</h3>
                <p className="text-white/80 text-sm">NIIRA compliant platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Advanced Analytics</h3>
                <p className="text-white/80 text-sm">Data-driven decision making</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 overflow-y-auto bg-gray-50">
        <div className="min-h-full flex items-center justify-center p-8">
        <div className="w-full max-w-xl">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src={logo} alt="ContainerIQ Logo" className="h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary">Welcome to ContainerIQ</h2>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              {[
                { num: 1, label: 'Account Setup' },
                { num: 2, label: 'Contact Info' },
                { num: 3, label: 'Company Details' }
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
                    <p className={`text-xs mt-2 font-medium whitespace-nowrap ${
                      currentStep >= step.num ? 'text-secondary' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </p>
                  </div>
                  {idx < 2 && (
                    <div className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                      currentStep > step.num ? 'bg-secondary' : 'bg-gray-300'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {currentStep === 1 && (
              <SignupStep1
                onNext={handleStep1Next}
                initialData={signupData}
                isLoading={isSignupLoading}
              />
            )}

            {currentStep === 2 && (
              <SignupStep2
                onNext={handleStep2Next}
                onBack={handleStep2Back}
                initialData={profileData}
                isLoading={isProfileLoading}
              />
            )}

            {currentStep === 3 && (
              <SignupStep3
                onSubmit={handleStep3Submit}
                onBack={handleStep3Back}
                initialData={{}}
                isLoading={isOrganizationLoading}
              />
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-secondary font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
