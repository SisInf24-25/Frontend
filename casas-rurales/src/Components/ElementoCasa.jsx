import React from 'react';
import './ElementoCasa.css'
import { useNavigate } from 'react-router-dom';

const ElementoCasa = ({ id, nombre, numero, imgSrc, host, fechaIni, fechaFin }) => {
    const navigate = useNavigate(); 

    
  // Función para manejar el click en el nombre
  const handleCasaClick = (id, nombre, numero, imgSrc, host) => {
    navigate(`/houses/element?id=${id}`, {
      state: { id, nombre, numero, imgSrc, host, fechaIni, fechaFin }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementocasa-container' onClick={() => handleCasaClick(id, nombre, numero, imgSrc, host)}>
      <div className='elementocasa-content'>
        <div className='elementocasa-foto'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className='casa-img' />
        </div>
        <div className='elementocasa-nombre'>
          <h2>{nombre}</h2>
        </div>
        <div className='elementocasa-numero'>
          <p>Número: {numero}</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoCasa;
