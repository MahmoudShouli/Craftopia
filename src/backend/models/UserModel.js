import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  role: { type: String, required: true },
  craft: { type: String, required: false },
  avatarUrl: { type: String, required: false },
  chattedWith: [{ type: String }],
  preferences: {
    favoriteColors: {
      type: Map,
      of: Number,
      default: {},
    },
    preferredTags: {
      type: Map,
      of: Number,
      default: {},
    },
  },
});

// 🧭 Add the 2dsphere index for geospatial queries
UserSchema.index({ location: "2dsphere" });

const UserModel = mongoose.model("Users", UserSchema, "users");

export default UserModel;
