import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  craft: { type: String, required: false },
});

const UserModel = mongoose.model("Users", UserSchema, "users");

export default UserModel;
