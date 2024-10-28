import React from 'react';
import './ElementoCalendar.css'

const ElementoCalendar = ({ id, fechaIni, fechaFin }) => {

  return (
    <div className='elementocalendar-container'>
      <div className='elementocalendar-content'>
        <div className='elementocalendar-numero'>
          <p>RANGO FECHAS {id}</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoCalendar;
