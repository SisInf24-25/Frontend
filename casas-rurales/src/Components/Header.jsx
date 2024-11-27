import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import '../Style/Style.css';
import AuthContext from '../Context/AuthProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = () => {

  const { auth, setAuth } = useContext(AuthContext);
  const { username } = auth;
  const { user_id } = auth;
  const { role } = auth;

  // Notificación de error
  const notifyError = (message) => toast.error(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });


  const peticionLogout = async () => {
    try {
      console.log("peticion logout ANTES")
      const response = await axios.post('http://localhost:8000/users/logout', null, 
      {
        withCredentials: true
      });
      console.log("logout exitoso")
      setAuth({});

    } catch (error) {
      console.log("CATCH ERROR")
      // Check if `error.response` is defined before accessing `data`
      if (error.response) {
        // Handle the case where response exists
        console.log(error.response);
        console.log(error.response.data?.error || 'Error desconocido');
      } else if (error.request) {
        // Handle the case where the request was made but no response was received
        console.log('No se recibió respuesta del servidor');
      } else {
        // Handle other errors such as setting up the request
        console.log(`Error al intentar iniciar sesión: ${error.message}`);
      }
      setAuth({});
    }
  };

  const validSession = () => {
    if (!auth) {
      return false;
    }

    if (!user_id || user_id <= 0) {
      return false;
    }

    if (!username) {
      return false;
    }

    if (!(role === 'guest' || role === 'owner')) {
      return false;
    }

    return true;
  };

  return (
    <header className="header">
      

      {role === "guest" ? (
        <div className="left">
          <Link to="/">Inicio</Link>
        </div>
      ) :
        <div className="left">
          <Link to="/host">Inicio</Link>
        </div>
      }

      {!validSession() && (
        <div className="right">
          <Link to="/auth?action=login">Iniciar sesión</Link>
          <Link to="/auth?action=signup">Registrarse</Link>
        </div>
      )}

      {validSession() && (
        <div className="right">
          <Link
            to="/"
            onClick={() => {
              peticionLogout();
            }}
          >
            Cerrar sesión
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;