import React, { useState, useEffect } from 'react'
import './Auth.css'
import icon_user from '../Assets/person.png'
import icon_password from '../Assets/password.png'
import icon_email from '../Assets/email.png'
import { useLocation } from 'react-router-dom'

const Auth = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialAction = queryParams.get('action') || 'login';

  const [action, setAction] = useState(initialAction);
  const [userType, setUserType] = useState("guest");

  useEffect(() => {
    const newAction = queryParams.get('action') || 'login';
    setAction(newAction);
  }, [location.search]);

  const actionNames = {
    "login": "Iniciar sesión",
    "signup": "Registrarse"
  }

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>{actionNames[action]}</div>
        <div className='underline'></div>
      </div>

      <div className="submit-container">
          <div className={ action === "login" ? "submit" : "submit gray" } onClick={ ()=>{ setAction("login") } }>Iniciar Sesión</div>
          <div className={ action === "signup" ? "submit" : "submit gray" } onClick={ ()=>{ setAction("signup") } }>Registrarse</div>
        </div>
        
      <div className="inputs">
        <div className="input">
          <img src={icon_user} alt="" />
          <input type="text" placeholder="Nombre de usuario" />
        </div>

        { action === "login" ? <div></div>:<div className="input">
          <img src={icon_email} alt="" />
          <input type="text" placeholder="Correo Electrónico" />
        </div> }

        <div className="input">
          <img src={icon_password} alt="" />
          <input type="password" placeholder="Contraseña" />
        </div>

        { action === "login" ? <div></div>:<div className="user-type-container">
            <div className={ userType === "guest" ? "user-type" : "user-type gray" } onClick={ ()=>{ setUserType("guest") } }>Huésped</div>
            <div className={ userType === "owner" ? "user-type" : "user-type gray" } onClick={ ()=>{ setUserType("owner") } }>Propietario</div>
        </div> }
      </div>
    </div>
  )
}

export default Auth