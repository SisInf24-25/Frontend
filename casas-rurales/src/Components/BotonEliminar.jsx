import React from 'react';
import './BotonEliminar.css'

const BotonEliminar = ({ id, handleBotonClick }) => {

  return (
    <button className='botonelim-container' onClick={() => handleBotonClick(id)}>
      <div className='botonelim-content'>
        <div className='botonelim-nombre'>
          <h2>Eliminar</h2>
        </div>
      </div>
    </button>
  );
};

export default BotonEliminar;
