import {
  SMTP_FROM_NAME,
  SMTP_FROM_EMAIL,
  NODE_ENV
} from "../constants/env-keys";

import { EmailOptions } from "../serverInterfaces/emailInterface";
import { emailTransporter } from "../utils/email/emailTransporter";

const mailingSystem = async(options: EmailOptions): Promise<void> =>{
  const message = {
    from: NODE_ENV === "development"
    ? `${SMTP_FROM_NAME} <noreply@auth.com>`
    : `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };
  
  try{
    await emailTransporter.sendMail(message);
  }
  catch(error){
    console.error("Nodemailer OAuth Error:", error);
    throw new Error("Failed to send email");
  }
};

export default mailingSystem;