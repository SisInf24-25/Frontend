import React, { useState } from 'react'
import './Login.css'
import icon_user from '../Assets/person.png'
import icon_password from '../Assets/password.png'
import icon_email from '../Assets/email.png'

const LoginSignup = () => {

  const [action,setAction] = useState("Iniciar Sesión");





  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
      
        <div className="input">
            <img src={icon_user} alt="" />
            <input type="text" placeholder="Nombre de usuario"/>
        </div>

        {action==="Iniciar Sesión"?<div></div>:<div className="input">
            <img src={icon_email} alt="" />
            <input type="text" placeholder="Correo Electrónico"/>
        </div>}

        <div className="input">
            <img src={icon_password} alt="" />
            <input type="password" placeholder="Contraseña"/>
        </div>
        <div className="submit-container">
            <div className={action==="Iniciar Sesión"?"submit":"submit gray"}onClick={()=>{setAction("Iniciar Sesión")}}>Iniciar Sesión</div>
            <div className={action==="Registrarse"?"submit":"submit gray"}onClick={()=>{setAction("Registrarse")}}>Registrarse</div>
        </div>
      </div>
    </div>
    
  )
}

export default LoginSignup
