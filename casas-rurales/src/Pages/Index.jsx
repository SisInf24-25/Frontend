import React, {useEffect, useState} from 'react'
import '../Style/Style.css'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

const Index = () => {

  const location = useLocation();
  const [toastShown, setToastShown] = useState(false); // Estado para evitar múltiples toasts

  useEffect(() => {
    if (location.state && location.state.showOKToast && !toastShown) {
      toast.success(
        ({ closeToast }) => (
          <div>
            <p style={{ fontSize: '25px', textAlign: 'center' }}>
            <b>Reserva realizada correctamente</b>
            </p>
          </div>), {position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
      });
      setToastShown(true); // Actualiza el estado para evitar múltiples toasts
    }
  }, [location.state, toastShown]); // Este hook se activa cuando hay un estado en la navegación

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Casas Rurales</div>
        <div className='underline'></div>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Index