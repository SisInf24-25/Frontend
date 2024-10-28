import React from 'react';
import './BotonGenerico.css'
import { useNavigate } from 'react-router-dom';

const BotonIDGenerico = ({ nombre, id }) => {
    const navigate = useNavigate(); 

  // Función para manejar el click en el nombre
  const handleBotonClick = ( id ) => {
    navigate(`/houses/element/calendar?id=${id}`, {
      state: { id, nombre }  // Pasamos el objeto como estado
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

export default BotonIDGenerico;
