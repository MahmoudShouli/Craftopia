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

export const getChattedWith = async (userEmail) => {
  const user = await UserModel.findOne({ email: userEmail });
  if (!user || !user.chattedWith || user.chattedWith.length === 0) return [];

  return await UserModel.find({ email: { $in: user.chattedWith } });
};

export const addToChattedWith = async (userEmail, crafterEmail) => {
  return await UserModel.updateOne(
    { email: userEmail },
    { $addToSet: { chattedWith: crafterEmail } } // avoids duplicates
  );
};
