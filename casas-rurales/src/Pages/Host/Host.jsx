import React, { useEffect, useState, } from 'react'
import BotonIDGenerico from '../../Components/Botones/BotonIDGenerico'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom';
import '../../Style/Style.css'
import './Host.css'


const Host = () => {
  const location = useLocation();
  const [toastShown, setToastShown] = useState(false); // Estado para evitar múltiples toasts

  
  useEffect(() => {
    if (location.state && location.state.showOKToast && !toastShown) {
      toast.success(
        ({ closeToast }) => (
          <div>
            <p style={{ fontSize: '25px', textAlign: 'center' }}>
            <b>Cambios guardados</b>
            </p>
          </div>), {position: "top-center", autoClose: 2500, onClose: () => setToastShown(false), hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
      });
      setToastShown(true); // Actualiza el estado para evitar múltiples toasts
    }
  }, [location.state]); // Este hook se activa cuando hay un estado en la navegación


  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Perfil de Host</div>
        <div className='underline'></div>
      </div>
      <div className='container'>
          <BotonIDGenerico className="host-boton"
            nombre={'Gestionar mis casas'}
            id={1} // id del Host
            direccion={`/houses`}
          />
          <BotonIDGenerico className="host-boton"
            nombre={'Ver mis reservas'}
            id={1} // id del Host
            direccion={`/books`}
          />
          <BotonIDGenerico className="host-boton"
          nombre={'Notificaciones'}
          id={1} // id del Host
          direccion={`/notifs`}
          />
          <BotonIDGenerico className="host-boton"
          nombre={'Editar mi perfil'}
          id={1} // id del Host
          direccion={`/profile`}
          />
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Host