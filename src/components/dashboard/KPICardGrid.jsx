import React from 'react';
import KPICard from './KPICard';

const ShipIcon = ({ color }) => (
  <svg className={`w-5 h-5 ${color}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.32-.42-.58-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.46.26-.58.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
  </svg>
);

const kpiData = [
  {
    title: 'Total Vessels',
    value: 30456,
    change: 25,
    changeType: 'positive',
    iconColor: 'bg-icon-purple/10 text-icon-purple',
    icon: <ShipIcon color="text-icon-purple" />,
  },
  {
    title: 'Active & Safe',
    value: 27511,
    change: 26,
    changeType: 'positive',
    iconColor: 'bg-status-success/10 text-status-success',
    icon: <ShipIcon color="text-status-success" />,
  },
  {
    title: 'Watchlist',
    value: 2899,
    change: -18,
    changeType: 'negative',
    iconColor: 'bg-status-warning/10 text-status-warning',
    icon: <ShipIcon color="text-status-warning" />,
  },
  {
    title: 'Critical',
    value: 46,
    change: -81,
    changeType: 'negative',
    iconColor: 'bg-status-danger/10 text-status-danger',
    icon: <ShipIcon color="text-status-danger" />,
  },
];

const KPICardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
};

export default KPICardGrid;
