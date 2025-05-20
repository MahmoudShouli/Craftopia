// services/LikeService.js
import * as LikeRepository from "../repositories/LikeRepository.js";
import TemplateModel from "../models/TemplateModel.js";

export const toggleLike = async (userEmail, templateId) => {
  const alreadyLiked = await LikeRepository.isTemplateLiked(
    userEmail,
    templateId
  );

  if (alreadyLiked) {
    await LikeRepository.removeLike(userEmail, templateId);
    await TemplateModel.findByIdAndUpdate(templateId, { $inc: { likes: -1 } });
    return { liked: false };
  } else {
    await LikeRepository.createLike(userEmail, templateId);
    await TemplateModel.findByIdAndUpdate(templateId, { $inc: { likes: 1 } });
    return { liked: true };
  }
};

export const getUserLikedTemplateIds = async (userEmail) => {
  const likes = await LikeRepository.getLikedTemplatesByUser(userEmail);
  return likes.map((like) => like.templateId.toString());
};
