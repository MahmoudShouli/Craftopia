import React from "react";
import {
  AppointmentCard,
  CancelIcon,
  CompleteIcon,
  AppointmentDate,
  AppointmentCrafter,
  AppointmentStatusWrapper,
  ActionIconsWrapper,
  ActionIcon,
} from "./SchedulesPage.styled";
import {
  FaTimes,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
import { deleteAppointment, updateAppointmentStatus } from "../../../api/appointmentService";
import { toast } from "react-toastify";
import ReviewBox from "../../reviewbox/ReviewBox";

const AppointmentItem = ({
  id,
  date,
  status,
  crafterName,
  crafterEmail,
  userEmail,
  onDelete,
  showBookedByName = false,
  bookedByName = "",
  isCrafter = false,
}) => {
  const handleCancel = async () => {
    try {
      const res = await deleteAppointment(id);
      if (res.success) {
        toast.success("Appointment canceled");
        onDelete?.(id);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Cannot cancel appointment.");
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const res = await updateAppointmentStatus(id, newStatus);
      if (res.success) {
        toast.success(`Marked as ${newStatus}`);
        onDelete?.(id);
      }
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <AppointmentCard>
      <ActionIconsWrapper>
        {isCrafter && (
          <>
            {status === "pending" && (
              <ActionIcon title="Confirm" onClick={() => handleUpdateStatus("confirmed")}>
                <FaClipboardList />
              </ActionIcon>
            )}
            {status === "confirmed" && (
              <CompleteIcon title="Complete" onClick={() => handleUpdateStatus("completed")}>
                <FaCheckCircle />
              </CompleteIcon>
            )}
          </>
        )}

        <CancelIcon title="Cancel" onClick={handleCancel}>
          <FaTimes />
        </CancelIcon>
      </ActionIconsWrapper>

      <AppointmentDate>{new Date(date).toLocaleDateString()}</AppointmentDate>

      <AppointmentStatusWrapper $status={status}>
        Status: <span>{status}</span>
      </AppointmentStatusWrapper>

      {isCrafter ? (
        <AppointmentCrafter>Booked By: {bookedByName}</AppointmentCrafter>
      ):(
        <AppointmentCrafter>Crafter: {bookedByName}</AppointmentCrafter>
      )
      }

      {!isCrafter && status === "completed" && (
        <ReviewBox
          userEmail={userEmail}
          crafterEmail={crafterEmail}
          appointmentId={id}
          onSuccess={onDelete}
        />
      )}
    </AppointmentCard>
  );
};

export default AppointmentItem;
