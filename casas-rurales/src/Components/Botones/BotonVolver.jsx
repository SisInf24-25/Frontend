import React from 'react';
import './Botones.css'
import { useNavigate } from 'react-router-dom';

const BotonVolver = ({ idArg, direccion }) => {
    const navigate = useNavigate(); 

  // Función para manejar el click en el nombre
  const handleBotonClick = ( idArg, direccion ) => {
    if (idArg && direccion){
      navigate(direccion+"?id="+idArg);
    } else if (direccion) {
      navigate(direccion);
    } else {
      navigate(-1);
    }
    
  };

  return (
    <button className='botonvolver-container' onClick={() => handleBotonClick(idArg, direccion)}>
      <div className='botongen-content'>
        <div className='botongen-nombre'>
          <h3>Volver</h3>
        </div>
      </div>
    </button>
  );
};

export default BotonVolver;
