//this is the point of communication between the frontend and backend
import axios from "axios";

export const register = async (name, email, password, role, craft) => {
  try {
    const response = await axios.post("http://localhost:3000/api/register", {
      name,
      email,
      password,
      role,
      craft,
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
