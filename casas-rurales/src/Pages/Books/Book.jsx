import React from 'react'
import { useLocation } from 'react-router-dom';
import './Book.css'
import '../../Style/Style.css'


const Book = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const { id, nombre, numero, imgSrc } = location.state || {};  // Extraer datos del estado

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Reserva de {nombre}</div>
        <div className='underline'></div>
      </div>
      <div className='book-content'>
          <div className='book-fotocontent'>
            <img src={imgSrc} alt={`Imagen de ${nombre}`} className="book-foto" />
          </div>
          <div className='book-info'>
            <div className='book-numero'>Número: {numero}</div>
          </div>
        </div>
    </div>
  )
}

export default Book