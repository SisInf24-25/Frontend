import React, { useState } from 'react'
import ElementoCasa from '../../Components/ElementoCasa'
import casaImg from '../../Images/sample-house.jpg';
import '../../Style/Style.css'
import './HouseList.css'
import BotonIDGenerico from '../../Components/Botones/BotonIDGenerico';

const HouseList = () => {

  // Ejemplo de lista de casas con nombre y número
  const [casas, setCasas] = useState([
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10, lat: 41.683326, long: -0.889127 },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25, lat: 41.683326, long: -0.889127 },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40, lat: 41.683326, long: -0.889127  },
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10, lat: 41.683326, long: -0.889127  },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25, lat: 41.683326, long: -0.889127  },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40, lat: 41.683326, long: -0.889127  },
    { id: 1, imgSrc: casaImg, nombre: 'Casa A', numero: 10, lat: 41.683326, long: -0.889127  },
    { id: 2, imgSrc: casaImg, nombre: 'Casa B', numero: 25, lat: 41.683326, long: -0.889127  },
    { id: 3, imgSrc: casaImg, nombre: 'Casa C', numero: 40, lat: 41.683326, long: -0.889127  },
  ]);

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Lista de Casas</div>
        <div className='underline'></div>
          {/* Mapea la lista de casas y usa el componente ElementoCasa */}
          {casas.map((casa, i) => (
            <ElementoCasa
              key={i}
              id={casa.id}
              imgSrc={casa.imgSrc}
              nombre={casa.nombre}
              numero={casa.numero}
              lat={casa.lat}
              long={casa.long}
              host={true}
            />
          ))}
      </div>
      <div className='houselist-botonanadir'>
        <BotonIDGenerico 
          nombre={'Añadir casa'}
          idUser={1}
          idArg={null}
          direccion={`/houses/add`}
        />
      </div>
    </div>
  )
}

export default HouseList