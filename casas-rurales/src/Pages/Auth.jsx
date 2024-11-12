import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useSession } from '../Context/SessionContext'; // Importa el hook de sesión
import 'react-toastify/dist/ReactToastify.css';
import '../Style/Style.css';

const Auth = () => {
  const { setSession, clearSession } = useSession(); // Accede al contexto de sesión
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

  // Si la acción es logout, eliminar la cookie y redirigir
  useEffect(() => {
    if (action === 'logout') {
      clearSession(); // Limpia la sesión desde el contexto
      navigate('/');  // Redirige a la página de inicio
    }
  }, [action, navigate, clearSession]);

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

  // Notificación de error
  const notify = (message) => toast.error(message, {
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
      const response = await axios.post('http://localhost:8000/users/login', {
        username: username,
        password: password
      });

      const { user_id, username: userUsername, role } = response.data['user'];

      // Guardamos la sesión en el contexto
      setSession({ user_id, username: userUsername, role });

      if (response.status === 200) {
        switch (userType) {
          case GUEST_TYPE:
            navigate('/');
            break;
          case OWNER_TYPE:
            navigate('/host');
            break;
        }
      }
    } catch (error) {
      notify(error.response.data['error'])
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

      const { user_id, username: userUsername, role } = response.data['user'];

      // Guardamos la sesión en el contexto
      setSession({ user_id, username: userUsername, role });

      if (response.status === 200) {
        switch (userType) {
          case GUEST_TYPE:
            navigate('/');
            break;
          case OWNER_TYPE:
            navigate('/host');
            break;
        }
      }
    } catch (error) {
      notify(error.response.data['error'])
    }
  };

  // Manejo del botón de aceptar
  const handleAcceptButtonClick = () => {
    if (!username) {
      notify('Nombre de usuario inválido')
      return;
    }

    if (username.length > 20) {
      notify('Nombre de usuario demasiado largo')
      return;
    }

    if (action === 'login') {
      peticionLogin();
    }
    else if (action === 'signup') {
      if (!name) {
        notify('Nombre inválido')
        return;
      }

      if (name.length > 25) {
        notify('Nombre demasiado largo')
        return;
      }

      if (!lastname) {
        notify('Apellidos inválidos')
        return;
      }

      if (lastname.length > 25) {
        notify('Apellidos demasiado largos')
        return;
      }

      if (!email) {
        notify('Correo electrónico inválido')
        return;
      }

      if (email.length > 50) {
        notify('Correo electrónico demasiado largo')
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        notify('Nombre de usuario solo puede contener caracteres alfanuméricos y guión bajo (_)')
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        notify('Formato de correo electrónico no válido')
        return;
      }

      if (password !== confirmPassword) {
        notify('Contraseñas no coinciden')
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