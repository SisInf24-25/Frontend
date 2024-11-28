import React from 'react';
import './ElementoCasaExtendida.css'
import { useNavigate } from 'react-router-dom';

const ElementoCasaExtendida = ({ id, imgSrc, title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, lat, long, conditions, description, is_public, is_active, owner_username, reservations, host, fechaIni, fechaFin }) => {
    const navigate = useNavigate(); 
  //MUESTRA: nombre, propietario, precio por noche, max huespedes, ciudad
    
  // Función para manejar el click en el nombre
  const handleCasaClick = () => {
    navigate(`/houses/element?id=${id}`, {
      state: { id, imgSrc, title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, lat, long, conditions, description, is_public, is_active, owner_username, reservations, host, fechaIni, fechaFin }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementocasaext-container' onClick={() => handleCasaClick()}>
      <div className='elementocasaext-content'>
        <div className='elementocasaext-foto'>
          <img src={imgSrc} alt={`Imagen de ${title}`} className='casa-img' />
        </div>
        <div className='elementocasaext-nombre'>
          <h2>{title}</h2>
        </div>
        <div className='elementocasaext-info'>
          <p>Propietario: <b>{owner_username}</b></p>
          <p>Precio por noche: <b>{price}</b></p>
          <p>Huéspedes máximos: <b>{max_guests}</b></p>
          <p>Ciudad: <b>{city}</b></p>
        </div>
      </div>
    </div>
  );
};

export default ElementoCasaExtendida;
