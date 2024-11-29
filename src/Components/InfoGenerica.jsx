import React from 'react';
import './InfoGenerica.css'

const InfoGenerica = ({ campo, texto }) => {

  return (
    <div className='infogenerica-container'>
      <div className='infogenerica-content'>
        <div className='infogenerica-texto'>
          <p><b>{campo}:</b></p>
          <p><div className='infogenerica-textodcha'>{texto}</div></p>
        </div>
      </div>
    </div>
  );
};

export default InfoGenerica;
