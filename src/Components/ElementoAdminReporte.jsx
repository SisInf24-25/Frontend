import React from 'react';
import './ElementoAdminReporte.css'
import { useNavigate } from 'react-router-dom';

const ElementoAdminReporte = ({ id, titulo, texto, user }) => {
    const navigate = useNavigate();

  return (
    <div className='elementoadminreporte-container'>
      <div className='elementoadminreporte-content'>
        <div className='elementoadminreporte-titulo'>
          <h2>{titulo}</h2>
        </div>
        <div className='elementoadminreporte-texto'>
          <p>{texto}</p>
        </div>
        <div className='elementoadminreporte-user'>
          <p>Usuario: {user}</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoAdminReporte;
