import React from 'react';
import '../Style/Style.css';

const Report = () => {
  return (
    <div className='container'>
      <div className='title'>
        <div className='text'>Report</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <input
            type='text'
            placeholder='Motivo del reporte...'
          />
        </div>
        <div className='genericinput'>
          <textarea
            placeholder='Justificación...'
            rows='6'
            style={{ width: '400px', resize: 'none', border: 'none', padding: '10px', outline: 'none', background: 'transparent' }}
          />
        </div>
      </div>
      <div className='submit-container'>
        <button className='submit'>Enviar Reporte</button>
      </div>
    </div>
  );
};

export default Report;