import React, { useContext } from 'react'
import '../Style/Style.css'
import './Profile.css'
import profileImg from '../Images/sample-profile.jpg'
import InfoGenerica from '../Components/InfoGenerica'
import AuthContext from '../Context/AuthProvider'


const Profile = () => {

  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const { user_id } = auth;
  const { role } = auth;

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Mi perfil
          
        </div>
        <div className='underline'></div>
        <div className='infoizq-infodcha'>
          <div className='profile-infoizq'>
            <img src={profileImg} alt={`Imagen del perfil`} className="profile-foto" />
          </div>
          <div className='profile-infodcha'>
          <InfoGenerica
              campo={"Nombre"}
              texto={username}
            />
            <InfoGenerica
              campo={"Rol"}
              texto={role==="owner" ? "Propietario" : "Huésped"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile