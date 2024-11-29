import React, { useState } from 'react'
import ElementoAdminUsuario from '../../Components/ElementoAdminUsuario'
import profileImg from '../../Images/sample-profile.jpg'
import '../../Style/Style.css'

const AdminUsers = () => {
  // Lista de elementos con nombre y número
  const [elementos, setElementos] = useState([
    { id: 1, imgSrc: profileImg, nombre: 'Juan', edad: 18 },
    { id: 2, imgSrc: profileImg, nombre: 'David', edad: 25 },
    { id: 3, imgSrc: profileImg, nombre: 'José', edad: 40 },
  ]);

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Usuarios</div>
        <div className='underline'></div>
        {elementos.map((elemento, i) => (
            <ElementoAdminUsuario
              key={i}
              id={elemento.id}
              imgSrc={elemento.imgSrc}
              nombre={elemento.nombre}
              edad={elemento.edad}
            />
          ))}
      </div>
    </div>
  )
}

export default AdminUsers