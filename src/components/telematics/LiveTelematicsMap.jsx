import React, { useState, useEffect } from 'react';

const LiveTelematicsMap = ({ shipmentData }) => {
  const [mapReady, setMapReady] = useState(false);
  const [simulatedPosition, setSimulatedPosition] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos coords

  // Simulate real-time position updates every 10 seconds
  useEffect(() => {
    if (!shipmentData || shipmentData.status !== 'In Transit') return;

    const interval = setInterval(() => {
      // Simulate small position changes (in real app, this would come from WebSocket/API)
      setSimulatedPosition(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.01,
        lng: prev.lng + (Math.random() - 0.5) * 0.01
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [shipmentData]);

  // Simulated route waypoints
  const routePoints = [
    { name: 'Origin: Apapa Port', lat: 6.4391, lng: 3.3903 },
    { name: 'Checkpoint 1: Third Mainland Bridge', lat: 6.4698, lng: 3.3845 },
    { name: 'Checkpoint 2: Ojota', lat: 6.5775, lng: 3.3670 },
    { name: 'Destination: Ikeja Warehouse', lat: 6.6078, lng: 3.3516 }
  ];

  if (!shipmentData) {
    return (
      <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
        <p className="text-gray-500">No shipment selected</p>
      </div>
    );
  }

  if (shipmentData.status !== 'In Transit') {
    return (
      <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <p className="text-gray-600 font-medium">GPS Tracking Not Active</p>
          <p className="text-sm text-gray-500 mt-1">Status: {shipmentData.status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
        {/* Map Placeholder with Route Visualization */}
        <div className="absolute inset-0 p-8">
          <div className="relative h-full w-full">
            {/* SVG Route Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <polyline
                points="15,60 100,55 350,240 500,320"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeDasharray="10,5"
              />
            </svg>

            {/* Route Waypoints */}
            {routePoints.map((point, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2`}
                style={{
                  left: `${15 + index * 30}%`,
                  top: `${20 + index * 20}%`
                }}
              >
                <div className={`relative ${index === 2 ? 'animate-pulse' : ''}`}>
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      index === 0
                        ? 'bg-blue-500 border-blue-600'
                        : index === routePoints.length - 1
                        ? 'bg-green-500 border-green-600'
                        : index === 2
                        ? 'bg-orange-500 border-orange-600 ring-4 ring-orange-200'
                        : 'bg-gray-400 border-gray-500'
                    }`}
                  ></div>
                  {/* Label */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium text-gray-700 border border-gray-200">
                    {point.name}
                  </div>
                </div>
              </div>
            ))}

            {/* Current Position Marker (Animated) */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
              style={{ left: '55%', top: '58%' }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                {/* Pulsing ring */}
                <div className="absolute inset-0 w-8 h-8 bg-red-400 rounded-full animate-ping opacity-75"></div>
                {/* Current Location Label */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-red-500 text-white px-3 py-1 rounded-md shadow-lg text-xs font-bold">
                  LIVE: {shipmentData.currentLocation}
                  <div className="text-[10px] font-normal opacity-90">Updated {shipmentData.lastUpdate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls Overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2 space-y-2">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>

        {/* GPS Signal Indicator */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md px-3 py-2 flex items-center gap-2">
          <div className="flex gap-0.5">
            <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-1 h-4 bg-green-500 rounded-sm"></div>
            <div className="w-1 h-5 bg-green-500 rounded-sm"></div>
            <div className="w-1 h-6 bg-green-500 rounded-sm"></div>
          </div>
          <span className="text-xs font-semibold text-green-600">GPS: Strong</span>
        </div>

        {/* Live Indicator */}
        <div className="absolute bottom-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 flex items-center gap-2 shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-xs font-bold">LIVE</span>
        </div>
      </div>

      {/* Map Footer - Speed, Heading, Coordinates */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">Speed</p>
            <p className="text-sm font-bold text-gray-900">45 km/h</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Heading</p>
            <p className="text-sm font-bold text-gray-900">NE (45°)</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Latitude</p>
            <p className="text-sm font-bold text-gray-900">{simulatedPosition.lat.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Longitude</p>
            <p className="text-sm font-bold text-gray-900">{simulatedPosition.lng.toFixed(4)}</p>
          </div>
        </div>
      </div>

      {/* Integration Note */}
      <div className="bg-blue-50 border-t border-blue-200 px-6 py-2">
        <p className="text-xs text-blue-700 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Production: Google Maps API integration ready • Updates every 30 seconds via WebSocket
        </p>
      </div>
    </div>
  );
};

export default LiveTelematicsMap;
