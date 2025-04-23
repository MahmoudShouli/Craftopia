
import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { CalendarWrapper  } from "./BookingCalendar.styled";

const BookingCalendar = ({ onConfirm, onDateChange, disabledDates = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange?.(date);
  };

  const isDisabled = (date) =>
    disabledDates.some(
      (d) => new Date(d).toDateString() === date.toDateString()
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CalendarWrapper>
        <Calendar
            date={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            disabledDates={disabledDates}
            months={1}
            direction="horizontal"
            className="booking-calendar"
        />
    </CalendarWrapper>  

      {selectedDate && !isDisabled(selectedDate) && (
        <button
          onClick={onConfirm}
          style={{
            marginTop: "10rem",
            padding: "12px 24px",
            borderRadius: "10px",
            backgroundColor: "#6a380f",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Confirm Booking for {selectedDate.toDateString()}
        </button>
      )}
    </div>
  );
};

export default BookingCalendar;
