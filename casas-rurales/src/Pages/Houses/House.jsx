import React, { useState } from 'react'
import '../../Style/Style.css'
import './House.css'
import { useLocation } from 'react-router-dom';  // Para acceder al estado pasado
import BotonEditCasa from '../../Components/BotonEditCasa';
import BotonCalendar from '../../Components/BotonCalendar';
import InterruptorGenerico from '../../Components/InterruptorGenerico';
import BotonEliminar from '../../Components/BotonEliminar';

const House = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const { id, nombre, numero, imgSrc } = location.state || {};  // Extraer datos del estado
  // visibleState es un booleano que guarda el estado de si la casa es o no visible
  const [visibleState, setVisibleState] = useState("on");

  const handleToggle = (isOn) => {
    setVisibleState(isOn);
    console.log("Estado \"visible\":", isOn ? "on" : "off");
  };


  // Función para realizar la acción de eliminar casa
  const handleBotonEliminarClick = (id) => {
    alert("Eliminar pulsado");
    //TODO
  };

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
          <div className='house-infosobteboton-content'>
            <div className='house-infosobreboton'>Cancelación: Sí</div>
            <div className='house-infosobreboton'>Días de antelación cancelable: 3</div>
            <div className='house-infosobreboton'>Visible: Sí</div>
          </div>
          <BotonCalendar className="house-boton"
            nombre={nombre}
            id={numero}
          />
          <BotonEditCasa className="house-boton"
            nombre={nombre}
            id={numero}
          />

          <BotonEliminar id={id} handleBotonClick={() => handleBotonEliminarClick(id)}></BotonEliminar>

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