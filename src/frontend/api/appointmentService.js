import axios from "axios";

const API_BASE = "http://localhost:3000/appointments";

export const createAppointment = async ({ userEmail, crafterEmail, date }) => {
  const response = await axios.post(`${API_BASE}/create`, {
    userEmail,
    crafterEmail,
    date,
  });
  return response.data;
};

export const getAppointmentsByEmail = async (email, role = null) => {
  const url = role
    ? `${API_BASE}/${email}?role=${role}`
    : `${API_BASE}/${email}`;

  const response = await axios.get(url);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await axios.delete(
    `http://localhost:3000/appointments/delete/${id}`
  );
  return response.data;
};

export const getDisabledDates = async (crafterEmail) => {
  const res = await axios.get(
    `http://localhost:3000/appointments/disabledDates/${crafterEmail}`
  );
  return res.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const res = await axios.patch(
    `http://localhost:3000/appointments/${id}/status`,
    { status }
  );
  return res.data;
};
