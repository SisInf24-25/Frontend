import React from 'react'
import '../../Style/Style.css'
import './AdminUser.css'
import profileImg from '../../Images/sample-profile.jpg'
import InfoGenerica from '../../Components/InfoGenerica'

const AdminUser = () => {
  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Perfil de Manu</div>
        <div className='underline'></div>
        <div className='infoizq-infodcha'>
          <div className='profile-infoizq'>
            <img src={profileImg} alt={`Imagen del perfil`} className="profile-foto" />
          </div>
          <div className='profile-infodcha'>
          <InfoGenerica
              campo={"Nombre"}
              texto={"Manu"}
            />
            <InfoGenerica
              campo={"Edad"}
              texto={"21"}
            />
            <InfoGenerica
              campo={"Email"}
              texto={"839304@unizar.es"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUser