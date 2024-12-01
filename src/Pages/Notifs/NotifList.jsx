import React,  { useState } from 'react'
import '../../Style/Style.css'
import ElementoNotif from '../../Components/ElementoNotif';
import BotonAtras from '../../Components/Botones/BotonVolver';

const NotifList = () => {

  // Ejemplo de lista de elementos con nombre y número
  const [elementos, setElementos] = useState([
    { id: 1, nombre: 'Notif A', numero: 10 },
    { id: 2, nombre: 'Notif B', numero: 20 },
    { id: 3, nombre: 'Notif C', numero: 30 },
    { id: 4, nombre: 'Notif D', numero: 40 },
    { id: 5, nombre: 'Notif E', numero: 50 },
    { id: 6, nombre: 'Notif F', numero: 60 },
    { id: 7, nombre: 'Notif G', numero: 70 },
    { id: 8, nombre: 'Notif H', numero: 80 },
    { id: 9, nombre: 'Notif I', numero: 90 },

  ]);


  return (
    <div className='container'>
      <div className='house-botonatras'>
        <BotonAtras direccion={"/host"}/>
      </div>
      <div className='title'>
        <div className='text'>Notificaciones</div>
        <div className='underline'></div>
          {/* Mapea la lista de elementos y usa el componente ElementoCasa */}
          {elementos.map((elemento, i) => (
            <ElementoNotif
              key={i}
              id={elemento.id}
              imgSrc={elemento.imgSrc}
              nombre={elemento.nombre}
              numero={elemento.numero}
            />
          ))}
      </div>
    </div>
  )
}

export default NotifList