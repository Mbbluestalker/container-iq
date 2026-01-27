import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ContainerDetailModal from './ContainerDetailModal';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom container/ship icons for different statuses
const createIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <svg width="24" height="24" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1328_704)">
          <path d="M13.8098 14.5003C12.85 14.5003 11.8903 14.1758 11.0479 13.5888C9.36306 14.7696 7.20874 14.7696 5.52394 13.5888C4.68154 14.1758 3.72176 14.5003 2.76198 14.5003L1.381 14.5003L1.381 15.8813L2.76198 15.8813C3.71486 15.8813 4.65392 15.6396 5.52394 15.1977C7.26397 16.0884 9.30782 16.0884 11.0479 15.1977C11.9179 15.6465 12.8569 15.8813 13.8098 15.8813L15.1908 15.8813L15.1908 14.5003L13.8098 14.5003ZM2.72746 13.1193L2.76198 13.1193C3.86677 13.1193 4.84726 12.5117 5.52394 11.7383C6.20062 12.5117 7.18112 13.1193 8.2859 13.1193C9.39068 13.1193 10.3712 12.5117 11.0479 11.7383C11.7245 12.5117 12.705 13.1193 13.8098 13.1193L13.8443 13.1193L15.1494 8.50683C15.2046 8.32731 15.1908 8.13397 15.1079 7.96825C15.0251 7.80253 14.8732 7.67825 14.6936 7.62301L13.8098 7.333L13.8098 4.14294C13.8098 3.3834 13.1884 2.76196 12.4288 2.76196L10.3574 2.76196L10.3574 0.690491L6.21443 0.690491L6.21443 2.76196L4.14296 2.76196C3.38342 2.76196 2.76198 3.3834 2.76198 4.14294L2.76198 7.333L1.87125 7.62301C1.69172 7.67825 1.53982 7.80253 1.45696 7.96825C1.3741 8.13397 1.35338 8.32731 1.41553 8.50683L2.72746 13.1193ZM4.14296 4.14294L12.4288 4.14294L12.4288 6.88418L8.2859 5.52392L4.14296 6.88418L4.14296 4.14294Z"
                fill="${color}"/>
        </g>
        <defs>
          <clipPath id="clip0_1328_704">
            <rect width="16.5718" height="16.5718" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const activeIcon = createIcon('#38D935');
const warningIcon = createIcon('#EBBE35');
const dangerIcon = createIcon('#EF5050');

// Sample container data across Nigeria
const containers = [
  {
    id: 'CNT001',
    position: [6.4541, 3.3947],
    status: 'active',
    location: 'Apapa Port, Lagos',
    company: 'Jim Vessels & Co.',
    imo: '1234567',
    officialNum: '5NAB8',
    mmsi: '235123456',
    portOfRegistry: 'Limassol, Panama City, Lagos.',
    riskScore: 85
  },
  { id: 'CNT002', position: [6.5244, 3.3792], status: 'warning', location: 'Ikeja, Lagos', company: 'Lagos Logistics Ltd', riskScore: 72 },
  { id: 'CNT003', position: [6.6018, 3.3515], status: 'active', location: 'Ota, Ogun', company: 'Ogun Freight Co.', riskScore: 88 },
  { id: 'CNT004', position: [4.7719, 7.0134], status: 'danger', location: 'Onne Port, Rivers', company: 'Rivers Maritime', riskScore: 45 },
  { id: 'CNT005', position: [5.5099, 5.7550], status: 'active', location: 'Warri, Delta', company: 'Delta Cargo Inc.', riskScore: 91 },
  { id: 'CNT006', position: [4.8156, 7.0498], status: 'active', location: 'Port Harcourt', company: 'PH Shipping Ltd', riskScore: 87 },
  { id: 'CNT007', position: [6.4698, 3.5852], status: 'warning', location: 'Lekki, Lagos', company: 'Lekki Express', riskScore: 68 },
  { id: 'CNT008', position: [9.0765, 7.3986], status: 'active', location: 'Abuja', company: 'Capital Freight', riskScore: 90 },
  { id: 'CNT009', position: [7.3775, 3.9470], status: 'warning', location: 'Ibadan, Oyo', company: 'Oyo Transport Co.', riskScore: 70 },
  { id: 'CNT010', position: [11.8486, 13.1574], status: 'active', location: 'Maiduguri, Borno', company: 'North East Cargo', riskScore: 82 },
  { id: 'CNT011', position: [12.0022, 8.5919], status: 'danger', location: 'Kano', company: 'Kano Haulage', riskScore: 50 },
  { id: 'CNT012', position: [4.9609, 8.3417], status: 'active', location: 'Calabar, Cross River', company: 'Calabar Shipping', riskScore: 86 },
];

// Sample route between ports
const routePositions = [
  [6.4541, 3.3947], // Apapa Port
  [6.5244, 3.3792], // Ikeja
  [6.6018, 3.3515], // Ota
  [4.7719, 7.0134], // Onne Port
];

const ContainerMap = () => {
  const center = [9.0820, 8.6753]; // Center of Nigeria
  const [selectedContainer, setSelectedContainer] = useState(null);

  const getIcon = (status) => {
    switch (status) {
      case 'active':
        return activeIcon;
      case 'warning':
        return warningIcon;
      case 'danger':
        return dangerIcon;
      default:
        return activeIcon;
    }
  };

  const handleMarkerClick = (container) => {
    setSelectedContainer(container);
  };

  const closeModal = () => {
    setSelectedContainer(null);
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '500px', width: '100%', borderRadius: '8px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Route line */}
        <Polyline
          positions={routePositions}
          color="#C4CBFD"
          weight={2}
          opacity={0.7}
        />

        {/* Container markers */}
        {containers.map((container) => (
          <Marker
            key={container.id}
            position={container.position}
            icon={getIcon(container.status)}
            eventHandlers={{
              click: () => handleMarkerClick(container),
            }}
          />
        ))}
      </MapContainer>

      {/* Container Detail Modal */}
      {selectedContainer && (
        <ContainerDetailModal
          container={selectedContainer}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ContainerMap;
