import React from 'react';
import KPICardGrid from '../components/dashboard/KPICardGrid';
import MapView from '../components/dashboard/MapView';

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-5">
      <KPICardGrid />
      <MapView />
    </div>
  );
};

export default DashboardPage;
