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

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // URL del ícono rojo
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje del ícono
  popupAnchor: [1, -34], // Posición del popup
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // Sombra del ícono
  shadowSize: [41, 41], // Tamaño de la sombra
});


function LocationMarker({ onMapClick }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      if (onMapClick) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
        onMapClick(lat, lng); // Llama al callback con lat y lng
        console.log(lat, lng)
      }
    },
  });

  return position ? (
    <Marker position={position} icon={customIcon}/>
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
        <LocationMarker onMapClick={onMapClick} />
        <Marker position={posicion} ></Marker>
        </MapContainer>
    </div>
  );
}

export default Mapa;
