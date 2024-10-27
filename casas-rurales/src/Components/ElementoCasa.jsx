import React from 'react';
import './ElementoCasa.css'
import { useNavigate } from 'react-router-dom';

const ElementoCasa = ({ nombre, numero, imgSrc }) => {
    const navigate = useNavigate(); 

    
  // Función para manejar el click en el nombre
  const handleCasaClick = (nombre, numero, imgSrc) => {
    navigate('/houses/element', {
      state: { nombre, numero, imgSrc }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementocasa-container' onClick={() => handleCasaClick(nombre, numero, imgSrc)}>
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
