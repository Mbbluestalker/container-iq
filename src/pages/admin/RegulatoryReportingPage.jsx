import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegulatoryReportingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('npa');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Mock data for demonstration
  const [npaReports] = useState([
    { id: 'NPA-001', type: 'Container Movement', period: 'March 2026', status: 'Submitted', date: '2026-03-10' },
    { id: 'NPA-002', type: 'Dwell Time Report', period: 'March 2026', status: 'Draft', date: '2026-03-15' },
    { id: 'NPA-003', type: 'Terminal Activity', period: 'February 2026', status: 'Approved', date: '2026-02-28' },
  ]);

  const [nimasaReports] = useState([
    { id: 'NIM-001', type: 'Vessel Manifest', period: 'March 2026', status: 'Submitted', date: '2026-03-12' },
    { id: 'NIM-002', type: 'Cargo Safety Report', period: 'March 2026', status: 'Draft', date: '2026-03-14' },
  ]);

  const [frscReports] = useState([
    { id: 'FRSC-001', type: 'Driver Compliance', period: 'March 2026', status: 'Submitted', date: '2026-03-08' },
    { id: 'FRSC-002', type: 'Vehicle Roadworthiness', period: 'March 2026', status: 'Approved', date: '2026-03-05' },
    { id: 'FRSC-003', type: 'Fleet Inspection', period: 'February 2026', status: 'Approved', date: '2026-02-25' },
  ]);

  const [ncsReports] = useState([
    { id: 'NCS-001', type: 'PAAR Validation', period: 'March 2026', status: 'Submitted', date: '2026-03-11' },
    { id: 'NCS-002', type: 'Export Declaration', period: 'March 2026', status: 'Draft', date: '2026-03-13' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderReportsList = (reports, regulatorName) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent {regulatorName} Reports</h3>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
          Generate New Report
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Report ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Report Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Period</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Submission Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{report.id}</td>
                <td className="px-4 py-3 text-gray-700">{report.type}</td>
                <td className="px-4 py-3 text-gray-700">{report.period}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{report.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-primary hover:text-primary/80 font-medium text-sm">View</button>
                    <button className="text-secondary hover:text-secondary/80 font-medium text-sm">Download</button>
                    {report.status === 'Draft' && (
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm">Submit</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Regulatory Reporting</h1>
          <p className="text-sm text-gray-600 mt-1">
            Generate and submit compliance reports to NPA, NIMASA, FRSC, and NCS
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all">
            Export All Reports
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">NPA Reports</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{npaReports.length}</p>
          <p className="text-xs text-gray-500 mt-1">Nigerian Ports Authority</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">NIMASA Reports</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{nimasaReports.length}</p>
          <p className="text-xs text-gray-500 mt-1">Maritime Administration</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">FRSC Reports</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{frscReports.length}</p>
          <p className="text-xs text-gray-500 mt-1">Road Safety Corps</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">NCS Reports</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">{ncsReports.length}</p>
          <p className="text-xs text-gray-500 mt-1">Nigeria Customs Service</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('npa')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'npa'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              NPA Reports
            </button>
            <button
              onClick={() => setActiveTab('nimasa')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'nimasa'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              NIMASA Reports
            </button>
            <button
              onClick={() => setActiveTab('frsc')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'frsc'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              FRSC Reports
            </button>
            <button
              onClick={() => setActiveTab('ncs')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'ncs'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              NCS Reports
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* NPA Reports Tab */}
          {activeTab === 'npa' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Nigerian Ports Authority (NPA) Reporting</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Submit container movement reports, terminal activity logs, and dwell time analytics to NPA for port operations compliance.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">Required Reports</div>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Container Movement Logs</li>
                      <li>• Terminal Activity Reports</li>
                      <li>• Dwell Time Analytics</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">Submission Frequency</div>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Daily: Container movements</li>
                      <li>• Weekly: Terminal activities</li>
                      <li>• Monthly: Comprehensive reports</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">Data Sources</div>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Gate-in/Gate-out records</li>
                      <li>• GPS e-Lock data</li>
                      <li>• Yard management system</li>
                    </ul>
                  </div>
                </div>
              </div>

              {renderReportsList(npaReports, 'NPA')}

              {/* Report Generation Form */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Generate New NPA Report</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                        <option value="">Select report type...</option>
                        <option value="container_movement">Container Movement Report</option>
                        <option value="terminal_activity">Terminal Activity Report</option>
                        <option value="dwell_time">Dwell Time Analytics</option>
                        <option value="gate_operations">Gate Operations Summary</option>
                        <option value="compliance">Compliance Status Report</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                        <option value="">Select period...</option>
                        <option value="daily">Today</option>
                        <option value="weekly">This Week</option>
                        <option value="monthly">This Month</option>
                        <option value="custom">Custom Date Range</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Port/Terminal</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary">
                      <option value="">All Ports/Terminals</option>
                      <option value="apapa">Lagos Port Complex (Apapa)</option>
                      <option value="tincan">Tin Can Island Port</option>
                      <option value="lekki">Lekki Deep Seaport</option>
                      <option value="onne">Onne Port</option>
                      <option value="pharcourt">Port Harcourt</option>
                      <option value="calabar">Calabar Port</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-semibold transition-all"
                    >
                      Generate Report
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-all"
                    >
                      Save as Draft
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* NIMASA Reports Tab */}
          {activeTab === 'nimasa' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">
                  Nigerian Maritime Administration & Safety Agency (NIMASA)
                </h3>
                <p className="text-sm text-green-800 mb-3">
                  Report vessel manifests, cargo safety compliance, maritime security incidents, and shipping company activities to NIMASA.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-green-900 mb-1">Required Reports</div>
                    <ul className="space-y-1 text-green-800">
                      <li>• Vessel Manifest Reports</li>
                      <li>• Cargo Safety Compliance</li>
                      <li>• Container Handover Logs</li>
                      <li>• Maritime Security Incidents</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-green-900 mb-1">Submission Frequency</div>
                    <ul className="space-y-1 text-green-800">
                      <li>• Per Vessel: Manifests</li>
                      <li>• Monthly: Safety reports</li>
                      <li>• Immediate: Security incidents</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-green-900 mb-1">Data Sources</div>
                    <ul className="space-y-1 text-green-800">
                      <li>• Shipping company manifests</li>
                      <li>• Container custody chain</li>
                      <li>• GPS e-Lock security data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {renderReportsList(nimasaReports, 'NIMASA')}
            </div>
          )}

          {/* FRSC Reports Tab */}
          {activeTab === 'frsc' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">Federal Road Safety Corps (FRSC)</h3>
                <p className="text-sm text-yellow-800 mb-3">
                  Submit driver verification reports, vehicle roadworthiness certificates, fleet inspection logs, and road safety compliance data to FRSC.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-yellow-900 mb-1">Required Reports</div>
                    <ul className="space-y-1 text-yellow-800">
                      <li>• Driver Verification Status</li>
                      <li>• Vehicle Roadworthiness</li>
                      <li>• Fleet Inspection Logs</li>
                      <li>• Road Incident Reports</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-900 mb-1">Submission Frequency</div>
                    <ul className="space-y-1 text-yellow-800">
                      <li>• Quarterly: Driver compliance</li>
                      <li>• Semi-Annual: Vehicle inspections</li>
                      <li>• Immediate: Road incidents</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-900 mb-1">Data Sources</div>
                    <ul className="space-y-1 text-yellow-800">
                      <li>• Driver registration forms</li>
                      <li>• Vehicle compliance records</li>
                      <li>• Telematics incident data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {renderReportsList(frscReports, 'FRSC')}
            </div>
          )}

          {/* NCS Reports Tab */}
          {activeTab === 'ncs' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Nigeria Customs Service (NCS)</h3>
                <p className="text-sm text-purple-800 mb-3">
                  Submit PAAR validation reports, export declarations, import clearance logs, and customs compliance data to NCS.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-purple-900 mb-1">Required Reports</div>
                    <ul className="space-y-1 text-purple-800">
                      <li>• PAAR Validation Reports</li>
                      <li>• Export Declaration Logs</li>
                      <li>• Import Clearance Status</li>
                      <li>• NXP Form Submissions</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-900 mb-1">Submission Frequency</div>
                    <ul className="space-y-1 text-purple-800">
                      <li>• Per Shipment: PAAR/NXP</li>
                      <li>• Daily: Export/Import logs</li>
                      <li>• Monthly: Compliance summary</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-900 mb-1">Data Sources</div>
                    <ul className="space-y-1 text-purple-800">
                      <li>• Shipper consignment forms</li>
                      <li>• Customs documentation</li>
                      <li>• Container tracking data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {renderReportsList(ncsReports, 'NCS')}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Automated Compliance Reporting</h3>
        <p className="text-sm text-white/90 mb-4">
          ContainerIQ automatically generates and submits regulatory reports based on your operational data. Configure automated submissions to reduce manual work.
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 font-medium transition-all">
            Configure Auto-Reporting
          </button>
          <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 font-medium transition-all border border-white/30">
            View Submission Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegulatoryReportingPage;
