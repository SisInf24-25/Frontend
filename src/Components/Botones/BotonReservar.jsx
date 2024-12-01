import React from 'react';
import './Botones.css'

const BotonReservar = ({ id, fechaIni, fechaFin, noches, guestCount, price, handleBotonClick }) => {

  return (
    <button className='botonreservar-container' onClick={() => handleBotonClick(id, fechaIni, fechaFin, noches, guestCount, price)}>
      <div className='botongen-content'>
        <div className='botongen-nombre'>
          <h2>Reservar</h2>
          <h4> {fechaIni} a {fechaFin}</h4>
        </div>
      </div>
    </button>
  );
};

export default BotonReservar;
