import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get("/", () => {
  res.message("Hello World");
});

export default workflowRouter;
