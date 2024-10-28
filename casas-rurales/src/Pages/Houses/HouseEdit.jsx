import React from 'react'
import { useLocation } from 'react-router-dom';
import '../../Style/Style.css'

const HouseList = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const { id, nombre } = location.state || {};  // Extraer datos del estado

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Editar {nombre} </div>
        <div className='underline'></div>
      </div>
    </div>
  )
}

export default HouseList