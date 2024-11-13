import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import casaImg from '../../Images/sample-house.jpg';
import InterruptorGenerico from '../../Components/InterruptorGenerico';
import Mapa from '../../Components/Mapa'
import '../../Style/Style.css'
import { MapContainer, TileLayer } from 'react-leaflet';
import InterruptorGenericoPequeño from '../../Components/InterruptorGenericoPequeño';
import { useSession } from '../../Context/SessionContext';

const HouseAdd = () => {
  const navigate = useNavigate();

  const { userSession, clearSession } = useSession();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [nWc, setNWC] = useState('');
  const [nRooms, setNRooms] = useState('');
  const [nSingleBeds, setNSingleBeds] = useState('');
  const [nDoubleBeds, setNDoubleBeds] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const [visibleState, setVisibleState] = useState("visible");
  const [cancelableState, setCancelableState] = useState("cancelable");
  const [cancelableNumber, setCancelableNumber] = useState('1'); // cancelableNumber almacena el valor del input de número
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [condiciones, setCondiciones] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [codigoCondiciones, setCodigoCondiciones] = useState(0)

  const handleMapClick = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleConditionChange = (index, isOn) => {
    if(isOn){      
      condiciones[index] = 1;
    } else {
      condiciones[index] = 0;
    }
    setCodigoCondiciones(calcularDecimal(condiciones));
  }

  const calcularDecimal = (arrayBinario) => {
    return arrayBinario.reduce((total, valor, indice) => {
        return total + valor * Math.pow(2, arrayBinario.length - 1 - indice);
    }, 0);
  };
  
  const handleVisibleToggle = (isVisible) => {
    setVisibleState(isVisible);
  };

  const handleCancelableToggle = (isCancelable) => {
    setCancelableState(isCancelable);
  };

  // Notificación de error
  const notify = (message) => toast.error(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  // Manejo de cambio de inputs
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Lógica de crear casa
  const peticionCrearCasa = async () => {
    try {
      const response = await axios.post('http://localhost:8000/houses/create',
        JSON.stringify({
          title: title,
          owner_id: userSession.user_id,
          price: price,
          n_wc: nWc,
          n_rooms: nRooms,
          n_single_beds: nSingleBeds,
          n_double_beds: nDoubleBeds,
          max_guests: maxGuests,
          city: city, 
          address: address,
          lat: 0,
          long: 0,
          conditions: codigoCondiciones,
          description: description,
          public: visibleState
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log(response.data)
    } catch (error) {
      notify(error.response.data['error'])
    }
  };

  // Manejo del botón de aceptar
  const handleAcceptButtonClick = () => {
    if (!title) {
      notify('Título inválido')
      return;
    }

    if (!price) {
      notify('Precio inválido')
      return;
    }

    if (!nWc) {
      notify('Número de baños inválido')
      return;
    }

    if (!nRooms) {
      notify('Número de habitaciones inválido')
      return;
    }

    if (!nSingleBeds) {
      notify('Número de camas individuales inválido')
      return;
    }

    if (!nDoubleBeds) {
      notify('Número de camas dobles inválido')
      return;
    }

    if (!maxGuests) {
      notify('Máximo de huéspedes inválido')
      return;
    }

    if (!city) {
      notify('Ciudad inválida')
      return;
    }

    if (!address) {
      notify('Dirección inválida')
      return;
    }
  
    if (!location) {
      notify('Localización inválida')
      return;
    }

    peticionCrearCasa();
  }

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Añadir Casa</div>
        <div className='underline'></div>
      </div>
      <div className='infoizq-infodcha'>
        <div className='infocentroizq'>
          <img src={casaImg} alt={`Imagen`} className="house-foto" />
          <div className='interruptor-content'>
            <div className='interruptor-texto'>¿Cancelable?</div>
            <InterruptorGenerico onToggle={handleCancelableToggle} />
          </div>
          {cancelableState && (
              <div className="cancelable-container">
                <div className="cancelable-texto">¿Cancelable con cuántos días de antelación?</div>
                <input 
                  type="number" 
                  placeholder="Número" 
                  value={cancelableNumber}
                  onChange={(e) => setCancelableNumber(e.target.value)}
                  className="cancelable-input"
                  min='1'
                  onBlur={() => {
                    if (cancelableNumber < 1) {
                      setCancelableNumber('1');
                    }
                  }}
                />
              </div>
            )}
          <div className='interruptor-content'>
            <div className='interruptor-texto'>¿Visible?</div>
            <InterruptorGenerico onToggle={handleVisibleToggle} />
          </div>
        </div>
        <div className='infodcentrocentro'>
        <h2>Seleccione la ubicación:</h2>
          <Mapa onMapClick={handleMapClick} posicion={[41.683326, -0.889127]}/>
          <div className='condiciones'>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={0} />
                <div className='interruptor-peq-texto'>WIFI</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={1}/>
                <div className='interruptor-peq-texto'>Aire acondicionado</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={2} />
                <div className='interruptor-peq-texto'>Calefacción</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={3} />
                <div className='interruptor-peq-texto'>Fumar</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={4} />
                <div className='interruptor-peq-texto'>Mascotas</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={5} />
                <div className='interruptor-peq-texto'>Barbacoa</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={6}/>
                <div className='interruptor-peq-texto'>Lavadora</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={7} />
                <div className='interruptor-peq-texto'>Ropa de cama</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={8} />
                <div className='interruptor-peq-texto'>Lavavajillas</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={9} />
                <div className='interruptor-peq-texto'>Horno</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={10} />
                <div className='interruptor-peq-texto'>Televisión</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={11}/>
                <div className='interruptor-peq-texto'>Jardín/Terraza</div>
              </div> 
            </div>
        </div>  
        <div className="infocentrodcha">
          <div className="genericinput">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={handleInputChange(setTitle)}
            />
          </div>
          
          <div className="genericinput">
            <input
              type="text"
              placeholder="Precio"
              value={price}
              onChange={handleInputChange(setPrice)}
            />
          </div>

          <div className="genericinput">
            <input
              type="text"
              placeholder="Número de baños"
              value={nWc}
              onChange={handleInputChange(setNWC)}
            />
          </div>

          <div className="genericinput">
            <input
              type="text"
              placeholder="Número de habitaciones"
              value={nRooms}
              onChange={handleInputChange(setNRooms)}
            />
          </div>

          <div className="genericinput">
            <input
              type="text"
              placeholder="Número de camas individuales"
              value={nSingleBeds}
              onChange={handleInputChange(setNSingleBeds)}
            />
          </div>

          <div className="genericinput">
            <input
              type="text"
              placeholder="Número de camas dobles"
              value={nDoubleBeds}
              onChange={handleInputChange(setNDoubleBeds)}
            />
          </div>

          <div className="genericinput">
            <input
              type="text"
              placeholder="Máximo de huespedes permitidos"
              value={maxGuests}
              onChange={handleInputChange(setMaxGuests)}
            />
          </div>

          <div className="genericinput">
            <input
              type="text"
              placeholder="Ciudad"
              value={city}
              onChange={handleInputChange(setCity)}
            />
          </div>
          <div className="genericinput">
            <input
              type="text"
              placeholder="Dirección"
              value={address}
              onChange={handleInputChange(setAddress)}
            />
          </div>

          <div className="genericinput">
            <input
              type="text"
              placeholder="Localización"
              value={location}
              onChange={handleInputChange(setLocation)}
            />
          </div>

          <div className="genericinput">
            <input
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={handleInputChange(setDescription)}
            />
          </div>
        </div>
              
      </div>
      <div className="accept">
            <div className="accept-button" onClick={ handleAcceptButtonClick }>Aceptar</div>
          </div>
    </div>
  )
}

export default HouseAdd