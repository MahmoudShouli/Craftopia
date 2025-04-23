import React, { useState, useEffect } from "react";
import { CrafterSchedulesWrapper, LeftColumn, RightColumn } from "./CrafterSchedulesPage.styled";
import BookingCalendar from "../../calendar/BookingCalendar";
import AppointmentsPanel from "../AppointmentsPanel";
import axios from "axios";
import { useUser } from "../../../../context/UserContext";
import { toast } from "react-toastify";

const CrafterSchedulesPage = () => {
  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchAppointments = async () => {
    
  };

  useEffect(() => {
    if (user?.email) {
      
    }
  }, [user]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    toast.success(`Selected: ${selectedDate.toDateString()}`);
  };

  const handleDeleteLocal = (id) => {
    setAppointments((prev) => prev.filter((a) => a._id !== id));
  };

  return (
    <CrafterSchedulesWrapper>
      <LeftColumn>
        <BookingCalendar
          onDateChange={handleDateChange}
          onConfirm={handleConfirm}
        />
      </LeftColumn>

      <RightColumn>
        <AppointmentsPanel appointments={appointments} onDelete={handleDeleteLocal} />
      </RightColumn>
    </CrafterSchedulesWrapper>
  );
};

export default CrafterSchedulesPage;
