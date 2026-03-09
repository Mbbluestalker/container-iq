import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ContainerDetailPage = () => {
  const navigate = useNavigate();
  const { containerId } = useParams();
  const user = useSelector((state) => state.auth.user);

  // Mock container data
  const container = {
    id: containerId || 'MSCU1234567',
    shipmentId: 'SHP-2024-001',
    shipper: {
      name: 'ABC Imports Ltd',
      id: 'SHP-2024-001',
      contact: '+234 803 123 4567',
      email: 'ops@abcimports.ng',
    },
    status: 'In Transit',
    insuranceStatus: 'Active',
    policyNumber: 'NIC-2024-12345',
    policyType: 'All-Risk Cargo Insurance',
    coverageScope: 'Port-to-Warehouse',
    effectiveDate: '2024-02-15',
    expiryDate: '2024-03-15',
    cargoValue: '₦5,500,000',
    sumInsured: '₦5,500,000',
    premium: '₦165,000',
    deductible: '₦50,000',
    route: {
      origin: 'Apapa Port',
      destination: 'Ikeja Warehouse',
      approved: true,
      riskRating: 'Medium',
    },
    cargo: {
      description: 'Electronics - Mobile Phones',
      category: 'High-value cargo',
      weight: '2.5 tonnes',
      packagingType: 'Containerised',
    },
    container: {
      number: 'MSCU1234567',
      size: '40ft',
      type: 'Dry',
      sealNumber: 'SEL-789456',
    },
    // Telematics & Risk Data
    telematicsData: {
      sealStatus: 'Intact',
      lastSealCheck: '2024-03-01 14:30:00',
      batteryLevel: 85,
      lastLocation: {
        coordinates: 'Lat: 6.5244, Long: 3.3792',
        address: 'Along Lagos-Ibadan Expressway',
        timestamp: '2024-03-01 14:30:00',
      },
      gpsStatus: 'Active',
      tamperEvents: [
        {
          id: 1,
          type: 'Vibration Alert',
          severity: 'Low',
          timestamp: '2024-02-15 10:45:00',
          location: 'Apapa Port',
          resolved: true,
        },
      ],
      doorEvents: [
        { id: 1, event: 'Door Opened', timestamp: '2024-02-15 08:00:00', location: 'Apapa Port', authorized: true },
        { id: 2, event: 'Door Closed', timestamp: '2024-02-15 08:15:00', location: 'Apapa Port', authorized: true },
      ],
      dwellTimes: [
        { location: 'Apapa Port Gate', duration: '2 hours 30 minutes', start: '2024-02-15 06:00:00', end: '2024-02-15 08:30:00' },
        { location: 'Rest Stop (Approved)', duration: '30 minutes', start: '2024-02-15 12:00:00', end: '2024-02-15 12:30:00' },
      ],
      routeCompliance: {
        deviation: 'No',
        totalDeviation: '0 km',
        complianceScore: 100,
      },
    },
    // Risk Scoring
    riskScore: {
      overall: 75,
      level: 'Medium',
      breakdown: {
        routeRisk: 70,
        cargoRisk: 80,
        securityRisk: 75,
        complianceRisk: 90,
        historicalRisk: 85,
      },
      factors: [
        { factor: 'High-value cargo', impact: 'Increases risk', score: -10 },
        { factor: 'GPS tracking active', impact: 'Reduces risk', score: +15 },
        { factor: 'No seal breaches', impact: 'Reduces risk', score: +10 },
        { factor: 'Route compliance 100%', impact: 'Reduces risk', score: +5 },
        { factor: 'Verified driver and truck', impact: 'Reduces risk', score: +10 },
      ],
    },
    fleet: {
      operator: 'Premium Logistics Ltd',
      truck: 'FLT-TRK-12345',
      driver: 'Chinedu Okafor',
      driverVerified: true,
      truckType: 'Skeletal',
    },
  };

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/insurance/dashboard')}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Container {container.id}</h1>
            <p className="text-gray-600 mt-1">Shipment: {container.shipmentId} | Shipper: {container.shipper.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Policy Number</p>
            <p className="text-lg font-bold text-gray-900">{container.policyNumber}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {container.insuranceStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Risk Score Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Risk Score Gauge */}
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={container.riskScore.level === 'Low' ? '#10B981' : container.riskScore.level === 'Medium' ? '#F59E0B' : '#EF4444'}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(container.riskScore.overall / 100) * 352} 352`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{container.riskScore.overall}</span>
                <span className="text-xs text-gray-600">/ 100</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{container.riskScore.level} Risk</p>
              <p className="text-sm text-gray-600 mt-1">Dynamic risk score based on real-time data</p>
            </div>
          </div>

          {/* Risk Breakdown */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Risk Breakdown:</p>
            {Object.entries(container.riskScore.breakdown).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-32 capitalize">{key.replace('Risk', '')}:</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-900 w-8">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Risk Factors:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {container.riskScore.factors.map((factor, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className={`${factor.score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {factor.score > 0 ? '↑' : '↓'}
                </span>
                <span className="text-gray-700">{factor.factor}</span>
                <span className={`ml-auto font-medium ${factor.score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {factor.score > 0 ? '+' : ''}{factor.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex gap-4 px-6">
            {['overview', 'telematics', 'policy', 'shipper'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Shipment Details</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm font-medium text-gray-900">{container.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Route</p>
                      <p className="text-sm font-medium text-gray-900">{container.route.origin} → {container.route.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Route Status</p>
                      <p className="text-sm font-medium text-green-600">Approved Route</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Cargo Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm font-medium text-gray-900">{container.cargo.description}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium text-gray-900">{container.cargo.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="text-sm font-medium text-gray-900">{container.cargo.weight}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Financial</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Cargo Value</p>
                      <p className="text-sm font-bold text-gray-900">{container.cargoValue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Premium</p>
                      <p className="text-sm font-medium text-gray-900">{container.premium}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Deductible</p>
                      <p className="text-sm font-medium text-gray-900">{container.deductible}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Fleet Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Fleet Operator</p>
                    <p className="text-sm font-medium text-gray-900">{container.fleet.operator}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Truck</p>
                    <p className="text-sm font-medium text-gray-900">{container.fleet.truck}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Driver</p>
                    <p className="text-sm font-medium text-gray-900">{container.fleet.driver}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Driver Status</p>
                    <p className="text-sm font-medium text-green-600">✓ Verified</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Telematics Tab */}
          {activeTab === 'telematics' && (
            <div className="space-y-6">
              {/* Current Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Live Telematics Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Seal Status</p>
                    <p className="text-lg font-bold text-green-600">{container.telematicsData.sealStatus}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Battery Level</p>
                    <p className="text-lg font-bold text-gray-900">{container.telematicsData.batteryLevel}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">GPS Status</p>
                    <p className="text-lg font-bold text-green-600">{container.telematicsData.gpsStatus}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Update</p>
                    <p className="text-sm font-medium text-gray-900">{container.telematicsData.lastLocation.timestamp}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Current Location</h3>
                <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-2">
                  <p className="text-gray-600">Map Integration - Google Maps API</p>
                </div>
                <p className="text-sm text-gray-900 font-medium">{container.telematicsData.lastLocation.address}</p>
                <p className="text-xs text-gray-600">{container.telematicsData.lastLocation.coordinates}</p>
              </div>

              {/* Route Compliance */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Route Compliance</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600">Deviation</p>
                    <p className="text-lg font-bold text-green-600">{container.telematicsData.routeCompliance.deviation}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600">Total Deviation</p>
                    <p className="text-lg font-bold text-green-600">{container.telematicsData.routeCompliance.totalDeviation}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600">Compliance Score</p>
                    <p className="text-lg font-bold text-green-600">{container.telematicsData.routeCompliance.complianceScore}%</p>
                  </div>
                </div>
              </div>

              {/* Door Events */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Door Events ({container.telematicsData.doorEvents.length})</h3>
                <div className="space-y-2">
                  {container.telematicsData.doorEvents.map((event) => (
                    <div key={event.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{event.event}</p>
                        <p className="text-xs text-gray-600">{event.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">{event.timestamp}</p>
                        <span className={`text-xs ${event.authorized ? 'text-green-600' : 'text-red-600'}`}>
                          {event.authorized ? 'Authorized' : 'Unauthorized'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dwell Times */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Dwell Times</h3>
                <div className="space-y-2">
                  {container.telematicsData.dwellTimes.map((dwell, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{dwell.location}</p>
                        <p className="text-xs text-gray-600">{dwell.start} - {dwell.end}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{dwell.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Policy Tab */}
          {activeTab === 'policy' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Policy Details</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Policy Number</p>
                      <p className="text-sm font-medium text-gray-900">{container.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Policy Type</p>
                      <p className="text-sm font-medium text-gray-900">{container.policyType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Coverage Scope</p>
                      <p className="text-sm font-medium text-gray-900">{container.coverageScope}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Effective Date</p>
                      <p className="text-sm font-medium text-gray-900">{container.effectiveDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Expiry Date</p>
                      <p className="text-sm font-medium text-gray-900">{container.expiryDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Coverage & Premium</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Sum Insured</p>
                      <p className="text-lg font-bold text-gray-900">{container.sumInsured}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Premium</p>
                      <p className="text-lg font-bold text-gray-900">{container.premium}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Deductible</p>
                      <p className="text-sm font-medium text-gray-900">{container.deductible}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-gray-500">Premium Rate</p>
                      <p className="text-sm font-medium text-gray-900">3% of cargo value</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipper Tab */}
          {activeTab === 'shipper' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Shipper Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Company Name</p>
                      <p className="text-sm font-medium text-gray-900">{container.shipper.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Shipper ID</p>
                      <p className="text-sm font-medium text-gray-900">{container.shipper.id}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Contact Number</p>
                      <p className="text-sm font-medium text-gray-900">{container.shipper.contact}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{container.shipper.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Actions</h3>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity">
            Update Policy
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Contact Shipper
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainerDetailPage;
