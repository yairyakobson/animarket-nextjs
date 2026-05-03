import { APP_ORIGIN, SMTP_FROM_EMAIL } from "../../constants/env-keys";

import { resetPasswordEmailTemplate } from "./templates/resetPasswordTemplate";

import mailingSystem from "../../useCases/mailingSystem";

export async function resetPasswordEmail(
  newUser: string,
  email: string,
  token: string
){
  const resetUrl = `${APP_ORIGIN}/reset-password/${token}`;
  const resetPasswordTemplate = resetPasswordEmailTemplate(newUser, resetUrl);

  await mailingSystem({
    from: SMTP_FROM_EMAIL,
    to: email,
    subject: resetPasswordTemplate.subject,
    text: resetPasswordTemplate.text,
    html: resetPasswordTemplate.html
  });
}