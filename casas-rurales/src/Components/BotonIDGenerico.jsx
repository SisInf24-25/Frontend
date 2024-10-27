import React from 'react';
import './BotonIDGenerico.css'
import { useNavigate } from 'react-router-dom';

const BotonIDGenerico = ({ nombre, id, direccion }) => {
    const navigate = useNavigate(); 

  // Función para manejar el click en el nombre
  const handleBotonClick = ( id, direccion) => {
    navigate(direccion, {
      state: { id }  // Pasamos el objeto como estado
    });
  };

  return (
    <button className='botongen-container' onClick={() => handleBotonClick(id, direccion)}>
      <div className='botongen-content'>
        <div className='botongen-nombre'>
          <h2>{nombre}</h2>
        </div>
      </div>
    </button>
  );
};

export default BotonIDGenerico;
