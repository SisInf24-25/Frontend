import React, { useState, useEffect } from 'react'
import ElementoReserva from '../../Components/ElementoReserva'
import casaImg from '../../Images/sample-house.jpg';
import '../../Style/Style.css'
import axios from 'axios';
import BotonAtras from '../../Components/Botones/BotonVolver';


const BookList = () => {

  const [books, setBooks] = useState([]);

  const peticionReservas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books/ownerBooks', 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        // Procesar datos aquí si es necesario
        console.log("Datos recibidos:", response.data.books);
        setBooks(response.data.books);
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
        console.log(`Error al recibir reservas: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    peticionReservas();
  }, []);

  return (
    <div className='container'>
      <div className='house-botonatras'>
        <BotonAtras direccion={"/host"}/>
      </div>
      <div className='title'>
        <div className='text'>Mis reservas</div>
        <div className='underline'></div>
        {books.map((elemento, i) => (
            <ElementoReserva
              key={i}
              id={elemento.id}
              imgSrc={casaImg}
              guests_number={elemento.guests_number}
              date_in={elemento.date_in}
              date_out={elemento.date_out}
              price={elemento.price}
              house_title={elemento.house_title}
              guest_username={elemento.guest_username} 
              guest_name={elemento.guest_name}
              guest_lastname={elemento.guest_lastname} 
              guest_mail={elemento.guest_mail} 
              guest_number={elemento.guest_number}
            />
          ))}
      </div>
    </div>
  )
}

export default BookList