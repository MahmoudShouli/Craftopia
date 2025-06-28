import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const register = async (
  name,
  email,
  password,
  location,
  role,
  craft,
  avatarUrl
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
      location,
      role,
      craft,
      avatarUrl,
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
