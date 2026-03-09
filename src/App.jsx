

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
import ShipmentRequestsPage from './pages/fleet/ShipmentRequestsPage';
import ModifyShipmentRequestPage from './pages/fleet/ModifyShipmentRequestPage';
import ActiveTripsPage from './pages/fleet/ActiveTripsPage';
import NewShipmentPage from './pages/shipper/NewShipmentPage';
import MyShipmentsPage from './pages/shipper/MyShipmentsPage';
import TrackShipmentsPage from './pages/shipper/TrackShipmentsPage';
import ClaimsPage from './pages/shipper/ClaimsPage';
import FileClaimPage from './pages/shipper/FileClaimPage';
import InsuranceDashboardPage from './pages/insurance/InsuranceDashboardPage';
import ContainerDetailPage from './pages/insurance/ContainerDetailPage';
import InsuranceClaimsPage from './pages/insurance/InsuranceClaimsPage';
import ProcessClaimPage from './pages/insurance/ProcessClaimPage';

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

        {/* Fleet Management Routes - Only for fleet_operator */}
        <Route
          path="/fleet/drivers"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <DriversPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/drivers/new"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <DriverFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/drivers/bulk-upload"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <BulkDriverUploadPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/drivers/:id"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <DriverFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/vehicles"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <VehiclesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/vehicles/new"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <VehicleFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/vehicles/bulk-upload"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <BulkVehicleUploadPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/vehicles/:id"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <VehicleFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/shipment-requests"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <ShipmentRequestsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/shipment-requests/:id/modify"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <ModifyShipmentRequestPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fleet/trips"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['fleet_operator']}>
              <Layout>
                <ActiveTripsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Shipper Routes - Only for shipper */}
        <Route
          path="/shipper/shipments/new"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['shipper']}>
              <Layout>
                <NewShipmentPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipper/shipments"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['shipper']}>
              <Layout>
                <MyShipmentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipper/shipments/track"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['shipper']}>
              <Layout>
                <TrackShipmentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipper/claims"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['shipper']}>
              <Layout>
                <ClaimsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipper/claims/new"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['shipper']}>
              <Layout>
                <FileClaimPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Insurance Company Routes - Only for insurance_company */}
        <Route
          path="/insurance/dashboard"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['insurance_company']}>
              <Layout>
                <InsuranceDashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/insurance/containers/:containerId"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['insurance_company']}>
              <Layout>
                <ContainerDetailPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/insurance/claims"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['insurance_company']}>
              <Layout>
                <InsuranceClaimsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/insurance/claims/:claimId"
          element={
            <ProtectedRoute requireOnboarding={true} allowedUserTypes={['insurance_company']}>
              <Layout>
                <ProcessClaimPage />
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