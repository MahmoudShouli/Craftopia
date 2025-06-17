import axios from "axios";

export const generateFromDescription = async (description) => {
  const res = await axios.post("http://localhost:3000/ai/generate-image", {
    description,
  });
  return res.data.imageUrl;
};
