import React, { useState, useEffect } from 'react'
import icon_user from '../Assets/person.png'
import icon_password from '../Assets/password.png'
import icon_email from '../Assets/email.png'
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

  
  const notify = () => toast.error("ERROR MESSAGE!!!", {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
  

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
          <img src={icon_user} alt="User" />
          <input type="text" placeholder="Nombre de usuario" />
        </div>

        { action === "login" ? <div></div>:<div className="input">
          <img src={icon_email} alt="Email" />
          <input type="text" placeholder="Correo Electrónico" />
        </div> }

        <div className="input">
          <img src={icon_password} alt="Password" />
          <input type="password" placeholder="Contraseña" />
        </div>

        { action === "login" ? <div></div>:<div className="user-type-container">
            <div className={ userType === "guest" ? "user-type" : "user-type gray" } onClick={ () => { setUserType("guest") } }>Huésped</div>
            <div className={ userType === "owner" ? "user-type" : "user-type gray" } onClick={ () => { setUserType("owner") } }>Propietario</div>
        </div> }

        <div className="accept">
          <div id="auth" className="accept-button" onClick={ () => { console.log(`${action} - ${userType}`); notify() }}>{actionNames[action]}</div>
        </div>
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Auth