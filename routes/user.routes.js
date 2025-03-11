import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorized from "../middlewares/auth.middleware.js";
import errorMiddleware from "../middlewares/error.middleware.js";
const userRouter = Router();

// Get All Users
userRouter.get("/", authorized, errorMiddleware, getUsers);

// Get Single User , based on id
userRouter.get("/:id", authorized, errorMiddleware, getUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "POST user router" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "PUT user route" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE user route" });
});

export default userRouter;
