import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookCalendar.css';

const BookCalendar = ({ onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [availability, setAvailability] = useState({
    '2024-11-28': 'ocupado',
    '2024-12-05': 'ocupado',
  });

  // Maneja la selección de rango de fechas
  const handleDateChange = (range) => {
    const [start, end] = range;

    // Genera una lista de fechas entre `start` y `end`
    const selectedDates = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
      const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

      selectedDates.push(dateStr);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Verifica si alguna de las fechas en `selectedDates` está ocupada
    const hasUnavailableDate = selectedDates.some(
      (date) => availability[date] === 'ocupado'
    );

    if (hasUnavailableDate) {
      setDateRange([null, null]); // Resetea la selección
    } else {
      setDateRange(range); // Guarda el rango si es válido
      if (onDateRangeChange) {
        onDateRangeChange(range); // Llama a la función de la página para pasar el rango
      }
    }
  };

  const isTileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return availability[dateStr] === 'ocupado';
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      if (date >= start && date <= end) {
        return 'highlight-range';
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h3>Seleccione un rango de fechas</h3>
      <Calendar
        selectRange={true}
        onChange={handleDateChange}
        tileDisabled={isTileDisabled}
        tileClassName={tileClassName}
        value={dateRange}
      />
      {dateRange[0] && dateRange[1] && (
        <p>Rango seleccionado: {dateRange[0].toLocaleDateString()} - {dateRange[1].toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default BookCalendar;
