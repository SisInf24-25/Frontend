import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import '../../Style/Style.css'
import BookCalendar from '../../Components/ElementCalendar'

const HouseCalendar = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const navigate = useNavigate();
  const { id, nombre } = location.state || {};  // Extraer datos del estado

   // Lista de elementos con nombre y número
  //  const [elementos, setElementos] = useState([
  //   { id: 1, fechaIni: [2, 11, 2024] , fechaFin: [4, 11, 2024] },
  //   { id: 2, fechaIni: [7, 11, 2024], fechaFin: [15, 11, 2024] },
  //   { id: 3, fechaIni: [18, 11, 2024], fechaFin: [21, 11, 2024] },
  // ]);
  const [elementos, setElementos] = useState([])

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Calendario de {nombre} </div>
        <div className='underline'></div>
        {/* Mapea la lista de elementos y usa el componente ElementoCasa */}
        <BookCalendar onDateRangeChange={null} selectable={false} fechas={elementos}/>
      </div>
      <div className="accept">
        <div className="accept-button" onClick={ () => { navigate(-1); }}>Aceptar</div>
      </div>
    </div>
  )
}

export default HouseCalendar