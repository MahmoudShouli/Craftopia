import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { CalendarWrapper } from "./BookingCalendar.styled";

const BookingCalendar = ({
  mode = "customer",
  onConfirm,
  onDisableDate,
  onDateChange,
  disabledDates = [],
}) => {
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", width: "100%" }}>
      <CalendarWrapper>
        <Calendar
          date={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          disabledDates={disabledDates} // ✅ key prop here
          months={1}
          direction="horizontal"
          className="booking-calendar"
        />
      </CalendarWrapper>

      {selectedDate && (
        <>
          {mode === "crafter" && !isDisabled(selectedDate) && (
            <button
              onClick={() => onDisableDate?.(selectedDate)}
              style={disableBtnStyle}
            >
              Disable {selectedDate.toDateString()}
            </button>
          )}

          {mode === "customer" && !isDisabled(selectedDate) && (
            <button
              onClick={() => onConfirm?.(selectedDate)}
              style={confirmBtnStyle}
            >
              Confirm Booking for {selectedDate.toDateString()}
            </button>
          )}
        </>
      )}
    </div>
  );
};

const disableBtnStyle = {
  marginTop: "10rem",
  padding: "12px 24px",
  borderRadius: "10px",
  backgroundColor: "#b30000",
  color: "#fff",
  fontWeight: "600",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
};

const confirmBtnStyle = {
  marginTop: "10rem",
  padding: "12px 24px",
  borderRadius: "10px",
  backgroundColor: "#6a380f",
  color: "#fff",
  fontWeight: "600",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
};

export default BookingCalendar;
