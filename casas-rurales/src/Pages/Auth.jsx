import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../Style/Style.css'


const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const initialAction = queryParams.get('action') || 'login';

  const [action, setAction] = useState(initialAction);
  const [userType, setUserType] = useState("guest");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  
  const notify = () => toast.error("Las contraseñas deben coincidir", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });



  const handleAcceptButtonClick = () => {
    if (action === "login") {
      handleLoginAcceptButtonClick()
    } /*signup*/else if (passwordError) {
      notify()
    } else {
      handleSignupAcceptButtonClick()
    }
  };

  const handleLoginAcceptButtonClick = () => {
    // TODO: CAMBIARLO POR LA PETICIÓN
    console.log("login")
  };

  const handleSignupAcceptButtonClick = () => {
    // TODO: CAMBIARLO POR LA PETICIÓN
    console.log("signup - ", userType)
  };



  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Validar que las contraseñas coincidan
    if (value !== password) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }
  };
  

  useEffect(() => {
    const newAction = queryParams.get('action') || 'login';
    setAction(newAction);
  }, [location.search]);

  const handleActionChange = (newAction) => {
    setAction(newAction);
    navigate(`/auth?action=${newAction}`);
  };

  const actionNames = {
    "login": "Iniciar sesión",
    "signup": "Registrarse"
  }

  return (
    <div className="container">
      <div className="title">
        <div className="text">{actionNames[action]}</div>
        <div className="underline"></div>
      </div>

      <div className="submit-container">
        <div className={ action === "login" ? "submit" : "submit gray" } onClick={ ()=>{ handleActionChange("login") } }>{actionNames["login"]}</div>
        <div className={ action === "signup" ? "submit" : "submit gray" } onClick={ ()=>{ handleActionChange("signup") } }>{actionNames["signup"]}</div>
      </div>
        
      <div className="inputs">
        <div className="input">
          <input type="text" placeholder="Nombre de usuario" />
        </div>

        { action === "login" ? <div></div>:<div className="input">
          <input type="text" placeholder="Nombre"/>
        </div> }

        { action === "login" ? <div></div>:<div className="input">
          <input type="text" placeholder="Apellidos"/>
        </div> }

        { action === "login" ? <div></div>:<div className="input">
          <input type="email" placeholder="Correo electrónico"/>
        </div> }

        { action === "login" ? <div></div>:<div className="input">
          <input type="tel" placeholder="Número de teléfono"/>
        </div> }

        <div className="input">
          <input type="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange}/>
        </div>

        { action === "login" ? <div></div>:<div className="input">
          <input type="password" placeholder="Repetir contraseña" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
        </div> }

        {passwordError && <p id="mensaje-error-contraseñas" style={{ color: 'red' }}>{passwordError}</p>} {/* Mostrar mensaje de error si las contraseñas no coinciden */}
        

        { action === "login" ? <div></div>:<div className="user-type-container">
            <div className={ userType === "guest" ? "user-type" : "user-type gray" } onClick={ () => { setUserType("guest") } }>Huésped</div>
            <div className={ userType === "owner" ? "user-type" : "user-type gray" } onClick={ () => { setUserType("owner") } }>Propietario</div>
        </div> }

        <div className="accept">
          <div id="auth" className="accept-button" onClick={ () => { handleAcceptButtonClick() }}>{actionNames[action]}</div>
        </div>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Auth