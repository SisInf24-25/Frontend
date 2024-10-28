import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import '../../Style/Style.css'
import ElementoCalendar from '../../Components/ElementoCalendar'

const HouseCalendar = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const { id, nombre } = location.state || {};  // Extraer datos del estado

   // Lista de elementos con nombre y número
   const [elementos, setElementos] = useState([
    { id: 1, fechaIni: "02/03/2024", fechaFin: "04/03/2024" },
    { id: 2, fechaIni: "07/03/2024", fechaFin: "15/03/2024" },
    { id: 3, fechaIni: "18/03/2024", fechaFin: "21/03/2024" },
  ]);

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Calendario de {nombre} </div>
        <div className='underline'></div>
        {/* Mapea la lista de elementos y usa el componente ElementoCasa */}
        {elementos.map((elemento, i) => (
            <ElementoCalendar
              key={i}
              id={elemento.id}
              fechaIni={elemento.fechaIni}
              fechaFin={elemento.fechaFin}
            />
          ))}
      </div>
    </div>
  )
}

export default HouseCalendar