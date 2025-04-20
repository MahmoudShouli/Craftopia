import axios from "axios";

export const fetchReviews = async () => {
  const res = await axios.get("http://localhost:3000/reviews/getAllReviews");
  return res.data;
};

export const addReview = async ({
  email,
  rating,
  message,
  type,
  to = null,
}) => {
  const response = await axios.post("http://localhost:3000/reviews/addReview", {
    email,
    rating,
    message,
    type,
    to,
  });
  return response.data;
};
