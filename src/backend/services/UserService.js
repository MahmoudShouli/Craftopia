import { updatePreferencesInDb } from "../repositories/UserRepository.js";
import { getUserByEmail } from "../repositories/UserRepository.js";

export const updateUserPreferences = async (email, colorsArray, tagsArray) => {
  const colorMap = {};
  const tagMap = {};

  colorsArray.forEach((color) => {
    colorMap[color] = 1; // default initial weight
  });

  tagsArray.forEach((tag) => {
    tagMap[tag] = 1;
  });

  return await updatePreferencesInDb(email, colorMap, tagMap);
};

export const fetchUserByEmail = async (email) => {
  return await getUserByEmail(email);
};
