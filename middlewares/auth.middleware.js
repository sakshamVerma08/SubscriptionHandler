import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorized = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization Header doesn't exist" });
    }

    if (!authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Authorization Header is not a Bearer Token" });
    }

    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log("Token not found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);


    const user = await User.findById(decoded.userId);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: error.message });
  }
};

export default authorized;
