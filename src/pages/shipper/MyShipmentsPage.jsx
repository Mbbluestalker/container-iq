import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyShipmentsPage = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with API call later
  const shipments = [
    {
      id: '1',
      shipmentId: 'SHP-2024-001',
      consignmentReference: 'CNS-2024-001',
      status: 'In Transit',
      containers: [
        { number: 'ABCD1234567', size: '40ft', type: 'Dry' }
      ],
      origin: 'Apapa Port',
      destination: 'Ikeja Warehouse',
      fleetOperator: 'ABC Transport Ltd',
      truckNumber: 'ABC-123-XY',
      driverName: 'John Doe',
      cargoDescription: 'Electronics and FMCG',
      cargoValue: '₦50,000,000',
      insurancePolicy: 'All-risk cargo insurance',
      createdDate: '2024-03-10',
      expectedDelivery: '2024-03-15',
      progress: 65,
    },
    {
      id: '2',
      shipmentId: 'SHP-2024-002',
      consignmentReference: 'CNS-2024-002',
      status: 'Pending Acceptance',
      containers: [
        { number: 'EFGH9876543', size: '20ft', type: 'Reefer' },
        { number: 'IJKL5432109', size: '20ft', type: 'Reefer' }
      ],
      origin: 'Tin Can Island Port',
      destination: 'Ota Industrial Area',
      fleetOperator: 'XYZ Logistics',
      truckNumber: 'Pending',
      driverName: 'Pending',
      cargoDescription: 'Pharmaceutical products',
      cargoValue: '₦75,000,000',
      insurancePolicy: 'Marine cargo (inland transit)',
      createdDate: '2024-03-12',
      expectedDelivery: '2024-03-16',
      progress: 0,
    },
    {
      id: '3',
      shipmentId: 'SHP-2024-003',
      consignmentReference: 'CNS-2024-003',
      status: 'Delivered',
      containers: [
        { number: 'MNOP1357924', size: '40ft', type: 'Dry' }
      ],
      origin: 'Lekki Deep Sea Port',
      destination: 'Ibadan Depot',
      fleetOperator: 'Global Freight Services',
      truckNumber: 'XYZ-456-AB',
      driverName: 'Jane Smith',
      cargoDescription: 'Industrial machinery',
      cargoValue: '₦100,000,000',
      insurancePolicy: 'All-risk cargo insurance',
      createdDate: '2024-03-05',
      expectedDelivery: '2024-03-10',
      deliveredDate: '2024-03-09',
      progress: 100,
    },
  ];

  const filteredShipments = shipments.filter(shipment => {
    if (filterStatus === 'all') return true;
    return shipment.status.toLowerCase().replace(' ', '_') === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(' ', '_')) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending_acceptance':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'incident':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Shipments</h1>
            <p className="text-sm text-gray-600 mt-1">View and manage all your shipments</p>
          </div>
          <button
            onClick={() => navigate('/shipper/shipments/new')}
            className="px-6 py-3 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:from-secondary/90 hover:to-secondary font-semibold transition-all duration-200 shadow-lg cursor-pointer flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Shipment
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 p-6 rounded-xl border border-primary/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Total Shipments</p>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {shipments.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">In Transit</p>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {shipments.filter(s => s.status === 'In Transit').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-6 rounded-xl border border-yellow-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Pending</p>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {shipments.filter(s => s.status === 'Pending Acceptance').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-white to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-600">Delivered</p>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {shipments.filter(s => s.status === 'Delivered').length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md bg-white cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="in_transit">In Transit</option>
            <option value="pending_acceptance">Pending Acceptance</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="incident">Incident</option>
          </select>
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.length > 0 ? (
          filteredShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{shipment.shipmentId}</h3>
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Consignment: {shipment.consignmentReference}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/shipper/shipments/${shipment.id}`)}
                      className="px-4 py-2 text-sm font-semibold text-primary bg-white border border-primary/30 rounded-lg hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      View Details
                    </button>
                    {shipment.status === 'In Transit' && (
                      <button
                        onClick={() => navigate(`/shipper/shipments/track?id=${shipment.id}`)}
                        className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-secondary to-secondary/90 rounded-lg hover:from-secondary/90 hover:to-secondary transition-all cursor-pointer"
                      >
                        Track
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar (for In Transit) */}
                {shipment.status === 'In Transit' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">{shipment.origin}</span>
                      <span className="font-semibold text-secondary">{shipment.progress}%</span>
                      <span className="text-gray-600">{shipment.destination}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-secondary to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${shipment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Containers */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Containers ({shipment.containers.length})
                    </h4>
                    <div className="space-y-2">
                      {shipment.containers.map((container, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-gray-900">{container.number}</div>
                          <div className="text-gray-600">{container.size} • {container.type}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transport */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                      </svg>
                      Transport
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Fleet:</span>
                        <div className="font-medium text-gray-900">{shipment.fleetOperator}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Truck:</span>
                        <div className="font-medium text-gray-900">{shipment.truckNumber}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Driver:</span>
                        <div className="font-medium text-gray-900">{shipment.driverName}</div>
                      </div>
                    </div>
                  </div>

                  {/* Cargo & Insurance */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Cargo:</span>
                        <div className="font-medium text-gray-900">{shipment.cargoDescription}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Value:</span>
                        <div className="font-medium text-gray-900">{shipment.cargoValue}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Insurance:</span>
                        <div className="font-medium text-gray-900">{shipment.insurancePolicy}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Expected Delivery:</span>
                        <div className="font-medium text-gray-900">
                          {new Date(shipment.expectedDelivery).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4 text-sm font-medium text-gray-900">No shipments found</p>
            <p className="mt-1 text-xs text-gray-500">Try adjusting your filter criteria or create a new shipment</p>
            <button
              onClick={() => navigate('/shipper/shipments/new')}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-secondary to-secondary/90 text-white rounded-xl hover:from-secondary/90 hover:to-secondary font-semibold transition-all duration-200 cursor-pointer"
            >
              Create New Shipment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyShipmentsPage;
