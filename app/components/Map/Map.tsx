import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapProps {
  latitude: number | null;
  longitude: number | null;
  height: string;
}

// Créer un marqueur personnalisé avec du CSS
const customIcon = L.divIcon({
  className: 'custom-div-icon',
  html: "<div class='marker-pin'></div>",
  iconSize: [30, 42],
  iconAnchor: [15, 42]
});

function MapUpdater({ latitude, longitude }: { latitude: number, longitude: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude], 13);
  }, [latitude, longitude, map]);
  return null;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, height }) => {
  const position: [number, number] = [latitude || 0, longitude || 0];

  return (
    <MapContainer center={position} zoom={13} style={{ height, width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {latitude && longitude && (
        <>
          <Marker position={position} icon={customIcon}>
            <Popup>
              Votre position actuelle
            </Popup>
          </Marker>
          <MapUpdater latitude={latitude} longitude={longitude} />
        </>
      )}
    </MapContainer>
  );
};

export default Map;