import React from 'react';
import './Botones.css'
import { useNavigate } from 'react-router-dom';

const BotonEditCasa = ({ id, imgSrc, title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, lat, long, conditions, description, is_public, is_active, owner_username, reservations, host, fechaIni, fechaFin }) => {
    const navigate = useNavigate(); 

  // Función para manejar el click en el nombre
  const handleBotonClick = ( id ) => {
    navigate(`/houses/element/edit?id=${id}`, {
      state: { id, imgSrc, title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, lat, long, conditions, description, is_public, is_active, owner_username, reservations, host, fechaIni, fechaFin }  // Pasamos el objeto como estado
    });
  };

  return (
    <button className='botongen-container' onClick={() => handleBotonClick(id)}>
      <div className='botongen-content'>
        <div className='botongen-nombre'>
          <h2>Editar casa</h2>
        </div>
      </div>
    </button>
  );
};

export default BotonEditCasa;
