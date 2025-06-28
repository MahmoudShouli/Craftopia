import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const generateFromDescription = async (description) => {
  const res = await axios.post(`${BASE_URL}/ai/generate-image`, {
    description,
  });
  return res.data.imageUrl;
};
