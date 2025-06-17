import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
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
    const response = await axios.post("http://localhost:3000/auth/register", {
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
