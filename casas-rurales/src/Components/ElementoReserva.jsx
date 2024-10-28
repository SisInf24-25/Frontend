import React from 'react';
import './ElementoReserva.css'
import { useNavigate } from 'react-router-dom';

const ElementoReserva = ({ id, nombre, numero, imgSrc }) => {
    const navigate = useNavigate(); 

    
  // Función para manejar el click en el nombre
  const handleReservaClick = (id, nombre, numero, imgSrc) => {
    navigate(`/books/element?id=${id}`, {
      state: { id, nombre, numero, imgSrc }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementoreserva-container' onClick={() => handleReservaClick(id, nombre, numero, imgSrc)}>
      <div className='elementoreserva-content'>
        <div className='elementoreserva-foto'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className='casa-img' />
        </div>
        <div className='elementoreserva-nombre'>
          <h2>{nombre}</h2>
        </div>
        <div className='elementoreserva-numero'>
          <p>Número: {numero}</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoReserva;
