import React from 'react';
import './Botones.css'

const BotonEliminar = ({ id, handleBotonClick }) => {

  return (
    <button className='botonelim-container' onClick={() => handleBotonClick(id)}>
      <div className='botongen-content'>
        <div className='botongen-nombre'>
          <h2>Eliminar</h2>
        </div>
      </div>
    </button>
  );
};

export default BotonEliminar;
