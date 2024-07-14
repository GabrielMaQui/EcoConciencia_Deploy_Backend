import mongoose from "mongoose";

const userSchema = {
  name: String,
  email: String,
  password: String,
  photo_url: String,
  likes: { type: Array, default: [] },
};

const User = mongoose.model(
  "User",
  new mongoose.Schema(userSchema, { timestamps: true }),
  "user"
);

export default User;
