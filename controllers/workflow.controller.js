import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import Subscription from "../models/subscription.model.js";

import { serve } from "@upstash/workflow/nextjs";

export const sendReminders = serve(async (context) => {
  const REMINDERS = [7, 5, 2, 1];
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") {
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  // Check to check if the Renewal date was before the current date (passed).
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription with ${subscriptionId}. Stopping workflow`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    let reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      // If reminder date is not today, then put it to sleep
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }

    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }
});

// Used to fetch a particular subscription , to be more accurate, that subscription whose id we gave in the parameters.
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping Until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
  });
};
