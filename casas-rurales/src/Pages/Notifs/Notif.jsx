import React from 'react'
import { useLocation } from 'react-router-dom';
import '../../Style/Style.css'

const Notif = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const { id, nombre, numero, profileImg } = location.state || {};  // Extraer datos del estado

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Notificación: {nombre} </div>
        <div className='underline'></div>
        <p>{numero}</p>
      </div>
    </div>
  )
}

export default Notif