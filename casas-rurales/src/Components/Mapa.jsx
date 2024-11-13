import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Para evitar el problema de los marcadores que no se ven correctamente
delete L.Icon.Default.prototype._getIconUrl; // Evita el error de icono por defecto
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function LocationMarker({ onMapClick }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      if (onMapClick) {
        onMapClick(lat, lng); // Llama al callback con lat y lng
      }
    },
  });

  return position ? (
    <Marker position={position} />
  ) : null;
}

function Mapa({ onMapClick, posicion }) {
  return (
    <div style={{ height: 'auto', width: 'auto' }}>
        <MapContainer center={posicion} zoom={17} style={{ height: "275px", width: "400px" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={posicion}></Marker>
        </MapContainer>
    </div>
  );
}

export default Mapa;
