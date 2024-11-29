import React from 'react';
import './ElementoUsuario.css'
import { useNavigate } from 'react-router-dom';

const ElementoUsuario = ({ id, nombre, edad, imgSrc }) => {
    const navigate = useNavigate();

  // Función para manejar el click en el nombre
  const handleReservaClick = (id, nombre, edad, imgSrc) => {
    navigate(`/panel/user?id=${id}`, {
      state: { id, nombre, edad, imgSrc }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementousuario-container' onClick={() => handleReservaClick(id, nombre, edad, imgSrc)}>
      <div className='elementousuario-content'>
        <div className='elementousuario-foto'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className='casa-img' />
        </div>
        <div className='elementousuario-nombre'>
          <h2>{nombre}</h2>
        </div>
        <div className='elementousuario-numero'>
          <p>Edad: {edad}</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoUsuario;
