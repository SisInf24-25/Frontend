import React, {useEffect, useState} from 'react'
import '../Style/Style.css'
import './Index.css'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import casaImg from '../Images/sample-house.jpg';
import ElementoCasaExtendida from '../Components/ElementoCasaExtendida';
import BookCalendar from '../Components/ElementCalendar';

const Index = () => {

  const location = useLocation();
  const [toastShown, setToastShown] = useState(false); // Estado para evitar múltiples toasts
  const [searchCity, setSearchCity] = useState(''); // Estado para almacenar la ciudad buscada
  const [selectedRange, setSelectedRange] = useState([null, null]);


  const [casas, setCasas] = useState([
    { id: 1, imgSrc: casaImg, nombre: 'Zaragoza', numero: 10, ciudad: "Zaragoza" },
    { id: 2, imgSrc: casaImg, nombre: 'Madrid', numero: 25, ciudad: "Madrid" },
    { id: 3, imgSrc: casaImg, nombre: 'Barcelona', numero: 40, ciudad: "Barcelona" },
    { id: 1, imgSrc: casaImg, nombre: 'Zaragoza', numero: 10, ciudad: "Zaragoza" },
    { id: 2, imgSrc: casaImg, nombre: 'Madrid', numero: 25, ciudad: "Madrid" },
    { id: 3, imgSrc: casaImg, nombre: 'Barcelona', numero: 40, ciudad: "Barcelona" },
    { id: 1, imgSrc: casaImg, nombre: 'Zaragoza', numero: 10, ciudad: "Zaragoza" },
    { id: 2, imgSrc: casaImg, nombre: 'Madrid', numero: 25, ciudad: "Madrid" },
    { id: 3, imgSrc: casaImg, nombre: 'Barcelona', numero: 40, ciudad: "Barcelona" },
  ]);

  const handleSearchChange = (e) => {
    setSearchCity(e.target.value); // Actualiza el estado del buscador con el texto ingresado
  };

  const filteredCasas = casas.filter((casa) => 
    casa.ciudad.toLowerCase().includes(searchCity.toLowerCase()) // Filtra las casas por ciudad
  );

  const handleCambioFechas = (selectedRange) => {
    console.log("Fechas cambiadas: ", selectedRange[0].toLocaleDateString('es-ES'), "--->", selectedRange[1].toLocaleDateString('es-ES'))
  }
  

  useEffect(() => {
    if (location.state && location.state.showOKToast && !toastShown) {
      toast.success(
        ({ closeToast }) => (
          <div>
            <p style={{ fontSize: '25px', textAlign: 'center' }}>
            <b>Reserva realizada correctamente</b>
            </p>
          </div>), {position: "top-center", autoClose: 5000, onClose: () => setToastShown(false), hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
      });
      setToastShown(true); // Actualiza el estado para evitar múltiples toasts
    }
  }, [location.state]); // Este hook se activa cuando hay un estado en la navegación

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Casas Rurales</div>
        <div className='underline'></div>
        <div className="index-search-container">
          <input
            type="text"
            placeholder="Buscar por ciudad"
            value={searchCity}
            onChange={handleSearchChange}
            className="index-search-input"
          />
        </div>
        <div className='index-calendar'>
          <BookCalendar onDateRangeChange={handleCambioFechas} selectable={true} fechas={[]}/>
        </div>
        {/* Mapea las casas filtradas */}
        {searchCity === '' ? (
          // Si no hay búsqueda, muestra todas las casas
          casas.map((casa, i) => (
            <ElementoCasaExtendida
              key={i}
              id={casa.id}
              imgSrc={casa.imgSrc}
              nombre={casa.nombre}
              numero={casa.numero}
              ciudad={casa.ciudad}
              host={false}
              fechaIni={"07/02/2024"} // QUITAR, solo sirve en menu huesped
              fechaFin={"08/02/2024"} // QUITAR, solo sirve en menu huesped
            />
          ))
        ) : filteredCasas.length > 0 ? (
          // Si hay una búsqueda y hay casas que coinciden
          filteredCasas.map((casa, i) => (
            <ElementoCasaExtendida
              key={i}
              id={casa.id}
              imgSrc={casa.imgSrc}
              nombre={casa.nombre}
              numero={casa.numero}
              ciudad={casa.ciudad}
              host={false}
              fechaIni={"07/02/2024"} // QUITAR, solo sirve en menu huesped
              fechaFin={"08/02/2024"} // QUITAR, solo sirve en menu huesped
            />
          ))
        ) : (
          // Si no hay casas que coincidan con la búsqueda
          <p>No hay casas en esa ciudad</p>
        )}
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Index