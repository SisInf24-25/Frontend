import React, { useState } from 'react'
import ElementoCasa from '../../Components/ElementoCasa'
import casaImg from '../../Images/sample-house.jpg';
import '../../Style/Style.css'
import './HouseList.css'
import BotonIDGenerico from '../../Components/BotonIDGenerico';

const HouseList = () => {

  // Ejemplo de lista de elementos con nombre y número
  const [elementos, setElementos] = useState([
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10 },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25 },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40 },
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10 },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25 },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40 },
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10 },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25 },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40 },
  ]);

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Lista de Casas</div>
        <div className='underline'></div>
          {/* Mapea la lista de elementos y usa el componente ElementoCasa */}
          {elementos.map((elemento, i) => (
            <ElementoCasa
              key={i}
              id={elemento.id}
              imgSrc={elemento.imgSrc}
              nombre={elemento.nombre}
              numero={elemento.numero}
            />
          ))}
      </div>
      <div  className='houselist-botonanadir'>
        <BotonIDGenerico
          nombre={'Añadir casa'}
          id={1} // id del Host
          direccion={`/houses/add`}
        />
      </div>
    </div>
  )
}

export default HouseList