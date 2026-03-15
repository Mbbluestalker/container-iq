import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EvidenceVaultPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const [eventLogs] = useState([
    {
      id: 'EVT-001',
      timestamp: '2026-03-15 14:32:15',
      eventType: 'Tamper Detection',
      severity: 'Critical',
      container: 'CONT-123',
      device: 'DEV-003',
      location: 'En Route - Lagos-Ibadan Expressway',
      description: 'Unauthorized seal breach detected',
      evidenceCount: 3,
      immutable: true
    },
    {
      id: 'EVT-002',
      timestamp: '2026-03-15 12:18:42',
      eventType: 'Door Open',
      severity: 'High',
      container: 'CONT-456',
      device: 'DEV-005',
      location: 'Apapa Port - Gate 3',
      description: 'Container door opened outside authorized zone',
      evidenceCount: 2,
      immutable: true
    },
    {
      id: 'EVT-003',
      timestamp: '2026-03-15 09:45:30',
      eventType: 'Route Deviation',
      severity: 'Medium',
      container: 'CONT-789',
      device: 'DEV-007',
      location: 'Deviation at Sagamu Interchange',
      description: 'Vehicle deviated from approved route by 5km',
      evidenceCount: 1,
      immutable: true
    },
    {
      id: 'EVT-004',
      timestamp: '2026-03-14 16:22:11',
      eventType: 'Battery Low',
      severity: 'Medium',
      container: 'CONT-890',
      device: 'DEV-009',
      location: 'Tin Can Island Terminal',
      description: 'Device battery dropped to 18%',
      evidenceCount: 1,
      immutable: true
    },
  ]);

  const [documents] = useState([
    {
      id: 'DOC-001',
      name: 'Bill of Lading - CONT-123.pdf',
      type: 'PDF',
      category: 'Shipping Documents',
      uploadedBy: 'Shipper ABC Ltd',
      uploadDate: '2026-03-10',
      size: '2.4 MB',
      container: 'CONT-123',
      hash: 'sha256:a3f5c8...'
    },
    {
      id: 'DOC-002',
      name: 'Insurance Certificate - CONT-456.pdf',
      type: 'PDF',
      category: 'Insurance',
      uploadedBy: 'Insurance Co XYZ',
      uploadDate: '2026-03-12',
      size: '1.8 MB',
      container: 'CONT-456',
      hash: 'sha256:b7d9e2...'
    },
    {
      id: 'DOC-003',
      name: 'Customs Declaration - CONT-789.pdf',
      type: 'PDF',
      category: 'Customs',
      uploadedBy: 'Shipper DEF Ltd',
      uploadDate: '2026-03-11',
      size: '3.1 MB',
      container: 'CONT-789',
      hash: 'sha256:c4e8f1...'
    },
  ]);

  const [mediaEvidence] = useState([
    {
      id: 'MED-001',
      type: 'Photo',
      filename: 'seal_breach_evidence_1.jpg',
      event: 'EVT-001',
      container: 'CONT-123',
      capturedAt: '2026-03-15 14:32:18',
      capturedBy: 'GPS e-Lock DEV-003',
      size: '4.2 MB',
      hash: 'sha256:d9f3a7...'
    },
    {
      id: 'MED-002',
      type: 'Photo',
      filename: 'seal_breach_evidence_2.jpg',
      event: 'EVT-001',
      container: 'CONT-123',
      capturedAt: '2026-03-15 14:32:20',
      capturedBy: 'GPS e-Lock DEV-003',
      size: '3.8 MB',
      hash: 'sha256:e2a6b4...'
    },
    {
      id: 'MED-003',
      type: 'Video',
      filename: 'door_open_recording.mp4',
      event: 'EVT-002',
      container: 'CONT-456',
      capturedAt: '2026-03-15 12:18:45',
      capturedBy: 'GPS e-Lock DEV-005',
      size: '12.5 MB',
      hash: 'sha256:f8c1d9...'
    },
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'photo':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evidence Vault</h1>
          <p className="text-sm text-gray-600 mt-1">
            Immutable logs, documents, and media evidence for claims & compliance
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all">
            Export Evidence
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
            Upload Evidence
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Immutable Events</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{eventLogs.length}</p>
          <p className="text-xs text-gray-500 mt-1">Tamper-proof logs</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Documents</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{documents.length}</p>
          <p className="text-xs text-gray-500 mt-1">Stored securely</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Media Files</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">{mediaEvidence.length}</p>
          <p className="text-xs text-gray-500 mt-1">Photos & videos</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Storage</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">32.6 GB</p>
          <p className="text-xs text-gray-500 mt-1">Used of 500 GB</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by container, device, event ID, or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Evidence Types</option>
            <option value="events">Event Logs Only</option>
            <option value="documents">Documents Only</option>
            <option value="media">Media Only</option>
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'events'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Immutable Event Logs
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'documents'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'media'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Photo & Video Evidence
            </button>
            <button
              onClick={() => setActiveTab('blockchain')}
              className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'blockchain'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Blockchain Verification
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Immutable Event Logs Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Immutable Event Logs - Tamper-Proof Evidence
                </h3>
                <p className="text-sm text-blue-800">
                  All events are cryptographically signed and timestamped. Once recorded, they cannot be altered or deleted. Each event includes GPS coordinates, device telemetry, and automatic photo/video capture where available.
                </p>
              </div>

              <div className="space-y-3">
                {eventLogs.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-primary transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-gray-900">{event.id}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(event.severity)}`}>
                            {event.severity}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-300 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Immutable
                          </span>
                        </div>
                        <h4 className="font-semibold text-lg text-gray-900 mb-1">{event.eventType}</h4>
                        <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Timestamp:</span>
                            <span className="font-medium text-gray-900 ml-2">{event.timestamp}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Container:</span>
                            <span className="font-medium text-gray-900 ml-2">{event.container}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Device:</span>
                            <span className="font-medium text-gray-900 ml-2">{event.device}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium text-gray-900 ml-2">{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{event.evidenceCount}</div>
                        <div className="text-xs text-gray-600">Evidence Files</div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-all">
                        View Evidence
                      </button>
                      <button className="flex-1 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-medium transition-all">
                        Download Package
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all">
                        Verify Hash
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Secure Document Storage</h3>
                <p className="text-sm text-green-800">
                  All documents are encrypted at rest and in transit. Each file is hashed using SHA-256 for integrity verification. Supports PDFs, images, spreadsheets, and other common formats.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{doc.name}</h4>
                        <p className="text-xs text-gray-600">{doc.category}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Container:</span>
                        <span className="font-medium text-gray-900">{doc.container}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uploaded:</span>
                        <span className="font-medium text-gray-900">{doc.uploadDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium text-gray-900">{doc.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">By:</span>
                        <span className="font-medium text-gray-900 truncate">{doc.uploadedBy}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-2 mb-3">
                      <p className="text-xs text-gray-600 mb-1">Document Hash:</p>
                      <p className="text-xs font-mono text-gray-900 truncate">{doc.hash}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium transition-all">
                        View
                      </button>
                      <button className="flex-1 px-3 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 text-sm font-medium transition-all">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo & Video Evidence Tab */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Photo & Video Evidence</h3>
                <p className="text-sm text-purple-800">
                  Automatic photo and video capture from GPS e-Lock devices during security events. All media is timestamped, geotagged, and cryptographically verified.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaEvidence.map((media) => (
                  <div key={media.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                      {getFileIcon(media.type)}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          media.type === 'Photo' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {media.type}
                        </span>
                        <span className="text-xs text-gray-600">#{media.id}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 truncate">{media.filename}</h4>
                      <div className="space-y-1 text-xs mb-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Event:</span>
                          <span className="font-medium text-gray-900">{media.event}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Container:</span>
                          <span className="font-medium text-gray-900">{media.container}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Captured:</span>
                          <span className="font-medium text-gray-900">{media.capturedAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium text-gray-900">{media.size}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded p-2 mb-3">
                        <p className="text-xs text-gray-600 mb-1">Media Hash:</p>
                        <p className="text-xs font-mono text-gray-900 truncate">{media.hash}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium transition-all">
                          View
                        </button>
                        <button className="flex-1 px-3 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 text-sm font-medium transition-all">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blockchain Verification Tab */}
          {activeTab === 'blockchain' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Blockchain-Verified Evidence
                </h3>
                <p className="text-sm text-white/90">
                  All evidence in the vault is anchored to a blockchain for immutable proof of existence and integrity. Verify any evidence independently using its cryptographic hash.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Verify Evidence Integrity</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Evidence ID or Hash</label>
                    <input
                      type="text"
                      placeholder="e.g., EVT-001 or sha256:a3f5c8..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 font-semibold transition-all"
                  >
                    Verify on Blockchain
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-lg border-2 border-green-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-900 text-lg mb-2">Verification Example</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Evidence ID:</span>
                        <span className="font-medium text-gray-900">EVT-001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Blockchain:</span>
                        <span className="font-medium text-gray-900">Ethereum Mainnet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Block Number:</span>
                        <span className="font-medium text-gray-900">18,234,567</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction Hash:</span>
                        <span className="font-mono text-xs text-gray-900">0x7a3f9c...</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium text-green-600">✓ Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-gray-600 mt-1">Evidence Verified</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600 mt-1">Integrity Failures</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600 mt-1">Blockchain Monitoring</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvidenceVaultPage;
