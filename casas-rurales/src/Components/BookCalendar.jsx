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
    const [fechaIni, fechaFin] = range;
    const hasUnavailableRange = dateFechas.some(({ fechaIni: rangeStart, fechaFin: rangeEnd }) => 
      (fechaIni >= rangeStart && fechaIni <= rangeEnd) || 
      (fechaFin >= rangeStart && fechaFin <= rangeEnd) || 
      (fechaIni <= rangeStart && fechaFin >= rangeEnd)
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
      return dateFechas.some(({ fechaIni, fechaFin }) => date >= fechaIni && date <= fechaFin);
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (dateFechas.some(({ fechaIni, fechaFin }) => date >= fechaIni && date <= fechaFin)) {
        return 'tile-no-disponible';
      }

      if (dateRange[0] && dateRange[1]) {
        const [fechaIni, fechaFin] = dateRange;

        if (date.toDateString() === fechaIni.toDateString()) {
          return 'highlight-start';
        }
        if (date.toDateString() === fechaFin.toDateString()) {
          return 'highlight-end';
        }
        if (date > fechaIni && date < fechaFin) {
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
                    <p>Días seleccionados: <b>{dateRange[0].toLocaleDateString('es-ES')}</b> --- <b>{dateRange[1].toLocaleDateString('es-ES')}</b></p>
      )}
    </div>
  );
};

export default BookCalendar;
