import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import './Book.css'
import BookCalendar from '../../Components/BookCalendar';
import '../../Style/Style.css'


const Book = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const { id, nombre, numero, imgSrc } = location.state || {};  // Extraer datos del estado
  const [selectedDateRange, setSelectedDateRange] = useState(null); // Rango de fechas seleccionado


  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    console.log("Rango de fechas seleccionado:\n", range[0].toLocaleDateString('es-ES'), "--->", range[1].toLocaleDateString('es-ES') );
  };

  const [elementos, setElementos] = useState([
    { id: 1, fechaIni: [2, 11, 2024] , fechaFin: [4, 11, 2024] },
    { id: 2, fechaIni: [7, 11, 2024], fechaFin: [15, 11, 2024] },
    { id: 3, fechaIni: [18, 11, 2024], fechaFin: [21, 11, 2024] },
  ]);

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
            <BookCalendar onDateRangeChange={handleDateRangeChange} selectable={true} fechas={elementos}/>
          </div>
        </div>
    </div>
  )
}

export default Book