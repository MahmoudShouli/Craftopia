import React from "react";
import { MiddleSection } from "./SchedulesPage.styled";
import BookingCalendar from "../calendar/BookingCalendar";

const BookingSection = ({ selectedDate, setSelectedDate, onConfirm, disabledDates }) => (
  <MiddleSection>
    <BookingCalendar
      onDateChange={(date) => {
        setSelectedDate(date);
      }}
      onConfirm={() => {
        if (selectedDate) onConfirm(selectedDate);
      }}
      disabledDates={disabledDates}
    />
  </MiddleSection>
);

export default BookingSection;
