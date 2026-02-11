import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireOnboarding = false }) => {
  const { token, user } = useSelector((state) => state.auth);

  // Not authenticated - redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if onboarding is completed based on user type
  const isOnboardingComplete = (user) => {
    if (!user) return false;

    // Check if basic signup is complete (step 1-3)
    if (user.formCompleted < 3) {
      return false;
    }

    // Check role-specific onboarding completion
    switch (user.userType) {
      case 'insurance_company':
        return user.insuranceFormCompleted === 4;
      case 'shipper':
        return user.shipperFormCompleted === 4;
      case 'fleet_operator':
        return user.fleetFormCompleted === 3;
      // Add other user types when their onboarding is ready
      default:
        return true; // For user types without specific onboarding yet
    }
  };

  // Authenticated but onboarding not completed - redirect to onboarding
  if (requireOnboarding && user && !isOnboardingComplete(user)) {
    // Redirect to role-specific onboarding
    const onboardingRoutes = {
      insurance_company: '/onboarding/insurance',
      shipper: '/onboarding/shipper',
      fleet_operator: '/onboarding/fleet',
      shipping_company: '/onboarding/shipping',
      terminal_operator: '/onboarding/terminal',
    };

    const onboardingRoute = onboardingRoutes[user.userType] || '/onboarding/insurance';
    return <Navigate to={onboardingRoute} replace />;
  }

  // All checks passed - render the protected content
  return children;
};

export default ProtectedRoute;
