import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getUserLikedTemplates = async (userEmail) => {
  const res = await axios.get(`${BASE_URL}/likes/${userEmail}`);
  return res.data; // flat array of template IDs
};
export const toggleLike = async (userEmail, templateId) => {
  const res = await axios.post(`${BASE_URL}/likes/toggle`, {
    userEmail,
    templateId,
  });
  return res.data; // { liked: true/false }
};
