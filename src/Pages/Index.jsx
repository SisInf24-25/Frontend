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
  const [guestCount, setGuestCount] = useState(''); // Nuevo estado para el número de huéspedes

  const { auth } = useContext(AuthContext);
  const { username } = auth;

  const [casas, setCasas] = useState([]);

  const handleSearchChange = (e) => {
    setSearchCity(e.target.value); // Actualiza el estado del buscador con el texto ingresado
  };

  const handleGuestChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setGuestCount(value); // Actualiza el estado del número de huéspedes
      console.log('guestCount:', guestCount);
    }
  };

  const filteredCasas = casas.filter((casa) => {
    const cityMatches = searchCity === '' || (casa.city && casa.city.toLowerCase().includes(searchCity.toLowerCase()));
    const guestMatches = guestCount === '' || (casa.max_guests && casa.max_guests >= guestCount);
  
    return cityMatches && guestMatches;
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

  useEffect(() => {
    if (location.state && location.state.showOKToast && !toastShown) {
      toast.success(
        ({ closeToast }) => (
          <div>
            <p style={{ fontSize: '25px', textAlign: 'center' }}>
              <b>Reserva realizada correctamente</b>
            </p>
          </div>
        ),
        {
          position: 'top-center',
          autoClose: 5000,
          onClose: () => setToastShown(false),
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setToastShown(true); // Actualiza el estado para evitar múltiples toasts
    }
  }, [location.state]); // Este hook se activa cuando hay un estado en la navegación

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
        ) : searchCity === '' ? (
          // Si no hay búsqueda, muestra todas las casas
          casas.map((casa, i) => (
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
              fechaIni={selectedRange[0].toLocaleDateString('es-ES')}
              fechaFin={selectedRange[1].toLocaleDateString('es-ES')}
              guestCount={guestCount}
              noches={noches}
            />
          ))
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
              fechaIni={selectedRange[0].toLocaleDateString('es-ES')}
              fechaFin={selectedRange[1].toLocaleDateString('es-ES')}
              guestCount={guestCount}
              noches={noches}
            />
          ))
        ) : (
          // Si no hay casas que coincidan con la búsqueda
          <p>No hay casas en esa ciudad</p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Index;