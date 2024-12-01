import React from 'react';
import './Botones.css'
import { useNavigate } from 'react-router-dom';

const BotonCalendar = ({ nombre, id, fechas }) => {
    const navigate = useNavigate(); 

  // Función para manejar el click en el nombre
  const handleBotonClick = ( id ) => {
    navigate(`/houses/element/calendar?id=${id}`, {
      state: { id, nombre, fechas }  // Pasamos el objeto como estado
    });
  };

  return (
    <button className='botongen-container' onClick={() => handleBotonClick(id)}>
      <div className='botongen-content'>
        <div className='botongen-nombre'>
          <h2>Ver calendario</h2>
        </div>
      </div>
    </button>
  );
};

export default BotonCalendar;
