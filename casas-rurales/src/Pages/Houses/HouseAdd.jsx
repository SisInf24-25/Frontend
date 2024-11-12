import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import casaImg from '../../Images/sample-house.jpg';
import InterruptorGenerico from '../../Components/InterruptorGenerico';
import Mapa from '../../Components/Mapa'
import '../../Style/Style.css'
import { MapContainer, TileLayer } from 'react-leaflet';
import InterruptorGenericoPequeño from '../../Components/InterruptorGenericoPequeño';



const HouseAdd = () => {
  const navigate = useNavigate();

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
    console.log(condiciones)
    setCodigoCondiciones(calcularDecimal(condiciones));
    console.log(codigoCondiciones)
  }

  const calcularDecimal = (arrayBinario) => {
    return arrayBinario.reduce((total, valor, indice) => {
        return total + valor * Math.pow(2, arrayBinario.length - 1 - indice);
    }, 0);
  };
  
  const handleVisibleToggle = (isVisible) => {
    setVisibleState(isVisible);
    console.log("Estado \"visible\":", isVisible ? "visible" : "no-visible");
  };

  const handleCancelableToggle = (isCancelable) => {
    setCancelableState(isCancelable);
    console.log("Estado \"cancelable\":", isCancelable ? "cancelable" : "no-cancelable");
  };

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
            <input type="text" placeholder="Nombre de la casa" />
          </div>
          
          <div className="genericinput">
            <input type="text" placeholder="Campo 2" />
          </div>
        
          <div className="genericinput">
            <input type="text" placeholder="Campo 3" />
          </div>
          <div className="genericinput">
            <input type="text" placeholder="Campo 4" />
          </div>
          <div className="genericinput">
            <input type="text" placeholder="Campo 5" />
          </div>
        </div>
              
      </div>
      <div className="accept">
            <div className="accept-button" onClick={ () => { navigate('/houses'); } }>Aceptar</div>
          </div>
    </div>
  )
}

export default HouseAdd