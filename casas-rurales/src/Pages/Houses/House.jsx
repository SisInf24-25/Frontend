import React, { useState } from 'react'
import '../../Style/Style.css'
import './House.css'
import { useLocation } from 'react-router-dom';  // Para acceder al estado pasado
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import BotonEditCasa from '../../Components/BotonEditCasa';
import BotonCalendar from '../../Components/BotonCalendar';
import BotonEliminar from '../../Components/BotonEliminar';

const House = () => {
  const location = useLocation();  // Hook para obtener el estado enviado
  const navigate = useNavigate();
  const { id, nombre, numero, imgSrc } = location.state || {};  // Extraer datos del estado
  // visibleState es un booleano que guarda el estado de si la casa es o no visible

  // Función para realizar la acción de eliminar casa
  const handleBotonEliminarClick = () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p style={{ fontSize: '25px', textAlign: 'center' }}>¿Estás seguro de que deseas <b>eliminar</b> esta casa?</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
                fontSize: '17px'
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                navigate(-1); // Navega a la página anterior
                closeToast();
              }}
              style={{
                width: '100px',
                padding: '5px 10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '17px'
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

  if (!nombre || !numero || !imgSrc) {
    return <p>No se encontró la información de la casa.</p>;  // Mensaje si no se pasan los datos
  }

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>{nombre}</div>
        <div className='underline'></div>
      </div>
      <div className='infoizq-infodcha'>
        <div className='house-infoizq'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className="house-foto" />
          <div className='house-infoizq-content'>
            <div className='house-infoizq-elem'><b>Cancelación:</b> Sí</div>
            <div className='house-infoizq-elem'><b>Días de antelación cancelable:</b> 3</div>
            <div className='house-infoizq-elem'><b>Visible:</b> Sí</div>
          </div>
          <BotonCalendar className="house-botonizq"
            nombre={nombre}
            id={numero}
          />
          <BotonEditCasa className="house-botonizq"
            nombre={nombre}
            id={numero}
          />

          <BotonEliminar id={id} handleBotonClick={() => handleBotonEliminarClick(id)}></BotonEliminar>
          <ToastContainer />
        </div>
        <div className='infodcha'>
          <div className='house-info'>
            <div className='house-numero'>Número: {numero}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default House