import React from 'react';
import './ElementoAdminCasa.css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import BotonEliminar from './BotonEliminar';

const ElementoAdminCasa = ({ id, nombre, numero, host, imgSrc }) => {
    const navigate = useNavigate();

    
  // Función para manejar el click en el nombre
  const handleCasaClick = (id, nombre, numero, host, imgSrc) => {
    navigate(`/houses/element?id=${id}`, {
      state: { id, nombre, numero, host, imgSrc }  // Pasamos el objeto como estado
    });
  };

  // Función para realizar la acción de eliminar casa
  const handleBotonEliminarClick = (id) => {
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
                toast.success("Casa borrada con éxito!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
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

  return (
    <div className='elementoadmincasa-container'>
      <div className='elementoadmincasa-content' onClick={() => handleCasaClick(id, nombre, numero, host, imgSrc)}>
        <div className='elementoadmincasa-foto'>
          <img src={imgSrc} alt={`Imagen de ${nombre}`} className='casa-img' />
        </div>
        <div className='elementoadmincasa-nombre'>
          <h2>{nombre}</h2>
        </div>
        <div className='elementoadmincasa-numero'>
          <p>Número: {numero}</p>
        </div>
        <div className='elementoadmincasa-host'>
          <p>Dueño: {host}</p>
        </div>
      </div>
      <BotonEliminar id={id} handleBotonClick={() => handleBotonEliminarClick(id)}></BotonEliminar>
      <ToastContainer />
    </div>
  );
};

export default ElementoAdminCasa;