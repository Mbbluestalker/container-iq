import React from 'react';
import MapLegend from './MapLegend';
import ContainerMap from './ContainerMap';

const MapView = () => {
  return (
    <div className="bg-bg-white rounded-xl p-5 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-text-dark">Container Tracking Map</h2>
        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-text-medium focus:outline-none focus:ring-2 focus:ring-primary-teal cursor-pointer">
          <option>All</option>
          <option>Active</option>
          <option>Warning</option>
          <option>Danger</option>
        </select>
      </div>

      {/* Leaflet Map */}
      <div className="relative">
        <ContainerMap />
        <MapLegend />
      </div>
    </div>
  );
};

export default MapView;
