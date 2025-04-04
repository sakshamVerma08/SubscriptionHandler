import dayjs from "dayjs";
import { createRequire } from "module";
import Subscription from "../models/subscription.model";
const require = createRequire(import.meta.url);
import Subscription from "../models/subscription.model.js";

const { server } = require("@upstash/workflow/express");

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") {
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription with ${subscriptionId}. Stopping workflow`
    );
    return;
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};
