import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import {
  AppointmentCard,
  AppointmentDate,
  AppointmentStatus,
  AppointmentCrafter
} from "./SchedulesPage.styled";

const AppointmentItem = ({ date, status, crafterName }) => {
  return (
    <AppointmentCard>
      <FaCalendarAlt style={{ fontSize: "1.2rem", color: "white" }} />
      <div style={{ marginLeft: "0.75rem" }}>
        <AppointmentCrafter>{crafterName}</AppointmentCrafter>
        <AppointmentDate>{new Date(date).toDateString()}</AppointmentDate>
        <AppointmentStatus className={status.toLowerCase()}>
          {status}
        </AppointmentStatus>
      </div>
    </AppointmentCard>
  );
};

export default AppointmentItem;
