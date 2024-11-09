import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookCalendar.css';

const BookCalendar = ({ onDateRangeChange, selectable, fechas }) => {

  const [dateRange, setDateRange] = useState([null, null]);
    // Convertir las fechas de string a Date solo una vez
  const [dateFechas, setDateFechas] = useState([]);

  useEffect(() => {
    // Convertir las fechas de string a Date solo una vez
    const dates = fechas.map(fecha => ({
      id: fecha.id,
      fechaIni: new Date(fecha.fechaIni[2], fecha.fechaIni[1] - 1, fecha.fechaIni[0]), // Ajustar formato
      fechaFin: new Date(fecha.fechaFin[2], fecha.fechaFin[1] - 1, fecha.fechaFin[0]) // Ajustar formato
    }));
    console.log(dates);
    setDateFechas(dates);
  }, [fechas]); // Solo ejecuta cuando `fechas` cambie

  const handleDateChange = (range) => {
    if (!selectable) return;
    const [start, end] = range;
    const hasUnavailableRange = dateFechas.some(({ fechaIni: rangeStart, fechaFin: rangeEnd }) => 
      (start >= rangeStart && start <= rangeEnd) || 
      (end >= rangeStart && end <= rangeEnd) || 
      (start <= rangeStart && end >= rangeEnd)
    );

    if (hasUnavailableRange) {
      setDateRange([null, null]); 
    } else {
      setDateRange(range);
      if (onDateRangeChange) {
        onDateRangeChange(range); 
      }
    }
  };

  const isTileDisabled = ({ date, view }) => {
    if (view === 'month') {
      return dateFechas.some(({ start, end }) => date >= start && date <= end);
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (dateFechas.some(({ start, end }) => date >= start && date <= end)) {
        return 'tile-no-disponible';
      }

      if (dateRange[0] && dateRange[1]) {
        const [start, end] = dateRange;

        if (date.toDateString() === start.toDateString()) {
          return 'highlight-start';
        }
        if (date.toDateString() === end.toDateString()) {
          return 'highlight-end';
        }
        if (date > start && date < end) {
          return 'highlight-middle';
        }
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
                    <p>Rango seleccionado: {dateRange[0].toLocaleDateString('es-ES')} - {dateRange[1].toLocaleDateString('es-ES')}</p>
      )}
    </div>
  );
};

export default BookCalendar;
