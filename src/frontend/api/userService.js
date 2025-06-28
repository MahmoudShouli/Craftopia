import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${BASE_URL}/user`;

export const fetchUsers = async ({
  query,
  selectedCraft,
  sortByRating,
  location,
  maxDistance,
}) => {
  try {
    const params = {};
    if (query) params.query = query;
    if (selectedCraft) params.craft = selectedCraft;
    if (sortByRating) {
      params.sortBy = "rating";
      params.order = sortByRating;
    }
    if (location) {
      params.lat = location.lat;
      params.lng = location.lng;
    }
    if (maxDistance) params.maxDistance = maxDistance;

    const res = await axios.get(`${API_URL}/search`, {
      params,
    });
    return res.data.users;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }
};

export const getUserByEmail = async (email) => {
  const response = await axios.get(`${API_URL}/email/${email}`);
  return response.data;
};

export const saveUserPreferences = async ({
  email,
  favoriteColors,
  preferredTags,
}) => {
  try {
    const response = await axios.put(`${API_URL}/preferences`, {
      email,
      favoriteColors,
      preferredTags,
    });

    return response.data;
  } catch (err) {
    console.error(
      "Failed to save preferences:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const updateCardInfo = async (email, cardNumber, expiryDate, cvv) => {
  const res = await axios.put(`${API_URL}/card-info`, {
    email,
    cardNumber,
    expiryDate,
    cvv,
  });
  return res.data.user;
};

export const getCraftersByCraft = async (craft) => {
  const res = await axios.get(`${BASE_URL}/user/crafters-by-craft`, {
    params: { craft },
  });
  return res.data;
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data; // { message: "User deleted successfully" }
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user/all`);
    return res.data.users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
};
