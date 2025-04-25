import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  SchedulesCard,
  SchedulesInnerWrapper,
  LeftSection,
  RightSection,
} from "./CrafterSchedulesPage.styled";

import BookingCalendar from "../../calendar/BookingCalendar";
import AppointmentItem from "../AppointmentItem"; 
import {
  createAppointment,
  getDisabledDates,
  getAppointmentsByEmail,
} from "../../../../api/appointmentService";
import { useUser } from "../../../../context/UserContext";

const CrafterSchedulesPage = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const [calendarBlockedDates, setCalendarBlockedDates] = useState([]);
  const [appointments, setAppointments] = useState([]); // ✅ new state

  const loadCalendarData = async () => {
    try {
      const disabled = await getDisabledDates(user.email);
      const appts = await getAppointmentsByEmail(user.email, "crafter");

      const appointmentDates = appts.map((a) => new Date(a.date));
      const disabledConverted = disabled.map((d) => new Date(d));
      const allBlocked = [...appointmentDates, ...disabledConverted];

      setDisabledDates(disabledConverted);
      setCalendarBlockedDates(allBlocked);
      setAppointments(appts); // ✅ update appointments
    } catch (err) {
      toast.error("Failed to load calendar data");
    }
  };

  useEffect(() => {
    if (user?.email) loadCalendarData();
  }, [user]);

  const handleDisableToggle = async (date) => {
    const isDisabled = disabledDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

    if (isDisabled) {
      toast.info(`${date.toDateString()} is already disabled.`);
      return;
    }

    try {
      await createAppointment({
        userEmail: "system",
        crafterEmail: user.email,
        date: date.toISOString(),
      });
      toast.success(`Disabled ${date.toDateString()}`);
      await loadCalendarData(); // ✅ reload everything
    } catch (err) {
      toast.error("Failed to disable date");
    }
  };

  const handleDeleteAppointment = async (id) => {
    // remove from local list after delete
    setAppointments((prev) => prev.filter((a) => a._id !== id));
    await loadCalendarData(); // ✅ refresh calendar state too
  };

  return (
    <SchedulesCard>
      <SchedulesInnerWrapper>
        <LeftSection>
          <BookingCalendar
            mode="crafter"
            onDateChange={setSelectedDate}
            onDisableDate={handleDisableToggle}
            disabledDates={calendarBlockedDates}
          />
        </LeftSection>
        <RightSection>
          <h2>Your Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            appointments.map((a) => (
              <AppointmentItem
                key={a._id}
                id={a._id}
                date={a.date}
                status={a.status}
                onDelete={handleDeleteAppointment}
                showBookedByName={true}
                bookedByName={a.userName || a.userEmail}
                isCrafter={true} 
              />
            ))
          )}
        </RightSection>
      </SchedulesInnerWrapper>
    </SchedulesCard>
  );
};

export default CrafterSchedulesPage;
