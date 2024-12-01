import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import './Book.css'
import ElementoCalendar from '../../Components/ElementoCalendar';
import '../../Style/Style.css'
import { useNavigate } from 'react-router-dom';



const Book = () => {
  const navigate = useNavigate(); 
  const location = useLocation();  // Hook para obtener el estado enviado
  const {  id, imgSrc, guests_number, date_in, date_out, price, house_title, guest_username, guest_name, guest_lastname, guest_mail, guest_number } = location.state || {};  // Extraer datos del estado

  const fechaIni = new Date(date_in + 'T00:00:00Z');
  const fechaFin = new Date(date_out + 'T00:00:00Z');

  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Reserva de {house_title}</div>
        <div className='underline'></div>
      </div>
      <div className='infoizq-infodcha'>
        <div className='infoizq'>
          <img src={imgSrc} alt={`Imagen de ${house_title}`} className="book-foto" />
        </div>

        <div className='infodcha'>
          <div className='house-info'>
            <div className='house-infodcha-elem'><b>Fecha inicial:</b> {fechaIni.toLocaleDateString('es-ES')}</div>
            <div className='house-infodcha-elem'><b>Fecha final:</b> {fechaFin.toLocaleDateString('es-ES')}</div>
            <div className='house-infodcha-elem'><b>Precio total:</b> {price}€</div>
            <div className='house-infodcha-elem'><b>Número de huéspedes:</b> {guests_number}</div>
            <div className='house-infodcha-elem'><b>Nombre de usuario del huésped:</b> {guest_username}</div>
            <div className='house-infodcha-elem'><b>Primer nombre del huésped:</b> {guest_name}</div>
            <div className='house-infodcha-elem'><b>Apellidos del huésped:</b> {guest_lastname}</div>
            <div className='house-infodcha-elem'><b>Correo del huésped:</b> {guest_mail}</div>
            <div className='house-infodcha-elem'><b>Teléfono del huésped:</b> +34{guest_number}</div>
          </div>
        </div>
      </div>
      <div className="accept">
        <div className="accept-button" onClick={ () => { navigate(-1); }}>Aceptar</div>
      </div>
    </div>
  )
}

export default Book