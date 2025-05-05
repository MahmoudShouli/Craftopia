import UserModel from "../models/UserModel.js";

export const getUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

export const updatePreferencesInDb = async (email, colorMap, tagMap) => {
  const updated = await UserModel.findOneAndUpdate(
    { email },
    {
      $set: {
        "preferences.favoriteColors": colorMap,
        "preferences.preferredTags": tagMap,
      },
    },
    { new: true }
  );

  return updated;
};
