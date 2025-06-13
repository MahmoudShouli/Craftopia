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
import { deleteAppointment } from "../../../api/appointmentService";
import { toast } from "react-toastify";
import ReviewBox from "../../reviewbox/ReviewBox";
import { useUser } from "../../../context/UserContext";
import notificationService from "../../../api/notificationService";
import { socket } from "../../../../utils/socket";

const AppointmentItem = ({
  id,
  date,
  status,
  crafterName,
  crafterEmail,
  userEmail,
  onDelete,
  onConfirm,
  showBookedByName = false,
  bookedByName = "",
  isCrafter = false,
}) => {
  const { user } = useUser();

  const handleCancel = async () => {
    if (isCrafter) {
      onDelete?.({ id, date, userEmail }); // Show cancel reason modal
    } else {
      if (status !== "pending") {
        toast.error("You can only cancel a pending appointment.");
        return;
      }

      try {
        const res = await deleteAppointment(id, user.role);
        if (res.success) {
          toast.success("Appointment canceled");
          onDelete?.(id); // Just remove from UI
        }

      } catch (err) {
        toast.error(err.response?.data?.error || "Cannot cancel appointment.");
      }
    }
  };

  const handleConfirm = async () => {
  if (!isCrafter) return;

  try {
    await onConfirm?.({ id, date, userEmail, crafterEmail });

  } catch (err) {
    toast.error("Failed to confirm appointment.");
  }
};

  return (
    <AppointmentCard>
      <ActionIconsWrapper>
        {isCrafter && (
          <>
            {status === "pending" && (
              <ActionIcon title="Confirm" onClick={handleConfirm}>
                <FaClipboardList />
              </ActionIcon>
            )}
            {status === "confirmed" && (
              <CompleteIcon
                title="Complete"
                onClick={() => onConfirm?.({ id, date, userEmail, crafterEmail, newStatus: "completed" })}
              >
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
      ) : (
        <AppointmentCrafter>Crafter: {crafterName}</AppointmentCrafter>
      )}

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
