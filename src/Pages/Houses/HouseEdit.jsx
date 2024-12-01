import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import casaImg from '../../Images/sample-house.jpg';
import InterruptorGenericoPequeño from '../../Components/InterruptorGenericoPequeño';
import Mapa from '../../Components/Mapa'
import InterruptorGenerico from '../../Components/InterruptorGenerico';
import '../../Style/Style.css'
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../Context/AuthProvider'

const HouseEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();  // Hook para obtener el estado enviado
  const { id, imgSrc, title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, lat, long, conditions, description, is_public, is_active } = location.state || {};  // Extraer datos del estado

  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const { user_id } = auth;
  const { role } = auth;

  const [inputHouseId, setHouseId] = useState(id ?? 0);
  const [inputTitle, setTitle] = useState(title ?? '');
  const [inputPrice, setPrice] = useState(price ?? '');
  const [inputNWC, setNWC] = useState(n_wc ?? '');
  const [inputNRooms, setNRooms] = useState(n_rooms ?? '');
  const [inputNSingleBeds, setNSingleBeds] = useState(n_single_beds ?? '');
  const [inputNDoubleBeds, setNDoubleBeds] = useState(n_double_beds ?? '');
  const [inputMaxGuests, setMaxGuests] = useState(max_guests ?? '');
  const [inputCity, setCity] = useState(city ?? '');
  const [inputAddress, setAddress] = useState(address ?? '');
  const [inputDescription, setDescription] = useState(description ?? '');

  const [visibleState, setVisibleState] = useState(is_public);
  const [latitude, setLatitude] = useState(lat ?? null);
  const [longitude, setLongitude] = useState(long ?? null);
  const [condiciones, setCondiciones] = useState(conditions ? conditions.split('') : ['0','0','0','0','0','0','0','0','0','0','0','0'])

  console.log(conditions.split())

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
    console.log("is_public", is_public)
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
  const peticionModificarCasa = async () => {
    console.log(inputTitle, user_id, inputPrice, inputNWC);
    try {
      const response = await axios.post('http://localhost:8000/houses/modify',
        JSON.stringify({
          house_id: id,
          title: inputTitle,
          price: inputPrice,
          n_wc: inputNWC,
          n_rooms: inputNRooms,
          n_single_beds: inputNSingleBeds,
          n_double_beds: inputNDoubleBeds,
          max_guests: inputMaxGuests,
          city: inputCity, 
          address: inputAddress,
          lat: latitude,
          long: longitude,
          conditions: condiciones.join(''),
          description: inputDescription,
          is_public: visibleState,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      navigate("/host", { state: { showOKToast: true }});
      console.log(response.data)
    } catch (error) {
      notify(error.response.status + ", " + error.response.data['error'])
    }
  };

  // Manejo del botón de aceptar
  const handleAcceptButtonClick = () => {
    console.log("boton click")
    if (!inputTitle) {
      notify('Título inválido')
      return;
    }

    if (!inputPrice) {
      notify('Precio inválido')
      return;
    }

    if (!inputNWC) {
      notify('Número de baños inválido')
      return;
    }

    if (!inputNRooms) {
      notify('Número de habitaciones inválido')
      return;
    }

    if (!inputNSingleBeds) {
      notify('Número de camas individuales inválido')
      return;
    }

    if (!inputNDoubleBeds) {
      notify('Número de camas dobles inválido')
      return;
    }

    if (!inputMaxGuests) {
      notify('Máximo de huéspedes inválido')
      return;
    }

    if (!inputCity) {
      notify('Ciudad inválida')
      return;
    }

    if (!inputAddress) {
      notify('Dirección inválida')
      return;
    }

    peticionModificarCasa();
  }

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Editar Casa</div>
        <div className='underline'></div>
      </div>
      <div className='infoizq-infodcha'>
        <div className='infocentroizq'>
          <img src={casaImg} alt={`Imagen`} className="house-foto" />
          <div className='interruptor-content'>
            <div className='interruptor-texto'>¿Visible?</div>
            <InterruptorGenerico onToggle={handleVisibleToggle} isOnInicial={is_public}/>
          </div>
        </div>
        <div className='infodcentrocentro'>
          <h2>Seleccione la ubicación:</h2>
          <Mapa onMapClick={handleMapClick} posicion={[41.683326, -0.889127]}/>
          <h2>Seleccione las condiciones:</h2>
          <div className='condiciones'>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={0} isOnInicial={condiciones[0] === '1'}/>
                <div className='interruptor-peq-texto'>WIFI</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={1} isOnInicial={condiciones[1] === '1'}/>
                <div className='interruptor-peq-texto'>Mascotas</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={2} isOnInicial={condiciones[2] === '1'}/>
                <div className='interruptor-peq-texto'>Fumar</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={3} isOnInicial={condiciones[3] === '1'}/>
                <div className='interruptor-peq-texto'>Lavadora</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={4} isOnInicial={condiciones[4] === '1'}/>
                <div className='interruptor-peq-texto'>Aire acondicionado</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={5} isOnInicial={condiciones[5] === '1'}/>
                <div className='interruptor-peq-texto'>Calefacción</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={6} isOnInicial={condiciones[6] === '1'}/>
                <div className='interruptor-peq-texto'>Lavavajillas</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={7} isOnInicial={condiciones[7] === '1'}/>
                <div className='interruptor-peq-texto'>Horno</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={8} isOnInicial={condiciones[8] === '1'}/>
                <div className='interruptor-peq-texto'>Televisión</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={9} isOnInicial={condiciones[9] === '1'}/>
                <div className='interruptor-peq-texto'>Ropa de cama</div>
              </div>
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={10} isOnInicial={condiciones[10] === '1'}/>
                <div className='interruptor-peq-texto'>Jardín/Terraza</div>
              </div> 
              <div className='interruptor-content'>
                <InterruptorGenericoPequeño onToggle={handleConditionChange} index={11} isOnInicial={condiciones[11] === '1'}/>
                <div className='interruptor-peq-texto'>Barbacoa</div>
              </div> 
            </div>
        </div> 
        <div className="infocentrodcha">
          <h2>Introduzca la información:</h2>
          <div className='input-infocasa-container'>
            <div className="input-infocasa"><input type="text" placeholder="Nombre de la casa" value={inputTitle} onChange={handleInputChange(setTitle)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Precio por noche (por persona)" value={inputPrice} onChange={handleInputChange(setPrice)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Ciudad" value={inputCity} onChange={handleInputChange(setCity)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Dirección" value={inputAddress} onChange={handleInputChange(setAddress)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Máximo de huéspedes" value={inputMaxGuests} onChange={handleInputChange(setMaxGuests)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Habitaciones" value={inputNRooms} onChange={handleInputChange(setNRooms)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Camas individuales" value={inputNSingleBeds} onChange={handleInputChange(setNSingleBeds)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Camas dobles" value={inputNDoubleBeds} onChange={handleInputChange(setNDoubleBeds)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Baños" value={inputNWC} onChange={handleInputChange(setNWC)}/></div>
            <div className="input-infocasa"><input type="text" placeholder="Descripción" value={inputDescription} onChange={handleInputChange(setDescription)}/></div>
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

export default HouseEdit