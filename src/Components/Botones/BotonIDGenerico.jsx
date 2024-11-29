import React from 'react';
import './Botones.css'
import { useNavigate } from 'react-router-dom';

const BotonIDGenerico = ({ nombre, idUser, idArg, direccion }) => {
    const navigate = useNavigate(); 

  // Función para manejar el click en el nombre
  const handleBotonClick = ( idArg, direccion ) => {
    if (idArg){
      navigate(direccion+"?id="+idArg, {
        state: { idArg, nombre }  // Pasamos el objeto como estado
      });
    } else {
      navigate(direccion, {
        state: { idArg, nombre }  // Pasamos el objeto como estado
      });
    }
    
  };

  return (
    <button className='botongen-container' onClick={() => handleBotonClick(idArg, direccion)}>
      <div className='botongen-content'>
        <div className='botongen-nombre'>
          <h2>{nombre}</h2>
        </div>
      </div>
    </button>
  );
};

export default BotonIDGenerico;
