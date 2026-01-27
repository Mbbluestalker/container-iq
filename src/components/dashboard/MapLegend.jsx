import React from 'react';

const legendItems = [
  { label: 'Active', color: 'bg-status-success' },
  { label: 'Warning', color: 'bg-status-warning' },
  { label: 'Danger', color: 'bg-status-danger' },
];

const MapLegend = () => {
  return (
    <div className="absolute bottom-6 right-6 bg-bg-white rounded-lg p-4 shadow-lg">
      <h4 className="text-sm font-semibold text-text-dark mb-3">Guide</h4>
      <div className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="text-sm text-text-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
