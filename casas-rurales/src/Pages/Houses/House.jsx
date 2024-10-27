import React, { useState } from 'react'
import '../../Style/Style.css'
import './House.css'
import { useLocation } from 'react-router-dom';  // Para acceder al estado pasado
import BotonIDGenerico from '../../Components/BotonIDGenerico';
import InterruptorGenerico from '../../Components/InterruptorGenerico';

const House = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const { nombre, numero, imgSrc } = location.state || {};  // Extraer datos del estado
  // visibleState es un booleano que guarda el estado de si la casa es o no visible
  const [visibleState, setVisibleState] = useState("on");

  const handleToggle = (isOn) => {
    setVisibleState(isOn);
    console.log("Estado \"visible\":", isOn ? "on" : "off");
  };

  // Función para obtener los parámetros de consulta
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('id'); // Obtener el valor del parámetro 'id'
  };

  const id = getQueryParams();

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
        <div className='house-fotobotones'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className="house-foto" />
          <BotonIDGenerico className="house-botoneditar"
            nombre={'Ver calendario'}
            id={numero}
            direccion={`/houses/element/calendar?id=${id}`}
          />
          <BotonIDGenerico className="house-botoneditar"
            nombre={'Editar'}
            id={numero}
            direccion={'/book'}
          />
          <InterruptorGenerico onToggle={handleToggle} />
          <p>Estado del interruptor: {visibleState ? "Activado" : "Desactivado"}</p>

        </div>
        <div className='house-info'>
          <div className='house-numero'>Número: {numero}</div>
        </div>
      </div>
    </div>
  );
}

export default House