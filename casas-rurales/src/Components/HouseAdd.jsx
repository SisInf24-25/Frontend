import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import casaImg from '../../Images/sample-house.jpg';
import InterruptorGenerico from '../../Components/InterruptorGenerico';
import Mapa from '../../Components/Mapa'
import '../../Style/Style.css'
import { MapContainer, TileLayer } from 'react-leaflet';



const HouseAdd = () => {
  const navigate = useNavigate();

  const [visibleState, setVisibleState] = useState("visible");
  const [cancelableState, setCancelableState] = useState("cancelable");
  const [cancelableNumber, setCancelableNumber] = useState('1'); // cancelableNumber almacena el valor del input de número
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  
  const handleMapClick = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
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
        <Mapa onMapClick={handleMapClick} />
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
            <div className="accept-button" onClick={ () => { navigate('/houses'); }}>Aceptar</div>
          </div>
    </div>
  )
}

export default HouseAdd