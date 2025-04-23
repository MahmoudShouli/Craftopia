import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  SchedulesCard,
  SchedulesInnerWrapper,
  LeftSection,
  RightSection,
} from "./CrafterSchedulesPage.styled";

import BookingCalendar from "../../calendar/BookingCalendar";
import {
  getDisabledDates,
  disableDate,
  enableDate,
  getAppointmentsByEmail, // ✅ use existing endpoint
} from "../../../../api/appointmentService";
import { useUser } from "../../../../context/UserContext";

const CrafterSchedulesPage = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const [calendarBlockedDates, setCalendarBlockedDates] = useState([]);

  useEffect(() => {
    const loadBlockedDates = async () => {
      try {
        const disabled = await getDisabledDates(user.email);
        const appointments = await getAppointmentsByEmail(user.email, "crafter");

        const appointmentDates = appointments.map((a) => new Date(a.date));
        const disabledConverted = disabled.map((d) => new Date(d));

        const allBlocked = [...appointmentDates, ...disabledConverted];

        setDisabledDates(disabledConverted); // for toggle button
        setCalendarBlockedDates(allBlocked); // for calendar rendering
      } catch (err) {
        toast.error("Failed to load calendar data");
      }
    };

    if (user?.email) loadBlockedDates();
  }, [user]);

  const handleDisableToggle = async (date) => {
    const isDisabled = disabledDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

    try {
      if (isDisabled) {
        await enableDate(user.email, date.toISOString());
        toast.success(`Enabled ${date.toDateString()}`);
      } else {
        await disableDate(user.email, date.toISOString());
        toast.info(`Disabled ${date.toDateString()}`);
      }

      const disabled = await getDisabledDates(user.email);
      const appointments = await getAppointmentsByEmail(user.email, "crafter");

      const appointmentDates = appointments.map((a) => new Date(a.date));
      const disabledConverted = disabled.map((d) => new Date(d));
      const allBlocked = [...appointmentDates, ...disabledConverted];

      setDisabledDates(disabledConverted);
      setCalendarBlockedDates(allBlocked);
    } catch (err) {
      toast.error("Failed to update date");
    }
  };

  return (
    <SchedulesCard>
      <SchedulesInnerWrapper>
        <LeftSection>
          <BookingCalendar
            mode="crafter"
            onDateChange={setSelectedDate}
            onDisableDate={handleDisableToggle}
            disabledDates={calendarBlockedDates} // ✅ render both blocked + booked
          />
        </LeftSection>
        <RightSection>
          <h2>Your Appointments</h2>
          {/* Add Appointment Panel here later */}
        </RightSection>
      </SchedulesInnerWrapper>
    </SchedulesCard>
  );
};

export default CrafterSchedulesPage;
