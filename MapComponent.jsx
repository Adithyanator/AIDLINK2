import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Users, PackageOpen } from 'lucide-react';

// Define custom icons based on priority
const createIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const icons = {
  Critical: createIcon('#EF4444'),
  High: createIcon('#F59E0B'),
  Medium: createIcon('#38BDF8'),
  Low: createIcon('#10B981')
};

export default function MapComponent({ camps }) {
  // Center of Kerala
  const center = [10.8505, 76.2711];

  return (
    <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }} zoomControl={false}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      {camps.map(camp => (
        <Marker 
          key={camp._id} 
          position={[camp.lat, camp.lng]}
          icon={icons[camp.priority] || icons.Low}
        >
          <Popup>
            <div style={{ minWidth: '220px' }}>
              <div className="popup-title">{camp.name}</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', color: 'var(--text-muted)' }}>
                <MapPin size={14} />
                <span style={{ fontSize: '12px' }}>{camp.district}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', color: 'var(--text-muted)' }}>
                <Users size={14} />
                <span style={{ fontSize: '12px' }}>{camp.hostages} people in camp</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0', color: 'var(--text-muted)' }}>
                <Phone size={14} />
                <span style={{ fontSize: '12px' }}>{camp.contactNumber}</span>
              </div>

              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <PackageOpen size={14} /> Needs
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {camp.resourceNeeds && camp.resourceNeeds.length > 0 ? camp.resourceNeeds.map((need, idx) => (
                    <span key={idx} className={`badge badge-${camp.priority?.toLowerCase() || 'low'}`}>
                      {need}
                    </span>
                  )) : <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>None currently</span>}
                </div>
              </div>
              
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
