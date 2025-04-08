/*
import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

export const sendReminders = serve(async (context) => {
  const REMINDERS = [7, 5, 2, 1];
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") {
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);
  console.log("RENEWAL DATE: ", renewalDate.format("YYY-MM-DD"));

  // Check to check if the Renewal date was before the current date (passed).
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription with ${subscriptionId}. Stopping workflow`
    );

    (await subscription.status) == "expired";
  }

  if (subscription.status === "expired") {
    console.log(
      `Renewal date has passed for subscription with ${subscriptionId}. Stopping workflow`
    );
    return;
  }

  for (let daysBefore of REMINDERS) {
    let reminderDate = renewalDate.subtract(daysBefore, "day");
    console.log("reminderDate = ", reminderDate.format("YYY-MM-DD"));
    if (reminderDate.isAfter(dayjs())) {
      // If reminder date is not today, then put it to sleep
      await sleepUntilReminder(
        context,
        `${daysBefore} days before reminder`,
        reminderDate
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `Reminder ${daysBefore} days before`,
        subscription
      );
    }
  }
});

// Used to fetch a particular subscription , to be more accurate, that subscription whose id we gave in the parameters.
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping Until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription: subscription,
    });
  });
};
*/

import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs(), "day")) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription
      );
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};
