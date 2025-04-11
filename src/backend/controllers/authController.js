import UserModel from "../models/UserModel.js"; // adjust path if needed

export const registerUser = async (req, res) => {
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
