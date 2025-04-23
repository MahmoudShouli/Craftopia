const AppointmentStatus = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELED: "canceled",
};

export const AppointmentStatusArray = Object.values(AppointmentStatus);
export default AppointmentStatus;
