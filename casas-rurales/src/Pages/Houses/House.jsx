import React, { useState, useEffect } from 'react'
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

const House = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const navigate = useNavigate();
  const { id, nombre, numero, imgSrc, host, fechaIni, fechaFin } = location.state || {};  // Extraer datos del estado


  // Función para realizar la acción de eliminar casa
  const handleBotonEliminarClick = () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p style={{ fontSize: '25px', textAlign: 'center' }}>¿Estás seguro de que deseas <b>ELIMINAR</b> esta casa?</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={closeToast} style={{ width: '100px', padding: '5px 10px', backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '17px' }}>Cancelar</button>
            <button onClick={() => { closeToast(); navigate("/", { state: { showOKToast: true } });
                                      }} style={{ width: '100px', padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '17px' }}>Aceptar</button>
          </div>
        </div>
      ),
      { position: "top-center", autoClose: false, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined }
    );
  };

  const handleBotonReservarClick = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p style={{ fontSize: '25px', textAlign: 'center' }}>¿Estás seguro de que deseas <b>RESERVAR</b> esta casa entre las fechas <b>{fechaIni}</b> y <b>{fechaFin}</b>?</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={closeToast} style={{ width: '100px', padding: '5px 10px', backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '17px' }}>Cancelar</button>
            <button onClick={() => { 
              closeToast(); // Cierra el toast inmediatamente
              setTimeout(() => {
                navigate("/", { state: { showOKToast: true } }); // Navega después de un retraso
              }, 1000);
            }} 
            style={{ width: '100px', padding: '5px 10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '17px' }}>Aceptar</button>
          </div>
        </div>
      ),
      { position: "top-center", autoClose: false, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined }
    );
  };

  if (!nombre || !numero || !imgSrc) {
    return <p>No se encontró la información de la casa.</p>;  // Mensaje si no se pasan los datos
  }

  return (
    <div className='container'>
      <div className='house-botonatras'>
        <BotonAtras direccion={(host ? "/houses" : "/")}/>
      </div>
      <div className='title'>
        <div className='text'>{nombre}</div>
        <div className='underline'></div>
      </div>
      <div className='infoizq-infodcha'>
        <div className='infocentroizq'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className="house-foto" />
          <div className='house-infoizq-info'>

            <div className='house-infoizq-elem'><b>Cancelación:</b> Sí</div>
            <div className='house-infoizq-elem'><b>Días de antelación cancelable:</b> 3</div>
            <div className='house-infoizq-elem'><b>Visible:</b> Sí</div>
        
          </div>
        
      
          {host && (
            <div className='house-infoizq-botones'>
              <BotonCalendar nombre={nombre} id={numero} />
              <BotonEditCasa nombre={nombre} id={numero} />
              <BotonEliminar id={id} handleBotonClick={() => handleBotonEliminarClick(id)}></BotonEliminar>
            </div>
          )}
          
          <ToastContainer />
        </div>
        <div className='infocentrocentro'></div>

        <div className='infocentrodcha'>
          <div className='house-info'>
            <div className='house-infodcha-elem'><b>Propietario:</b> {numero}</div>
            <div className='house-infodcha-elem'><b>Precio por noche (por persona):</b> {numero}€</div>
            <div className='house-infodcha-elem'><b>Ciudad:</b> {numero}</div>
            <div className='house-infodcha-elem'><b>Ubicación:</b> {numero}</div>
            <div className='house-infodcha-elem'><b>Máximo de huéspedes:</b> {numero}</div>
            <div className='house-infodcha-elem'><b>Habitaciones:</b> {numero}</div>
            <div className='house-infodcha-elem'><b>Camas individuales:</b> {numero}</div>
            <div className='house-infodcha-elem'><b>Camas dobles:</b> {numero}</div>
            <div className='house-infodcha-elem'><b>Baños:</b> {numero}</div>
            <div className='house-infodcha-elem'><b>Descripción:</b> {"sssssssssssssssss ssssss sssssss ssssssssss sssssssssssssssss sssssssss s s s ss s s  s ss s ssss ssssssssssssssssss ssssssssssssss ssssssssss ssss sssss sssssssssss sssssssssssssss s ssssssssssssssssssss sssssssssssss ssssssss sssssss"}</div>
          </div>
        </div>
      </div>
      <div className='house-botonreservar'>
        <BotonReservar id={id} fechaIni={fechaIni} fechaFin={fechaFin} handleBotonClick={() => handleBotonReservarClick(id)}></BotonReservar>
      </div>
    </div>
  );
}

export default House