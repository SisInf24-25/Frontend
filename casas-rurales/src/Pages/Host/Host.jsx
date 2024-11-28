import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../../Context/AuthProvider';
import BotonIDGenerico from '../../Components/Botones/BotonIDGenerico'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom';
import '../../Style/Style.css'
import './Host.css'


const Host = () => {
  const location = useLocation();
  const [toastShown, setToastShown] = useState(false); // Estado para evitar múltiples toasts

  const { auth, setAuth } = useContext(AuthContext);
  const { username } = auth;
  const { user_id } = auth;
  const { role } = auth;


  
  useEffect(() => {
    if (location.state && location.state.showOKToast && !toastShown) {
      toast.success(
        ({ closeToast }) => (
          <div>
            <p style={{ fontSize: '25px', textAlign: 'center' }}>
            <b>Cambios guardados</b>
            </p>
          </div>), {position: "top-center", autoClose: 1000, onClose: () => setToastShown(false), hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
      });
      setToastShown(true); // Actualiza el estado para evitar múltiples toasts
    }
  }, [location.state]); // Este hook se activa cuando hay un estado en la navegación


  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Perfil de {username ?? 'usuario-no-encontrado'}</div>
        <div className='underline'></div>
      </div>
      <div className='container'>
          <BotonIDGenerico className="host-boton"
            nombre={'Gestionar mis casas'}
            id={user_id} // id del Host
            direccion={`/houses`}
            onClick={() => toast.dismiss()}
          />
          <BotonIDGenerico className="host-boton"
            nombre={'Ver mis reservas'}
            id={user_id} // id del Host
            direccion={`/books`}
            onClick={() => toast.dismiss()}
          />
          <BotonIDGenerico className="host-boton"
          nombre={'Notificaciones'}
          id={user_id} // id del Host
          direccion={`/notifs`}
          onClick={() => toast.dismiss()}
          />
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Host