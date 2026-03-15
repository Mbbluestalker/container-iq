import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceLifecyclePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assignment');

  // Mock data for demonstration
  const [devices] = useState([
    { id: 'DEV-001', battery: 85, status: 'Available', container: null, location: 'Apapa Port' },
    { id: 'DEV-002', battery: 42, status: 'Available', container: null, location: 'Tin Can Island' },
    { id: 'DEV-003', battery: 18, status: 'In Transit', container: 'CONT-123', location: 'En Route' },
    { id: 'DEV-004', battery: 95, status: 'Available', container: null, location: 'Lekki Deep Seaport' },
    { id: 'DEV-005', battery: 8, status: 'In Transit', container: 'CONT-456', location: 'En Route' },
  ]);

  const [pendingAssignments] = useState([
    { id: 'CONS-001', shipper: 'ABC Importers', container: 'CONT-789', route: 'Apapa → Ikeja', status: 'Awaiting Device' },
    { id: 'CONS-002', shipper: 'XYZ Logistics', container: 'CONT-890', route: 'Tin Can → Onne', status: 'Awaiting Device' },
  ]);

  const [custodyTransfers] = useState([
    { id: 'CT-001', device: 'DEV-003', from: 'Apapa Port', to: 'Fleet Operator A', container: 'CONT-123', time: '2 hours ago', status: 'Pending Check-In' },
    { id: 'CT-002', device: 'DEV-006', from: 'Fleet Operator B', to: 'Tin Can Terminal', container: 'CONT-456', time: '5 hours ago', status: 'Completed' },
  ]);

  const [batteryAlerts] = useState([
    { id: 'BA-001', device: 'DEV-003', battery: 18, level: 'Critical', container: 'CONT-123', custodian: 'Fleet Operator A', action: 'Report immediately' },
    { id: 'BA-002', device: 'DEV-005', battery: 8, level: 'Severe', container: 'CONT-456', custodian: 'Fleet Operator C', action: 'Emergency response required' },
  ]);

  const getBatteryColor = (battery) => {
    if (battery >= 40) return 'text-green-600 bg-green-100';
    if (battery >= 21) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getBatteryIcon = (battery) => {
    if (battery >= 40) return '🟢';
    if (battery >= 21) return '🟡';
    return '🔴';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Device Lifecycle Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Complete GPS e-Lock lifecycle control: Assignment, Battery Monitoring, Custody Transfer, Inspection
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Available Devices</p>
          <p className="text-3xl font-bold text-green-600 mt-1">42</p>
          <p className="text-xs text-gray-500 mt-1">Ready for assignment</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">In Transit</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">28</p>
          <p className="text-xs text-gray-500 mt-1">Currently assigned</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Low Battery</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">5</p>
          <p className="text-xs text-gray-500 mt-1">21-39% charge</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Critical Alerts</p>
          <p className="text-3xl font-bold text-red-600 mt-1">2</p>
          <p className="text-xs text-gray-500 mt-1">≤20% charge</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('assignment')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'assignment'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Device Assignment
            </button>
            <button
              onClick={() => setActiveTab('battery')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'battery'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Battery Monitoring
            </button>
            <button
              onClick={() => setActiveTab('custody')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'custody'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Custody Transfer
            </button>
            <button
              onClick={() => setActiveTab('inspection')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'inspection'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Inspection & Return
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Device Assignment Tab */}
          {activeTab === 'assignment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Assign GPS e-Lock to Container</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
                  Quick Assign
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Assignment Requirements</h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Device must be marked "Available"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Battery level ≥ 40%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Device not flagged for maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Container must have active consignment</span>
                  </li>
                </ul>
              </div>

              {/* Pending Assignments */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Pending Device Assignments</h3>
                <div className="space-y-3">
                  {pendingAssignments.map((assignment) => (
                    <div key={assignment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-gray-900">{assignment.container}</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                              {assignment.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Shipper:</span>
                              <span className="font-medium text-gray-900 ml-2">{assignment.shipper}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Route:</span>
                              <span className="font-medium text-gray-900 ml-2">{assignment.route}</span>
                            </div>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
                          Assign Device
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Devices */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Available Devices (Ready for Assignment)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {devices
                    .filter((d) => d.status === 'Available' && d.battery >= 40)
                    .map((device) => (
                      <div key={device.id} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-gray-900">{device.id}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBatteryColor(device.battery)}`}>
                            {getBatteryIcon(device.battery)} {device.battery}%
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-medium text-green-600">{device.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium text-gray-900">{device.location}</span>
                          </div>
                        </div>
                        <button className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-all">
                          Select
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Battery Monitoring Tab */}
          {activeTab === 'battery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Battery Monitoring & Alerts</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all">
                    Export Report
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
                    Refresh Status
                  </button>
                </div>
              </div>

              {/* Critical Alerts */}
              {batteryAlerts.length > 0 && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Critical Battery Alerts ({batteryAlerts.length})
                  </h3>
                  <div className="space-y-3">
                    {batteryAlerts.map((alert) => (
                      <div key={alert.id} className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900">{alert.device}</span>
                          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-bold">
                            🔴 {alert.battery}% - {alert.level}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-600">Container:</span>
                            <span className="font-medium text-gray-900 ml-2">{alert.container}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Custodian:</span>
                            <span className="font-medium text-gray-900 ml-2">{alert.custodian}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Action:</span>
                            <span className="font-medium text-red-600 ml-2">{alert.action}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-all">
                            Send Alert to Custodian
                          </button>
                          <button className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium transition-all">
                            Initiate Device Swap
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Battery Rules */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Battery Governance Rules</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">🟢</span>
                      <span className="font-semibold text-blue-900">≥ 40%</span>
                    </div>
                    <p className="text-blue-800">Normal operation</p>
                    <p className="text-xs text-blue-600 mt-1">No action required</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">🟡</span>
                      <span className="font-semibold text-yellow-900">21-39%</span>
                    </div>
                    <p className="text-yellow-800">Warning issued</p>
                    <p className="text-xs text-yellow-600 mt-1">Score impact: Neutral</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">🔴</span>
                      <span className="font-semibold text-red-900">≤ 20%</span>
                    </div>
                    <p className="text-red-800">Critical alert</p>
                    <p className="text-xs text-red-600 mt-1">Score penalty applied</p>
                  </div>
                </div>
              </div>

              {/* All Devices Battery Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">All Devices - Battery Status</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Device ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Battery</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Container</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {devices.map((device) => (
                        <tr key={device.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{device.id}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBatteryColor(device.battery)}`}>
                              {getBatteryIcon(device.battery)} {device.battery}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              device.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {device.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{device.container || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">{device.location}</td>
                          <td className="px-4 py-3">
                            <button className="text-primary hover:text-primary/80 font-medium text-sm">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Custody Transfer Tab */}
          {activeTab === 'custody' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Custody Transfer Management</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
                  New Transfer
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Custody Transfer Process</h3>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">1. Check-Out</div>
                    <p className="text-blue-800">Releasing custodian validates device condition & battery ≥ 40%</p>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">2. Transfer Log</div>
                    <p className="text-blue-800">System records timestamp, battery level, and both parties</p>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">3. In Transit</div>
                    <p className="text-blue-800">Receiving custodian notified, SLA timer starts</p>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">4. Check-In</div>
                    <p className="text-blue-800">Receiving custodian confirms receipt & condition</p>
                  </div>
                </div>
              </div>

              {/* Pending Transfers */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Pending Custody Transfers</h3>
                <div className="space-y-3">
                  {custodyTransfers
                    .filter((ct) => ct.status === 'Pending Check-In')
                    .map((transfer) => (
                      <div key={transfer.id} className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-900">{transfer.device}</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                              {transfer.status}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{transfer.time}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-600">From:</span>
                            <span className="font-medium text-gray-900 ml-2">{transfer.from}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">To:</span>
                            <span className="font-medium text-gray-900 ml-2">{transfer.to}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Container:</span>
                            <span className="font-medium text-gray-900 ml-2">{transfer.container}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium transition-all">
                          Send Check-In Reminder
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Transfer History */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Recent Custody Transfers</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Transfer ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Device</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">From</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">To</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Container</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {custodyTransfers.map((transfer) => (
                        <tr key={transfer.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{transfer.id}</td>
                          <td className="px-4 py-3 text-gray-700">{transfer.device}</td>
                          <td className="px-4 py-3 text-gray-700">{transfer.from}</td>
                          <td className="px-4 py-3 text-gray-700">{transfer.to}</td>
                          <td className="px-4 py-3 text-gray-700">{transfer.container}</td>
                          <td className="px-4 py-3 text-gray-600 text-sm">{transfer.time}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              transfer.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {transfer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Inspection & Return Tab */}
          {activeTab === 'inspection' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Device Inspection & Return</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
                  New Inspection
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Post-Trip Inspection Checklist</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">Physical Condition</div>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Check for physical damage or cracks</li>
                      <li>• Inspect tamper seals and evidence</li>
                      <li>• Verify seal integrity</li>
                      <li>• Check antenna condition</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">Functional Assessment</div>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Record battery level at return</li>
                      <li>• Test GPS signal strength</li>
                      <li>• Verify data transmission</li>
                      <li>• Check power button functionality</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Inspection Form */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Device Return Inspection Form</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Device ID</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="e.g., DEV-001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Container Number</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="e.g., CONT-123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Battery Level (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="e.g., 45"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Physical Condition</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                        <option value="">Select...</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="minor_damage">Minor Damage</option>
                        <option value="major_damage">Major Damage</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tamper Evidence</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                        <option value="no">No</option>
                        <option value="yes">Yes - Detected</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seal Integrity</label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="flex items-center gap-2">
                        <input type="radio" name="seal" value="intact" className="w-4 h-4 text-primary" />
                        <span className="text-sm">Intact</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="seal" value="broken" className="w-4 h-4 text-primary" />
                        <span className="text-sm">Broken</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name="seal" value="missing" className="w-4 h-4 text-primary" />
                        <span className="text-sm">Missing</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Device Status After Inspection</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                      <option value="">Select device status...</option>
                      <option value="available">Available - Return to inventory</option>
                      <option value="charging">Charging Required</option>
                      <option value="maintenance">Maintenance Required</option>
                      <option value="damaged">Damaged - Liability Review</option>
                      <option value="lost">Lost - Escalate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Inspection Notes</label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Document any issues, observations, or special conditions..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos (if damage detected)</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-semibold transition-all"
                    >
                      Complete Inspection & Update Status
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceLifecyclePage;
