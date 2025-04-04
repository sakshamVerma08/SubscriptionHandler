import { Router } from "express";
import authorized from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", authorized, getAllSubscriptions);

// GET a particular User's Subscriptions
subscriptionRouter.get("/user/:id", authorized, getUserSubscriptions);

// Create a NEW SUBSCRIPTION
subscriptionRouter.post("/", authorized, createSubscription);

subscriptionRouter.post("/:id", (req, res) => {
  res.send({ title: "CREATE particular subscription" });
});

// UPDATE a subscription for a particular user
subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE particular subscription" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE particular subscription" });
});

subscriptionRouter.get("/users/:id", (req, res) => {
  res.send({ title: "GET all the subscriptions of a single user" });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "CANCEL particular subscription" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET upcoming subscription renewals" });
});

export default subscriptionRouter;
