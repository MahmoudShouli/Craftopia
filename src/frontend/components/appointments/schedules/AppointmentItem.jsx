import React from "react";
import {
  AppointmentCard,
  CancelIcon,
  AppointmentDate,
  AppointmentCrafter,
  AppointmentStatusWrapper,
} from "./SchedulesPage.styled";
import { FaTimes } from "react-icons/fa";
import { deleteAppointment } from "../../../api/appointmentService";
import { toast } from "react-toastify";

const AppointmentItem = ({ date, status, crafterName, id, onDelete }) => {
  const handleCancel = async () => {
    try {
      const res = await deleteAppointment(id);
      if (res.success) {
        toast.success("Appointment canceled");
        onDelete?.(id); // trigger removal from local list
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Cannot cancel appointment.");
    }
  };

  return (
    <AppointmentCard>
      <CancelIcon onClick={handleCancel} title="Cancel appointment">
        <FaTimes />
      </CancelIcon>

      <AppointmentDate>
        {new Date(date).toLocaleDateString()}
      </AppointmentDate>

      <AppointmentStatusWrapper status={status}>
        Status: <span>{status}</span>
      </AppointmentStatusWrapper>

      <AppointmentCrafter>
        Crafter: {crafterName}
      </AppointmentCrafter>
    </AppointmentCard>
  );
};

export default AppointmentItem;
