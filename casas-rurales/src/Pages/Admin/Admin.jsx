import React from 'react'
import BotonIDGenerico from '../../Components/Botones/BotonIDGenerico'
import '../../Style/Style.css'
import './Admin.css'

const Panel = () => {
  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Admin Panel</div>
        <div className='underline'></div>
      </div>
      <div className='container'>
          <BotonIDGenerico className="admin-boton"
            nombre={'Usuarios'}
            direccion={`/panel/users`}
          />
          <BotonIDGenerico className="admin-boton"
            nombre={'Casas'}
            direccion={`/panel/houses`}
          />
          <BotonIDGenerico className="admin-boton"
            nombre={'Reportes'}
            direccion={`/panel/reports`}
          />
      </div>
    </div>
  )
}

export default Panel