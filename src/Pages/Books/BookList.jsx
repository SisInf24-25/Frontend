import React, { useState } from 'react'
import ElementoReserva from '../../Components/ElementoReserva'
import casaImg from '../../Images/sample-house.jpg';
import '../../Style/Style.css'

const BookList = () => {
  // Lista de elementos con nombre y número
  const [elementos, setElementos] = useState([
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10 },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25 },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40 },
  ]);

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Mis reservas</div>
        <div className='underline'></div>
        {elementos.map((elemento, i) => (
            <ElementoReserva
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

export default BookList