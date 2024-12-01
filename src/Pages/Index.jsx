import React, { useEffect, useState, useContext } from 'react';
import '../Style/Style.css';
import './Index.css';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import casaImg from '../Images/sample-house.jpg';
import ElementoCasaExtendida from '../Components/ElementoCasaExtendida';
import ElementoCalendar from '../Components/ElementoCalendar';
import AuthContext from '../Context/AuthProvider';

const Index = () => {
  const location = useLocation();
  const [toastShown, setToastShown] = useState(false); // Estado para evitar múltiples toasts
  const [searchCity, setSearchCity] = useState(''); // Estado para almacenar la ciudad buscada
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [noches, setNoches] = useState(0); // Nuevo estado para el número de noches
  const [guestCount, setGuestCount] = useState(1); // Nuevo estado para el número de huéspedes

  const { auth } = useContext(AuthContext);
  const { username } = auth;

  const [casas, setCasas] = useState([]);


  useEffect(() => {
    if (location.state && location.state.showOKToast && !toastShown) {
      toast.success(
        ({ closeToast }) => (
          <div>
            <p style={{ fontSize: '25px', textAlign: 'center' }}>
            <b>Reserva realizada correctamente</b>
            </p>
          </div>), {position: "top-center", autoClose: 1000, onClose: () => setToastShown(false), hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
      });
      setToastShown(true); // Actualiza el estado para evitar múltiples toasts
    }
  }, [location.state]); // Este hook se activa cuando hay un estado en la navegación


  const handleSearchChange = (e) => {
    setSearchCity(e.target.value); // Actualiza el estado del buscador con el texto ingresado
  };

  const handleGuestChange = (e) => {
    const value = e.target.value;
    // Convertir a número
    const numValue = Number(value);
  
    // Si es un valor válido, actualizamos el estado
    if (!isNaN(numValue) && numValue >= 1) {
      setGuestCount(numValue);
    } else {
      setGuestCount(1);
    }
    console.log('guestCount:', guestCount);
  };

  const filteredCasas = casas.filter((casa) => {
    const cityMatches = searchCity === '' || (casa.city && casa.city.toLowerCase().includes(searchCity.toLowerCase()));
    const guestMatches = guestCount === 0 || (casa.max_guests && casa.max_guests >= guestCount);

    const dateMatches = !casa.reservations.some((reservation) => {
      console.log("Comparando reserva:", reservation);
      const reservationStart = new Date(reservation.date_in);
      const reservationEnd = new Date(reservation.date_out);
 
      if(selectedRange[0] && selectedRange[1] && reservationStart && reservationEnd){
        console.log(selectedRange[1].toLocaleDateString('es-ES'),">",reservationStart.toLocaleDateString('es-ES'));
        console.log(selectedRange[0].toLocaleDateString('es-ES'),"<",reservationEnd.toLocaleDateString('es-ES'));
      }
      
      const isBooked = selectedRange[1] > reservationStart && selectedRange[0] < reservationEnd;
      console.log("isBooked reserva:", isBooked);
      return isBooked;
    });

    console.log("dateMatches casa", casa.title, "(id=", casa.id, "):", dateMatches);

    return cityMatches && guestMatches && dateMatches;
  });

  const handleCambioFechas = (selectedRange, noches) => {
    console.log(
      'Fechas cambiadas: ',
      selectedRange[0].toLocaleDateString('es-ES'),
      '--->',
      selectedRange[1].toLocaleDateString('es-ES')
    );
    setSelectedRange(selectedRange);
    setNoches(noches); // Guardar el número de noches
  };

  // Lógica para obtener datos de casas
  const peticionCasas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/houses/all', {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        // Procesar datos aquí si es necesario
        console.log('Datos recibidos:', response.data.houses);
        setCasas(response.data.houses);
      }
    } catch (error) {
      console.error('Error al obtener las casas:', error);
    }
  };

  useEffect(() => {
    peticionCasas();
  }, []);

  return (
    <div className="container">
      <div className="title">
        {username ? (
          <div className="text">Bienvenido a Casas Rurales, {username}</div>
        ) : (
          <div className="text">Casas Rurales</div>
        )}

        <div className="underline"></div>
        <div className="index-search-container">
          {/* Caja de texto para buscar por ciudad */}
          <input
            type="text"
            placeholder="Buscar por ciudad"
            value={searchCity}
            onChange={handleSearchChange}
            className="index-search-input"
          />
          {/* Caja de texto para ingresar número de huéspedes */}
          <input
            type="number"
            placeholder="Número de huéspedes"
            value={guestCount}
            onChange={handleGuestChange}
            className="index-guest-input"
            min="0"
          />
        </div>
        <div className="index-calendar">
          <ElementoCalendar
            onDateRangeChange={handleCambioFechas}
            selectable={true}
            fechas={[]}
          />
        </div>
        {/* Renderizado de casas (pendiente lógica para huéspedes y fechas) */}
        {selectedRange[0] == null ? (
          <p></p>
        ) : filteredCasas.length > 0 ? (
          // Si hay una búsqueda y hay casas que coinciden
          filteredCasas.map((casa, i) => (
            <ElementoCasaExtendida
              key={i}
              id={casa.id}
              imgSrc={casaImg}
              title={casa.title}
              owner_id={casa.owner_id}
              price={casa.price}
              n_wc={casa.n_wc}
              n_rooms={casa.n_rooms}
              n_single_beds={casa.n_single_beds}
              n_double_beds={casa.n_double_beds}
              max_guests={casa.max_guests}
              city={casa.city}
              address={casa.address}
              lat={casa.lat}
              long={casa.long}
              conditions={casa.conditions}
              description={casa.description}
              is_public={casa.public}
              is_active={casa.active}
              owner_username={casa.owner_username}
              reservations={casa.reservations}
              host={false}
              fechaIni={selectedRange[0].toISOString().split('T')[0]}
              fechaFin={selectedRange[1].toISOString().split('T')[0]}
              guestCount={guestCount}
              noches={noches}
            />
          ))
        ) : (
          // Si no hay casas que coincidan con la búsqueda
          <p>No hay casas que cumplan con esos criterios</p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Index;