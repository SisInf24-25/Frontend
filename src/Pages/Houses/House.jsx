import React, { useState, useEffect, useContext } from 'react'
import '../../Style/Style.css'
import './House.css'
import { useLocation } from 'react-router-dom';  // Para acceder al estado pasado
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import BotonEditCasa from '../../Components/Botones/BotonEditCasa';
import BotonCalendar from '../../Components/Botones/BotonCalendar';
import BotonEliminar from '../../Components/Botones/BotonEliminar';
import BotonReservar from '../../Components/Botones/BotonReservar';
import BotonAtras from '../../Components/Botones/BotonVolver';
import Mapa from '../../Components/Mapa';
import axios from 'axios';
import AuthContext from '../../Context/AuthProvider'
import casaImg from '../../Images/sample-house.jpg';
import InterruptorGenerico from '../../Components/InterruptorGenerico';

const House = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const navigate = useNavigate();
  const { id, imgSrc, title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, lat, long, conditions, description, is_public, is_active, owner_username, reservations, host, fechaIni, fechaFin, guestCount, noches } = location.state || {};  // Extraer datos del estado
  
  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const { user_id } = auth;
  const { role } = auth;

  console.log("is_active", is_active)
  console.log("is_public", is_public)
  console.log('guestCount:', guestCount);
  console.log('noches:', noches);
  console.log(location.state);

   // Notificación de error
   const notifyError = (message) => toast.error(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  // Función para realizar la acción de eliminar casa
  const handleBotonEliminarClick = (eliminar_id) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p style={{ fontSize: '25px', textAlign: 'center' }}>
            ¿Estás seguro de que deseas <b>ELIMINAR</b> esta casa?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
              onClick={closeToast}
              style={{
                width: '100px',
                padding: '5px 10px',
                backgroundColor: 'gray',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '17px',
              }}
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                try {
                  const response = await axios.post('http://localhost:8000/houses/delete',{
                    house_id: eliminar_id
                  }, 
                  {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                  });
                  
                  navigate("/host", { state: { showOKToast: true }});
                } catch (error) {
                  // Check if `error.response` is defined before accessing `data`
                  if (error.response) {
                    // Handle the case where response exists
                    notifyError(error.response.data?.error || 'Error desconocido');
                  } else if (error.request) {
                    // Handle the case where the request was made but no response was received
                    notifyError('No se recibió respuesta del servidor');
                  } else {
                    // Handle other errors such as setting up the request
                    notifyError(`Error al intentar eliminar casa: ${error.message}`);
                  }
                }
              }}
              style={{
                width: '100px',
                padding: '5px 10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '17px',
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleBotonReservarClick = () => {
    if(!role || role !== "guest"){
      navigate("/auth?action=login");
    } else {
      console.log('guestCount:', guestCount);
      console.log('price:', price);
      console.log('noches:', noches);
      toast.info(
        ({ closeToast }) => (
          <div>
            <p style={{ fontSize: '25px', textAlign: 'center' }}>
              ¿Estás seguro de que deseas <b>RESERVAR</b> esta casa entre las fechas <b>{fechaIni}</b> y <b>{fechaFin}</b>?
            </p>
            <p style={{ fontSize: '18px', textAlign: 'center' }}>
              Número de huéspedes: <b>{guestCount}</b><br />
              Precio por noche: <b>{price}€</b><br />
              Precio total por {noches} noches: <b>{(price * noches).toFixed(2)}€</b>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button 
                onClick={closeToast} 
                style={{ 
                  width: '100px', padding: '5px 10px', backgroundColor: 'gray', 
                  color: 'white', border: 'none', borderRadius: '5px', 
                  cursor: 'pointer', fontSize: '17px' 
                }}
              >
                Cancelar
              </button>
              <button 
                onClick={() => { 
                  closeToast(); // Cierra el toast inmediatamente
                  setTimeout(() => {
                    navigate("/", { state: { showOKToast: true } }); // Navega después de un retraso
                  }, 1000);
                }} 
                style={{ 
                  width: '100px', padding: '5px 10px', backgroundColor: 'green', 
                  color: 'white', border: 'none', borderRadius: '5px', 
                  cursor: 'pointer', fontSize: '17px' 
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        ),
        { 
          position: "top-center", autoClose: false, hideProgressBar: false, 
          closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined 
        }
      );      
  }
  };

  if ( !id ) {
    return <p>No se encontró la información de la casa.</p>;  // Mensaje si no se pasan los datos
  }

  return (
    <div className='container'>
      <div className='house-botonatras'>
        <BotonAtras direccion={(host ? "/houses" : "/")}/>
      </div>
      <div className='title'>
        <div className='text'>{title}</div>
        <div className='underline'></div>
      </div>
      <div className='infoizq-infodcha'>
        <div className='infocentroizq'>
          <img src={imgSrc} alt={`Imagen de ${title}`} className="house-foto" />
          <div className='house-infoizq-info'>
            <div className='house-infoizq-elem'><b>Visible:</b>{is_public ? "Sí" : "No"}</div>
          </div>
        
      
          {host && (
            <div className='house-infoizq-botones'>
              <BotonCalendar nombre={title} id={id} />
              <BotonEditCasa 
                id={id}
                imgSrc={casaImg}
                title={title} 
                owner_id={owner_id}
                price={price}
                n_wc={n_wc}
                n_rooms={n_rooms}
                n_single_beds={n_single_beds}
                n_double_beds={n_double_beds}
                max_guests={max_guests}
                city={city}
                address={address}
                lat={lat}
                long={long}
                conditions={conditions}
                description={description}
                is_public={is_public}
                is_active={is_active}
                owner_username={username}
                reservations={reservations}
                host={true}
                fechaIni={[]}
                fechaFin={[]}
              />
              <BotonEliminar id={id} handleBotonClick={() => handleBotonEliminarClick(id)}></BotonEliminar>
            </div>
          )}
          
          <ToastContainer />
        </div>
        <div className='infocentrocentro'>
          <div className='mapa-condiciones'>
            <Mapa onMapClick={null} posicion={[lat ?? 41.683326, long ?? -0.889127]}/>
          </div>
        </div>

        <div className='infocentrodcha'>
          <div className='house-info'>
            <div className='house-infodcha-elem'><b>Nombre de la casa:</b> {title}</div>
            <div className='house-infodcha-elem'><b>Propietario:</b> {owner_username}</div>
            <div className='house-infodcha-elem'><b>Precio por noche (por persona):</b> {price}€</div>
            <div className='house-infodcha-elem'><b>Ciudad:</b> {city}</div>
            <div className='house-infodcha-elem'><b>Dirección:</b> {address}</div>
            <div className='house-infodcha-elem'><b>Máximo de huéspedes:</b> {max_guests}</div>
            <div className='house-infodcha-elem'><b>Habitaciones:</b> {n_rooms}</div>
            <div className='house-infodcha-elem'><b>Camas individuales:</b> {n_single_beds}</div>
            <div className='house-infodcha-elem'><b>Camas dobles:</b> {n_double_beds}</div>
            <div className='house-infodcha-elem'><b>Baños:</b> {n_wc}</div>
            <div className='house-infodcha-elem'><b>Descripción:</b> {description}</div>
          </div>
        </div>
      </div>
      {!host && (
      <div className='house-botonreservar'>
        <BotonReservar id={id} fechaIni={fechaIni} fechaFin={fechaFin} noches={noches} guestCount={guestCount} price={price} handleBotonClick={() => handleBotonReservarClick(id)}></BotonReservar>
      </div>
      )}
    </div>
  );
}

export default House