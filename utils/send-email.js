import { accountEmail } from "../config/nodemailer.js";
import { transporter, emailTemplates } from "./email-template.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) {
    throw new Error("Missing required Parameters");
  }

  const template = emailTemplates.find((t) => t.label === type);

  if (!template) {
    throw new Error("Invalid email type");
  }

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: daysjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: "message",
  };

  transporter.sendReminderEmail(mailOptions, (error, info) => {
    if (error) return console.log(error, "error sending email");

    console.log("Email sent: " + info.response);
  });

  generateSubject(mailInfo);
  let message = template.generateBody(mailInfo);
  let subject = template;
};
