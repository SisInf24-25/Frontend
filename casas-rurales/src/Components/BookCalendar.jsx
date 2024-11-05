import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookCalendar.css';

const BookCalendar = ({ onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState([null, null]);

  const [availability, setAvailability] = useState([
    { start: new Date(2024, 10, 20), end: new Date(2024, 10, 25) },
    { start: new Date(2024, 11, 1), end: new Date(2024, 11, 10) }
  ]);

  const handleDateChange = (range) => {
    const [start, end] = range;

    const hasUnavailableRange = availability.some(({ start: rangeStart, end: rangeEnd }) => 
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
      return availability.some(({ start, end }) => date >= start && date <= end);
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (availability.some(({ start, end }) => date >= start && date <= end)) {
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
        <p>Rango seleccionado: {dateRange[0].toLocaleDateString()} - {dateRange[1].toLocaleDateString()}</p>
      )}
    </div>
  );
};

export default BookCalendar;
