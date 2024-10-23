import React from 'react'
import '../../Style/Style.css'
import './House.css'
import { useLocation } from 'react-router-dom';  // Para acceder al estado pasado

const House = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const { nombre, numero, imgSrc } = location.state || {};  // Extraer datos del estado

  if (!nombre || !numero || !imgSrc) {
    return <p>No se encontró la información de la casa.</p>;  // Mensaje si no se pasan los datos
  }

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>{nombre}</div>
        <div className='underline'></div>
      </div>
      <div className='house-content'>
        <img src={imgSrc} alt={`Imagen de ${nombre}`} className="house-foto" />
        <div className='house-numero'>Número: {numero}</div>
      </div>
    </div>
  );
}

export default House