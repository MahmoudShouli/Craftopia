import axios from "axios";

export const toggleLike = async (userEmail, templateId) => {
  const res = await axios.post("http://localhost:3000/likes/toggle", {
    userEmail,
    templateId,
  });
  return res.data; // should return { liked: true/false }
};

export const getUserLikedTemplates = async (userEmail) => {
  const res = await axios.get(`http://localhost:3000/likes/${userEmail}`);
  return res.data.likedTemplateIds; // returns array
};
