/* eslint-disable no-unused-vars */
import UserModel from "../models/UserModel.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.json({ message: "Invalid email" });

    const isMatch = password === user.password;
    if (!isMatch) return res.json({ message: "Invalid password" });

    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { signIn };
