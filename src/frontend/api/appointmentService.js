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
