import nodemailer, { Transporter } from "nodemailer";
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_EMAIL,
  SMTP_PASSWORD,
  SMTP_FROM_NAME,
  SMTP_FROM_EMAIL,
  NODE_ENV,
} from "../../constants/env-keys";
import { EmailOptions } from "../../serverInterfaces/emailInterface";

const sendEmail = async(options: EmailOptions): Promise<void> =>{
  const transport: Transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD
    }
  });

  const message = {
    from: NODE_ENV === "development"
    ? `${SMTP_FROM_NAME} <noreply@animarket.com>`
    : `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };
  
  await transport.sendMail(message);
};

export default sendEmail;