import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Either email or password is invalid");
      error.statusCode = 400;
      throw error;
    }

    // Checking if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hashing the password, not storing it directly.
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    (await session).endSession();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Checking if email and password are there or not
    if (!email || !password) {
      const error = new Error("Enter email and password correctly");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found in Database");
      error.statusCode = 404;
      throw error;
    }

    // Validating the current password with the original password for that account
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "User Logged in successfully",
        data: { token, user },
      });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
