const AppointmentStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELED: "canceled",
  DISABLED: "disabled",
};

export const AppointmentStatusArray = Object.values(AppointmentStatus);
export default AppointmentStatus;
