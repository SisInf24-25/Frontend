import React from 'react';
import './ElementoReserva.css'
import { useNavigate } from 'react-router-dom';

const ElementoReserva = ({ id, imgSrc, guests_number, date_in, date_out, price, house_title, guest_username, guest_name, guest_lastname, guest_mail, guest_number }) => {
  const navigate = useNavigate(); 

  const fechaIni = new Date(date_in);
  const fechaFin = new Date(date_out);

    
  // Función para manejar el click en el nombre
  const handleReservaClick = () => {
    navigate(`/books/element?id=${id}`, {
      state: { id, imgSrc, guests_number, date_in, date_out, price, house_title, guest_username, guest_name, guest_lastname, guest_mail, guest_number }  // Pasamos el objeto como estado
    });
  };

  return (
    <div className='elementoreserva-container' onClick={() => handleReservaClick()}>
      <div className='elementoreserva-content'>
        <div className='elementoreserva-foto'>
          <img src={imgSrc} alt={`Imagen de ${house_title}`} className='casa-img' />
        </div>
        <div className='elementoreserva-nombre'>
          <h2>{house_title}</h2>
        </div>
        <div className='elementoreserva-numero'>
          <p><b>Fecha inicial:</b> {fechaIni.toLocaleDateString('es-ES')}</p>
          <p><b>Fecha final:</b> {fechaFin.toLocaleDateString('es-ES')}</p>
          <p><b>Huésped:</b> {guest_username}</p>
          <p><b>Número de huéspedes:</b> {guests_number}</p>
        </div>
      </div>
    </div>
  );
};

export default ElementoReserva;
