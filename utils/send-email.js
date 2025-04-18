import { emailTemplates } from "./email-template.js";
import dayjs from "dayjs";
import { accountEmail, transporter } from "../config/nodemailer.js";


export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) {
    throw new Error("Missing required parameters");
  }

  const template = emailTemplates.find((t) => t.label == type);

  if (!template) {
    throw new Error("Invalid email type");
  }

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  // This part is responsible to generate the body of the email that is sent to the user's email.
  const message = template.generateBody(mailInfo);
  const subject = template.generateBody(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log("Error sending email");
    else {
      console.log("email sent : ", info.response);
    }
  });
};
