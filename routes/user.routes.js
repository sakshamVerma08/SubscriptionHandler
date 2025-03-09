import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ title: "GET all users" });
});

userRouter.get("/:id", (req, res) => {
  res.send({ title: "GET particular user" });
});

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
