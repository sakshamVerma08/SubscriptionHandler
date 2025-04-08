import nodemailer from "nodemailer";

import { EMAIL_PASSWORD } from "./env.js";
export const accountEmail = "sakshamverma1000@gmail.com";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD,
  },
});
