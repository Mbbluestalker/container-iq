

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import InsuranceOnboardingPage from './pages/onboarding/InsuranceOnboardingPage';
import ShipperOnboardingPage from './pages/onboarding/ShipperOnboardingPage';
import FleetOnboardingPage from './pages/onboarding/FleetOnboardingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DriversPage from './pages/fleet/DriversPage';
import DriverFormPage from './pages/fleet/DriverFormPage';
import VehiclesPage from './pages/fleet/VehiclesPage';
import VehicleFormPage from './pages/fleet/VehicleFormPage';
import BulkDriverUploadPage from './pages/fleet/BulkDriverUploadPage';
import BulkVehicleUploadPage from './pages/fleet/BulkVehicleUploadPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Onboarding Routes */}
        <Route
          path="/onboarding/insurance"
          element={
            <ProtectedRoute>
              <InsuranceOnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/shipper"
          element={
            <ProtectedRoute>
              <ShipperOnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding/fleet"
          element={
            <ProtectedRoute>
              <FleetOnboardingPage />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Fleet Management Routes */}
        <Route
          path="/fleet/drivers"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <DriversPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/drivers/new"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <DriverFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/drivers/bulk-upload"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <BulkDriverUploadPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/drivers/:id"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <DriverFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/vehicles"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <VehiclesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/vehicles/new"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <VehicleFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/vehicles/bulk-upload"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <BulkVehicleUploadPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/vehicles/:id"
          element={
            <ProtectedRoute requireOnboarding={true}>
              <Layout>
                <VehicleFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;