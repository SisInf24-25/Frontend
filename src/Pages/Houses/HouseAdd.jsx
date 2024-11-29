import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import casaImg from '../../Images/sample-house.jpg';
import InterruptorGenerico from '../../Components/InterruptorGenerico';
import Mapa from '../../Components/Mapa'
import '../../Style/Style.css'
import './House.css'
import { MapContainer, TileLayer } from 'react-leaflet';
import InterruptorGenericoPequeño from '../../Components/InterruptorGenericoPequeño';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../Context/AuthProvider'

const HouseAdd = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const { user_id } = auth;
  const { role } = auth;

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [nWc, setNWC] = useState('');
  const [nRooms, setNRooms] = useState('');
  const [nSingleBeds, setNSingleBeds] = useState('');
  const [nDoubleBeds, setNDoubleBeds] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const [visibleState, setVisibleState] = useState(true);
  const [latitude, setLatitude] = useState(41.683326);
  const [longitude, setLongitude] = useState(-0.889127);
  const [condiciones, setCondiciones] = useState(['0','0','0','0','0','0','0','0','0','0','0','0'])

  const handleMapClick = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleConditionChange = (index, isOn) => {
    const nuevasCondiciones = [...condiciones]; 
    nuevasCondiciones[index] = isOn ? '1' : '0';
    setCondiciones(nuevasCondiciones)
  }

  useEffect(() => {
    console.log("Condiciones: ", condiciones);
  }, [condiciones]
  );

  const juntarBits = (arrayBinario) => {
    return arrayBinario.join('');
  };

  const separarBits = (stringBinario) => {
    return stringBinario.split('');
  };
   
  const handleVisibleToggle = (isVisible) => {
    setVisibleState(isVisible);
  };

  useEffect(() => {
    console.log("Estado \"visible\":", visibleState ? "visible" : "no-visible");
  }, [visibleState]
  );

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
    console.log(title, price, nWc);
    try {
      const response = await axios.post('http://localhost:8000/houses/create',
        JSON.stringify({
          title: title,
          price: price,
          n_wc: nWc,
          n_rooms: nRooms,
          n_single_beds: nSingleBeds,
          n_double_beds: nDoubleBeds,
          max_guests: maxGuests,
          city: city, 
          address: address,
          lat: latitude,
          long: longitude,
          conditions: condiciones.join(''),
          description: description,
          is_public: visibleState
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      
      console.log(response.data)
      navigate("/host", { state: { showOKToast: true }});
    } catch (error) {
      notify(error.response.status + ", " + error.response.data['error'])
    }
  };

  // Manejo del botón de aceptar
  const handleAcceptButtonClick = () => {
    console.log("boton click")
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

    if (!latitude | !longitude) {
      notify('Ubicación inválida')
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
            <div className='interruptor-texto'>¿Visible?</div>
            <InterruptorGenerico onToggle={handleVisibleToggle} />
          </div>
        </div>
        <div className='infodcentrocentro'>
          <h2>Seleccione la ubicación:</h2>
          <Mapa onMapClick={handleMapClick} posicion={[41.683326, -0.889127]}/>
          <h2>Seleccione las condiciones:</h2>
          <div className='condiciones'>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={0} />
                <div className='interruptor-peq-texto'>WIFI</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={1}/>
                <div className='interruptor-peq-texto'>Mascotas</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={2} />
                <div className='interruptor-peq-texto'>Fumar</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={3} />
                <div className='interruptor-peq-texto'>Lavadora</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={4} />
                <div className='interruptor-peq-texto'>Aire acondicionado</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={5} />
                <div className='interruptor-peq-texto'>Calefacción</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={6}/>
                <div className='interruptor-peq-texto'>Lavavajillas</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={7} />
                <div className='interruptor-peq-texto'>Horno</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={8} />
                <div className='interruptor-peq-texto'>Televisión</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={9} />
                <div className='interruptor-peq-texto'>Ropa de cama</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={10} />
                <div className='interruptor-peq-texto'>Jardín/Terraza</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={11}/>
                <div className='interruptor-peq-texto'>Barbacoa</div>
              </div> 
            </div>
        </div> 
        <div className="infocentrodcha">
          <h2>Introduzca la información:</h2>
          <div className='input-infocasa-container'>
            <div className="input-infocasa"><input type="text" placeholder="Nombre de la casa" value={title} onChange={handleInputChange(setTitle)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Precio por noche (por persona)" value={price} onChange={handleInputChange(setPrice)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Ciudad" value={city} onChange={handleInputChange(setCity)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Dirección" value={address} onChange={handleInputChange(setAddress)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Máximo de huéspedes" value={maxGuests} onChange={handleInputChange(setMaxGuests)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Habitaciones" value={nRooms} onChange={handleInputChange(setNRooms)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Camas individuales" value={nSingleBeds} onChange={handleInputChange(setNSingleBeds)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Camas dobles" value={nDoubleBeds} onChange={handleInputChange(setNDoubleBeds)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Baños" value={nWc} onChange={handleInputChange(setNWC)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Descripción" value={description} onChange={handleInputChange(setDescription)}/></div>
          </div>
        </div>
              
      </div>
      <div className="accept">
          <div className="accept-button" onClick={ handleAcceptButtonClick }>Aceptar</div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default HouseAdd