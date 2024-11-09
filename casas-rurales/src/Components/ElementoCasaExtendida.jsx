import React from 'react';
import './ElementoCasaExtendida.css'
import { useNavigate } from 'react-router-dom';

const ElementoCasaExtendida = ({ id, nombre, numero, imgSrc, host, posicion, fechaIni, fechaFin }) => {
    const navigate = useNavigate(); 
  //MUESTRA: nombre, propietario, precio por noche, max huespedes, ciudad
    
  // Función para manejar el click en el nombre
  const handleCasaClick = (id, nombre, numero, imgSrc, host, posicion) => {
    navigate(`/houses/element?id=${id}`, {
      state: { id, nombre, numero, imgSrc, host, posicion, fechaIni, fechaFin }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementocasaext-container' onClick={() => handleCasaClick(id, nombre, numero, imgSrc, host, posicion)}>
      <div className='elementocasaext-content'>
        <div className='elementocasaext-foto'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className='casa-img' />
        </div>
        <div className='elementocasaext-nombre'>
          <h2>{nombre}</h2>
        </div>
        <div className='elementocasaext-info'>
          <p>Propietario: <b>{numero}</b></p>
          <p>Precio por noche: <b>{numero}</b></p>
          <p>Huéspedes máximos: <b>{numero}</b></p>
          <p>Ciudad: <b>{numero}</b></p>
        </div>
      </div>
    </div>
  );
};

export default ElementoCasaExtendida;
