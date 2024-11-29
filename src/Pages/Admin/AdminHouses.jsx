import React, { useState } from 'react'
import ElementoAdminCasa from '../../Components/ElementoAdminCasa'
import casaImg from '../../Images/sample-house.jpg';
import '../../Style/Style.css'

const AdminHouses = () => {

  // Ejemplo de lista de elementos con nombre y número
  const [elementos, setElementos] = useState([
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10, host: 'Juan' },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25, host: 'Juan' },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40, host: 'Juan' },
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10, host: 'Juan' },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25, host: 'Juan' },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40, host: 'Juan' },
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10, host: 'Juan' },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25, host: 'Juan' },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40, host: 'Juan' },
  ]);

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Casas</div>
        <div className='underline'></div>
          {/* Mapea la lista de elementos y usa el componente ElementoCasa */}
          {elementos.map((elemento, i) => (
            <ElementoAdminCasa
              key={i}
              id={elemento.id}
              imgSrc={elemento.imgSrc}
              nombre={elemento.nombre}
              numero={elemento.numero}
              host={elemento.host}
            />
          ))}
      </div>
    </div>
  )
}

export default AdminHouses