import React from 'react';
import './ElementoAdminUsuario.css'
import { useNavigate } from 'react-router-dom';

const ElementoAdminUsuario = ({ id, nombre, edad, imgSrc }) => {
    const navigate = useNavigate();

  // Función para manejar el click en el nombre
  const handleUsuarioClick = (id, nombre, edad, imgSrc) => {
    navigate(`/panel/user?id=${id}`, {
      state: { id, nombre, edad, imgSrc }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementoadminusuario-container' onClick={() => handleUsuarioClick(id, nombre, edad, imgSrc)}>
      <div className='elementoadminusuario-content'>
        <div className='elementoadminusuario-foto'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className='casa-img' />
        </div>
        <div className='elementoadminusuario-nombre'>
          <h2>{nombre}</h2>
        </div>
        <div className='elementoadminusuario-numero'>
          <p>Edad: {edad}</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoAdminUsuario;
