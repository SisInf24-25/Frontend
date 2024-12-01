import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ElementoCalendar.css';

const ElementoCalendar = ({ onDateRangeChange, selectable, fechas }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateFechas, setDateFechas] = useState([]);

  useEffect(() => {
    // Convertir las fechas de string a Date solo una vez
    const dates = fechas.map(fecha => ({
      id: fecha.id,
      fechaIni: new Date(fecha.fechaIni[2], fecha.fechaIni[1] - 1, fecha.fechaIni[0]),
      fechaFin: new Date(fecha.fechaFin[2], fecha.fechaFin[1] - 1, fecha.fechaFin[0]),
    }));
    setDateFechas(dates);
  }, [fechas]);

  const calcularDiferenciaEnNoches = (fecha1, fecha2) => {
    const unDiaEnMilisegundos = 1000 * 60 * 60 * 24;
    const diferenciaEnMilisegundos = Math.abs(fecha2 - fecha1);
    return Math.floor(diferenciaEnMilisegundos / unDiaEnMilisegundos);
  };

  const handleDateChange = (range) => {
    console.log("range:", range);
    if (!selectable) return;

    const [fechaIni, fechaFin] = range;

    // Validar que la selección es al menos dos días
    if (calcularDiferenciaEnNoches(fechaIni, fechaFin) < 1) {
      setDateRange([null, null]);
      return;
    }

    // Validar que no se solape con fechas no disponibles
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
        const noches = calcularDiferenciaEnNoches(fechaIni, fechaFin);
        onDateRangeChange(range, noches); // Pasar fechas y número de noches
      }
    }
  };

  const isTileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return (selectable && date < today) || dateFechas.some(({ fechaIni, fechaFin }) => date >= fechaIni && date <= fechaFin);
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (dateFechas.some(({ fechaIni, fechaFin }) => date >= fechaIni && date <= fechaFin)) {
        return 'tile-no-disponible';
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectable && date < today) {
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
      {selectable && <h3>Seleccione un rango de fechas</h3>}
      <Calendar
        selectRange={true}
        onChange={handleDateChange}
        tileDisabled={isTileDisabled}
        tileClassName={tileClassName}
        value={dateRange}
      />
      {dateRange[0] && dateRange[1] && (
        <div>
          <p>Días seleccionados: <b>{dateRange[0].toLocaleDateString('es-ES')}</b> --- <b>{dateRange[1].toLocaleDateString('es-ES')}</b></p>
          <p id='calendar-diasnoches'>
            <b>{calcularDiferenciaEnNoches(dateRange[0], dateRange[1])}</b> {calcularDiferenciaEnNoches(dateRange[0], dateRange[1]) === 1 ? "noche" : "noches"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ElementoCalendar;
