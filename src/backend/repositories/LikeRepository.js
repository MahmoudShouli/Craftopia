import Like from "../models/LikeModel.js";

export const createLike = async (userEmail, templateId) => {
  return await Like.create({ userEmail, templateId });
};

export const removeLike = async (userEmail, templateId) => {
  return await Like.findOneAndDelete({ userEmail, templateId });
};

export const isTemplateLiked = async (userEmail, templateId) => {
  return await Like.exists({ userEmail, templateId });
};

export const getLikedTemplatesByUser = async (userEmail) => {
  const likes = await Like.find({ userEmail }).populate("templateId");
  return likes;
};
