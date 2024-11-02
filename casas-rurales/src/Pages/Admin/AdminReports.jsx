import React, { useState } from 'react'
import ElementoAdminReporte from '../../Components/ElementoAdminReporte'
import '../../Style/Style.css'

const AdminReports = () => {

  // Ejemplo de lista de elementos con nombre y número
  const [elementos, setElementos] = useState([
    { id: 1, titulo: 'Ofensivo', texto: 'texto de ejemplo', user: 'Juan' },
    { id: 1, titulo: 'Plagio', texto: 'texto de ejemplo', user: 'Juan' },
    { id: 1, titulo: 'Ofensivo', texto: 'texto de ejemplo', user: 'Juan' },
    { id: 1, titulo: 'Plagio', texto: 'texto de ejemplo', user: 'Juan' },
    { id: 1, titulo: 'Ofensivo', texto: 'texto de ejemplo', user: 'Juan' }
  ]);

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Reportes</div>
        <div className='underline'></div>
          {/* Mapea la lista de elementos y usa el componente ElementoCasa */}
          {elementos.map((elemento, i) => (
            <ElementoAdminReporte
              key={i}
              id={elemento.id}
              titulo={elemento.titulo}
              texto={elemento.texto}
              user={elemento.user}
            />
          ))}
      </div>
    </div>
  )
}

export default AdminReports