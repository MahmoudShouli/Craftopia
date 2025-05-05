import User from "../models/UserModel.js";

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const getChattedWith = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  if (!user || !user.chattedWith || user.chattedWith.length === 0) return [];

  return await User.find({ email: { $in: user.chattedWith } });
};

export const addCrafterToChattedWith = async (userEmail, crafterEmail) => {
  return await User.updateOne(
    { email: userEmail },
    { $addToSet: { chattedWith: crafterEmail } } // avoids duplicates
  );
};
