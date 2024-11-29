import React, { useState, useEffect, useContext } from 'react'
import ElementoCasa from '../../Components/ElementoCasa'
import casaImg from '../../Images/sample-house.jpg';
import '../../Style/Style.css'
import './HouseList.css'
import BotonIDGenerico from '../../Components/Botones/BotonIDGenerico';
import axios from 'axios';
import AuthContext from '../../Context/AuthProvider'

const HouseList = () => {

  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const { user_id } = auth;
  const { role } = auth;

  // Ejemplo de lista de casas con nombre y número
  const [casas, setCasas] = useState([]);

  const peticionCasas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/houses/myHouses', 
        {
          withCredentials: true
        }
      );

      if (response.status === 200) {
        // Procesar datos aquí si es necesario
        console.log("Datos recibidos:", response.data.houses);
        setCasas(response.data.houses);
      }
    } catch (error) {
      console.log("CATCH ERROR")
      // Check if `error.response` is defined before accessing `data`
      if (error.response) {
        // Handle the case where response exists
        console.log(error.response);
        console.log(error.response.data?.error || 'Error desconocido');
      } else if (error.request) {
        // Handle the case where the request was made but no response was received
        console.log('No se recibió respuesta del servidor');
      } else {
        // Handle other errors such as setting up the request
        console.log(`Error al intentar iniciar sesión: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    peticionCasas();
  }, []);

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Lista de Casas</div>
        <div className='underline'></div>
          {/* Mapea la lista de casas y usa el componente ElementoCasa */}
          {casas.map((casa, i) => (
            <ElementoCasa
              key={i}
              id={casa.id}
              imgSrc={casaImg}
              title={casa.title} 
              owner_id={casa.owner_id}
              price={casa.price}
              n_wc={casa.n_wc}
              n_rooms={casa.n_rooms}
              n_single_beds={casa.n_single_beds}
              n_double_beds={casa.n_double_beds}
              max_guests={casa.max_guests}
              city={casa.city}
              address={casa.address}
              lat={casa.lat}
              long={casa.long}
              conditions={casa.conditions}
              description={casa.description}
              is_public={casa.public}
              is_active={casa.active}
              owner_username={username}
              reservations={casa.reservations}
              host={true}
              fechaIni={[]}
              fechaFin={[]}
            />
          ))}
      </div>
      <div className='houselist-botonanadir'>
        <BotonIDGenerico 
          nombre={'Añadir casa'}
          idUser={1}
          idArg={null}
          direccion={`/houses/add`}
        />
      </div>
    </div>
  )
}

export default HouseList