import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      minLength: 2,
      maxLength: 50,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "User email is required"],
      minLength: 5,
      maxLength: 50,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
      lowercase: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
