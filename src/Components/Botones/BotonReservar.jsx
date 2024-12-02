import React from 'react';
import './Botones.css'

const BotonReservar = ({ id, fechaIni, fechaFin, noches, guestCount, price, handleBotonClick }) => {
  
  const fechaIniDate = new Date(fechaIni);
  const fechaFinDate = new Date(fechaFin);

  return (
    <button className='botonreservar-container' onClick={() => handleBotonClick(id, fechaIni, fechaFin, noches, guestCount, price)}>
      <div className='botongen-content'>
        <div className='botongen-nombre'>
          <h2>Reservar</h2>
          <h4> {fechaIniDate.toLocaleDateString('es-ES')} a {fechaFinDate.toLocaleDateString('es-ES')}</h4>
        </div>
      </div>
    </button>
  );
};

export default BotonReservar;
