import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import '../Style/Style.css';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialAction = queryParams.get('action') || 'login';

  // Tipos
  const GUEST_TYPE = 1;
  const OWNER_TYPE = 2;

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
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  // Actualiza la acción cuando cambia la URL
  useEffect(() => {
    const newAction = queryParams.get('action') || 'login';
    setAction(newAction);
  }, [location.search]);

  // Notificación de error
  const notify = (message) => toast.error(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  // Manejo de cambio de inputs
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Validación de contraseñas
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  // Lógica de login
  const peticionLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/login', {
        username: username,
        password: password
      });
      console.log('Login exitoso:', response.data);
      setLoginError(null);
    } catch (error) {
      if (error.response) {
        // Maneja errores específicos
        const status = error.response.status;
        switch (status) {
          case 404:
            setLoginError('Usuario no encontrado.');
            break;
          case 401:
            setLoginError('Contraseña incorrecta.');
            break;
          case 500:
            setLoginError('Hubo un problema en el servidor.');
            break;
          default:
            setLoginError(`Error ${status}: ${error.response.statusText}`);
        }
      } else if (error.request) {
        setLoginError('No se recibió respuesta del servidor. Verifica tu conexión.');
      } else {
        setLoginError(`Error en la solicitud: ${error.message}`);
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
      console.log('Registro exitoso:', response.data);
      setSignupError(null);
    } catch (error) {
      if (error.response) {
        // Maneja errores específicos
        const status = error.response.status;
        switch (status) {
          case 404:
            setLoginError('Usuario no encontrado.');
            break;
          case 401:
            setLoginError('Contraseña incorrecta.');
            break;
          case 500:
            setLoginError('Hubo un problema en el servidor.');
            break;
          default:
            setLoginError(`Error ${status}: ${error.response.statusText}`);
        }
      } else if (error.request) {
        setLoginError('No se recibió respuesta del servidor. Verifica tu conexión.');
      } else {
        setLoginError(`Error en la solicitud: ${error.message}`);
      }
    }
  };

  // Manejo del botón de aceptar
  const handleAcceptButtonClick = () => {
    if (action === 'login') {
      peticionLogin();
    } else if (passwordError) {
      notify('Las contraseñas deben coincidir');
    } else {
      peticionSignup();
    }
  };

  // Cambio de acción
  const handleActionChange = (newAction) => {
    setAction(newAction);
    navigate(`/auth?action=${newAction}`);
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
            onClick={handleAcceptButtonClick}
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