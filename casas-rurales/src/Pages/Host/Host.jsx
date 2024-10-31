import React from 'react'
import BotonIDGenerico from '../../Components/BotonIDGenerico'
import '../../Style/Style.css'
import '../../Components/BotonIDGenerico.css'
import './Host.css'

const Host = () => {
  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Perfil de Host</div>
        <div className='underline'></div>
      </div>
      <div className='container'>
          <BotonIDGenerico className="host-boton"
            nombre={'Gestionar mis casas'}
            id={1} // id del Host
            direccion={`/houses`}
          />
          <BotonIDGenerico className="host-boton"
            nombre={'Ver mis reservas'}
            id={1} // id del Host
            direccion={`/books`}
          />
          <BotonIDGenerico className="host-boton"
          nombre={'Notificaciones'}
          id={1} // id del Host
          direccion={`/notifs`}
          />
          <BotonIDGenerico className="host-boton"
          nombre={'Editar mi perfil'}
          id={1} // id del Host
          direccion={`/profile`}
          />
      </div>
    </div>
  )
}

export default Host