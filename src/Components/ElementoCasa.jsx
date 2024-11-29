import React from 'react';
import './ElementoCasa.css'
import { useNavigate } from 'react-router-dom';

const ElementoCasa = ({ id, imgSrc, title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, lat, long, conditions, description, is_public, is_active, owner_username, reservations, host, fechaIni, fechaFin }) => {
    const navigate = useNavigate(); 

    
  // Función para manejar el click en el nombre
  const handleCasaClick = () => {
    navigate(`/houses/element?id=${id}`, {
      state: { id, imgSrc, title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, lat, long, conditions, description, is_public, is_active, owner_username, reservations, host, fechaIni, fechaFin  }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementocasa-container' onClick={() => handleCasaClick()}>
      <div className='elementocasa-content'>
        <div className='elementocasa-foto'>
          <img src={imgSrc} alt={`Imagen de ${title}`} className='casa-img' />
        </div>
        <div className='elementocasa-nombre'>
          <h2>{title}</h2>
        </div>
        <div className='elementocasa-numero'>
          <p>Ciudad: {city}</p>
          <p>Precio por noche: {price}€</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoCasa;
