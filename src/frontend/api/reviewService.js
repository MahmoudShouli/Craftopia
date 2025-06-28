import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchReviews = async () => {
  const res = await axios.get(`${BASE_URL}/reviews/getAllReviews`);
  return res.data;
};

export const addReview = async ({
  email,
  rating,
  message,
  type,
  to = null,
}) => {
  const response = await axios.post(`${BASE_URL}/reviews/addReview`, {
    email,
    rating,
    message,
    type,
    to,
  });
  return response.data;
};

export const getReviewsByEmail = async (email) => {
  const res = await axios.get(`${BASE_URL}/reviews/getByEmail?email=${email}`);
  return res.data;
};

export const fetchAllReviewsAdmin = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/reviews/admin/getAllReviews`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch admin reviews:", error);
    return [];
  }
};
