import React from 'react'
import './Login.css'
import icon_user from '../Assets/person.png'
import icon_password from '../Assets/password.png'

const LoginSignup = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Iniciar Sesión</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>

        <div className="input">
            <img src={icon_user} alt="" />
            <input type="text" placeholder="Nombre de usuario"/>
        </div>

        <div className="input">
            <img src={icon_password} alt="" />
            <input type="password" placeholder="Contraseña"/>
        </div>
        <div className="submit-container">
            <div className="submit">Iniciar Sesión</div>
            <div className="submit">Registrarse</div>
        </div>
      </div>
    </div>
    
  )
}

export default LoginSignup
