import nodemailer, { Transporter } from "nodemailer";

import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
  SMTP_EMAIL
} from "../../constants/env-keys";

export const emailTransporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: SMTP_EMAIL,
    clientId: OAUTH_CLIENT_ID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN
  }
});