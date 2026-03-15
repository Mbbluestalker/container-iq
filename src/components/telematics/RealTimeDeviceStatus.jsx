import React, { useState, useEffect } from 'react';

const RealTimeDeviceStatus = ({ shipmentData }) => {
  const [deviceData, setDeviceData] = useState({
    batteryLevel: shipmentData?.batteryLevel || 0,
    sealStatus: shipmentData?.sealStatus || 'Unknown',
    gpsStatus: shipmentData?.gpsStatus || 'Inactive',
    signalStrength: 85,
    temperature: 24,
    humidity: 60,
    lastPing: 'Just now'
  });

  const [realTimeUpdates, setRealTimeUpdates] = useState([]);

  // Simulate real-time device data updates
  useEffect(() => {
    if (!shipmentData || shipmentData.status !== 'In Transit') return;

    const interval = setInterval(() => {
      // Simulate battery drain
      setDeviceData(prev => {
        const newBattery = Math.max(0, prev.batteryLevel - Math.random() * 0.5);
        const newTemp = 20 + Math.random() * 10;
        const newHumidity = 50 + Math.random() * 20;

        // Generate update event
        if (Math.random() > 0.7) {
          const events = [
            'GPS coordinates updated',
            'Seal integrity verified',
            'Device heartbeat received',
            'Battery status checked',
            'Temperature reading logged'
          ];
          const newUpdate = {
            id: Date.now(),
            message: events[Math.floor(Math.random() * events.length)],
            time: new Date().toLocaleTimeString(),
            type: 'info'
          };

          setRealTimeUpdates(prev => [newUpdate, ...prev].slice(0, 10));
        }

        return {
          ...prev,
          batteryLevel: newBattery,
          temperature: newTemp,
          humidity: newHumidity,
          lastPing: 'Just now'
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [shipmentData]);

  if (!shipmentData) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <p className="text-gray-500 text-center">No device data available</p>
      </div>
    );
  }

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-green-600 bg-green-50 border-green-200';
    if (level > 30) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getBatteryIcon = (level) => {
    if (level > 60) return 'M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z';
    if (level > 30) return 'M13 10V3L4 14h7v7l9-11h-7z';
    return 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z';
  };

  return (
    <div className="space-y-6">
      {/* Real-Time Device Metrics */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Real-Time Device Status</h3>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">Live • {deviceData.lastPing}</span>
          </div>
        </div>

        {/* Device Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Battery Level */}
          <div className={`p-4 rounded-lg border ${getBatteryColor(deviceData.batteryLevel)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Battery Level</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d={getBatteryIcon(deviceData.batteryLevel)} />
              </svg>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{deviceData.batteryLevel.toFixed(0)}%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  deviceData.batteryLevel > 60
                    ? 'bg-green-600'
                    : deviceData.batteryLevel > 30
                    ? 'bg-orange-600'
                    : 'bg-red-600'
                }`}
                style={{ width: `${deviceData.batteryLevel}%` }}
              ></div>
            </div>
            {deviceData.batteryLevel < 40 && (
              <p className="text-xs mt-2 font-medium">
                {deviceData.batteryLevel < 20 ? '⚠️ Critical - Charge required' : '⚠️ Low battery warning'}
              </p>
            )}
          </div>

          {/* GPS Status */}
          <div className="p-4 rounded-lg border bg-green-50 border-green-200 text-green-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">GPS Status</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{deviceData.gpsStatus}</span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <div className="flex gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-1 rounded-sm ${i < 3 ? 'bg-green-600' : 'bg-gray-300'}`} style={{ height: `${(i + 1) * 4}px` }}></div>
                ))}
              </div>
              <span className="text-xs font-medium ml-1">Signal: {deviceData.signalStrength}%</span>
            </div>
          </div>

          {/* Container Seal */}
          <div className={`p-4 rounded-lg border ${
            deviceData.sealStatus === 'Intact'
              ? 'bg-green-50 border-green-200 text-green-600'
              : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Container Seal</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold">{deviceData.sealStatus}</span>
            </div>
            <p className="text-xs mt-2 font-medium">
              {deviceData.sealStatus === 'Intact' ? '✓ No tampering detected' : '⚠️ Seal breach alert'}
            </p>
          </div>

          {/* Temperature */}
          <div className="p-4 rounded-lg border bg-blue-50 border-blue-200 text-blue-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Temperature</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{deviceData.temperature.toFixed(1)}°C</span>
            </div>
            <p className="text-xs mt-2 font-medium">Humidity: {deviceData.humidity.toFixed(0)}%</p>
          </div>
        </div>

        {/* Device Info Footer */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-gray-500 mb-1">Device ID</p>
              <p className="font-semibold text-gray-900">{shipmentData.deviceId || 'DEV-2024-003'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Firmware</p>
              <p className="font-semibold text-gray-900">v2.4.1</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Network</p>
              <p className="font-semibold text-gray-900">4G LTE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Activity Feed */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Live Activity Feed</h3>

        {realTimeUpdates.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-sm text-gray-500">Waiting for device updates...</p>
            <p className="text-xs text-gray-400 mt-1">Real-time events will appear here</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {realTimeUpdates.map(update => (
              <div key={update.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{update.message}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* WebSocket Connection Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-blue-900 font-medium">WebSocket Connected</span>
          <span className="text-blue-600">• Real-time updates active</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeDeviceStatus;
