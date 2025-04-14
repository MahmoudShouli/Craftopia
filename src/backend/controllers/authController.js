/* eslint-disable no-unused-vars */
import UserModel from "../models/UserModel.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.json({ message: "Invalid email" });

    const isMatch = password === user.password;
    if (!isMatch) return res.json({ message: "Invalid password" });

    if (user.role == "crafter")
      res.json({
        name: user.name,
        role: user.role,
        craft: user.craft,
      });
    else {
      res.json({
        name: user.name,
        role: user.role,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, location, role, craft } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const newUser = new UserModel({
      name,
      email,
      password,
      location,
      role,
      craft: role === "crafter" ? craft : "",
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered", user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export { signIn, registerUser };