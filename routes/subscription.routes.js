import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "GET all Subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send({ title: `GET details for subscription ${id}` });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({ title: "CREATE subscriptions" });
});

subscriptionRouter.post("/:id", (req, res) => {
  res.send({ title: "CREATE particular subscription" });
});

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
