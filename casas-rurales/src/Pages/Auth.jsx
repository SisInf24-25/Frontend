import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import AuthContext from '../Context/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import '../Style/Style.css';

const Auth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  //console.log(auth); // Check the current auth state
  //console.log(setAuth); // Should log the function
  
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (auth && typeof auth === 'object' && Object.keys(auth).length !== 0) {
      setSuccess(true);
    }
  }, [auth]);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialAction = queryParams.get('action') || 'login';

  // Tipos
  const OWNER_TYPE = 1;
  const GUEST_TYPE = 2;

  // Estados
  const [action, setAction] = useState(initialAction);
  const [userType, setUserType] = useState(GUEST_TYPE);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

 


  // Si la acción es logout, eliminar la cookie y redirigir
  useEffect(() => {
    if (action === 'logout') {
      navigate('/');  // Redirige a la página de inicio
    }
  }, [action]);

  // Actualiza la acción cuando cambia la URL
  useEffect(() => {
    const newAction = queryParams.get('action') || 'login';
    setAction(newAction);
  }, [location.search]);

  // Cambio de acción
  const handleActionChange = (newAction) => {
    setAction(newAction);
    navigate(`/auth?action=${newAction}`);
  };

  // Notificación OK
  const notifyOK = (message) => toast.success(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  // Notificación de error
  const notifyError = (message) => toast.error(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  // Verificar si las contraseñas coinciden en tiempo real
  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setPasswordError('Contraseñas no coinciden');
      } else {
        setPasswordError('');
      }
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  // Manejo de cambio de inputs
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Lógica de login
  const peticionLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/login',{
        username: username,
        password: password,
      }, 
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      //const { user_id, username: userUsername, role } = response.data['user'];

      // Guardamos la sesión en el contexto
      //setSession({ user_id, username: userUsername, role });

      if (response.status === 200) {
        console.log(username)
        console.log(response); /* Solo desarrollo */
        const user_id = response?.data?.user?.user_id;
        const role = response?.data?.user?.role;
        setAuth({ username, user_id, role });

        setUsername('');
        setPassword('');

        notifyOK("Inicio de sesión exitoso")
        switch (role) {
          case "guest":
            notifyOK("Huesped", userType)
            navigate('/');
            break;
          case "owner":
            notifyOK("Propietario", userType)
            navigate('/host');
            break;
        }
      }
    } catch (error) {
      // Check if `error.response` is defined before accessing `data`
      if (error.response) {
        // Handle the case where response exists
        notifyError(error.response.data?.error || 'Error desconocido');
      } else if (error.request) {
        // Handle the case where the request was made but no response was received
        notifyError('No se recibió respuesta del servidor');
      } else {
        // Handle other errors such as setting up the request
        notifyError(`Error al intentar iniciar sesión: ${error.message}`);
      }
    }
  };

  // Lógica de signup (si es necesario agregar más tarde)
  const peticionSignup = async () => {
  
    try {
      const response = await axios.post('http://localhost:8000/users/registerUser', {
        username: username,
        name: name,
        lastname: lastname,
        mail: email,
        number: number,
        password: password,
        type: userType
      });


      if (response.status === 200) {
        notifyOK("Registro exitoso")

        /*
        const { user_id, username: userUsername, role } = response.data['user'];

        // Guardamos la sesión en el contexto
        setSession({ user_id, username: userUsername, role });
        switch (userType) {
          case GUEST_TYPE:
            navigate('/');
            break;
          case OWNER_TYPE:
            navigate('/host');
            break;
        }
        */
      }
        
    } catch (error) {
      notifyError(error.response.data['error'])
    }
    
  };

  // Manejo del botón de aceptar
  const handleAcceptButtonClick = () => {
    if (!username) {
      notifyError('Nombre de usuario inválido')
      return;
    }

    if (username.length > 20) {
      notifyError('Nombre de usuario demasiado largo')
      return;
    }

    if (action === 'login') {
      peticionLogin();
    }
    else if (action === 'signup') {
      if (!name) {
        notifyError('Nombre inválido')
        return;
      }

      if (name.length > 25) {
        notifyError('Nombre demasiado largo')
        return;
      }

      if (!lastname) {
        notifyError('Apellidos inválidos')
        return;
      }

      if (lastname.length > 25) {
        notifyError('Apellidos demasiado largos')
        return;
      }

      if (!email) {
        notifyError('Correo electrónico inválido')
        return;
      }

      if (email.length > 50) {
        notifyError('Correo electrónico demasiado largo')
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        notifyError('Nombre de usuario solo puede contener caracteres alfanuméricos y guión bajo (_)')
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        notifyError('Formato de correo electrónico no válido')
        return;
      }

      if (password !== confirmPassword) {
        notifyError('Contraseñas no coinciden')
        return;
      }

      peticionSignup();
    }
  };

  // Nombres de las acciones
  const actionNames = {
    login: 'Iniciar sesión',
    signup: 'Registrarse',
  };

  return (
    <div className="container">
      <div className="title">
        <div className="text">{actionNames[action]}</div>
        <div className="underline"></div>
      </div>

      <div className="submit-container">
        <div
          className={action === 'login' ? 'submit' : 'submit gray'}
          onClick={() => handleActionChange('login')}
        >
          {actionNames.login}
        </div>
        <div
          className={action === 'signup' ? 'submit' : 'submit gray'}
          onClick={() => handleActionChange('signup')}
        >
          {actionNames.signup}
        </div>
      </div>

      <div className="inputs">
        <div className="input">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={handleInputChange(setUsername)}
          />
        </div>

        {action !== 'login' && (
          <>
            <div className="input">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={handleInputChange(setName)}
              />
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Apellidos"
                value={lastname}
                onChange={handleInputChange(setLastname)}
              />
            </div>
            <div className="input">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
            </div>
            <div className="input">
              <input
                type="tel"
                placeholder="Número de teléfono"
                value={number}
                onChange={handleInputChange(setNumber)}
              />
            </div>
          </>
        )}

        <div className="input">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handleInputChange(setPassword)}
          />
        </div>

        {action !== 'login' && (
          <div className="input">
            <input
              type="password"
              placeholder="Repetir contraseña"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
            />
          </div>
        )}

        {passwordError && (
          <p id="mensaje-error-contraseñas" style={{ color: 'red' }}>
            {passwordError}
          </p>
        )}

        {action !== 'login' && (
          <div className="user-type-container">
            <div
              className={userType === GUEST_TYPE ? 'user-type' : 'user-type gray'}
              onClick={() => setUserType(GUEST_TYPE)}
            >
              Huésped
            </div>
            <div
              className={userType === OWNER_TYPE ? 'user-type' : 'user-type gray'}
              onClick={() => setUserType(OWNER_TYPE)}
            >
              Propietario
            </div>
          </div>
        )}

        <div className="accept">
          <div
            id="auth"
            className="accept-button"
            onClick={ handleAcceptButtonClick }
          >
            {actionNames[action]}
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Auth;