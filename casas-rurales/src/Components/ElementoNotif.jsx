import React from 'react';
import './ElementoNotif.css'
import { useNavigate } from 'react-router-dom';

const ElementoNotif = ({ id, nombre, numero }) => {
  const navigate = useNavigate(); 

    
  // Función para manejar el click en el nombre
  const handleNotifClick = (id, nombre, numero ) => {
    navigate(`/notifs/element?id=${id}`, {
      state: { id, nombre, numero }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementonotif-container' onClick={() => handleNotifClick(id, nombre, numero)}>
      <div className='elementonotif-content'>
        <div className='elementonotif-nombre'>
          <h2>{nombre}</h2>
        </div>
        <div className='elementonotif-numero'>
          <p>Número: {numero}</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoNotif;
