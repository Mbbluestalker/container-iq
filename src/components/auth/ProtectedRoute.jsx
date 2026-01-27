import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireOnboarding = false }) => {
  const { token, user } = useSelector((state) => state.auth);

  // Not authenticated - redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but onboarding not completed - redirect to onboarding
  if (requireOnboarding && user && !user.onboardingCompleted) {
    // Redirect to role-specific onboarding
    const onboardingRoutes = {
      insurance_company: '/onboarding/insurance',
      shipper: '/onboarding/shipper',
      fleet_operator: '/onboarding/fleet',
      shipping_company: '/onboarding/shipping',
      terminal_operator: '/onboarding/terminal',
    };

    const onboardingRoute = onboardingRoutes[user.userType] || '/onboarding';
    return <Navigate to={onboardingRoute} replace />;
  }

  // All checks passed - render the protected content
  return children;
};

export default ProtectedRoute;
