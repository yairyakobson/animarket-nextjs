import { APP_ORIGIN, SMTP_FROM_EMAIL } from "../../constants/env-keys";
import { createVerificationCode } from "../../dataAccess/verification";

import { oneYearFromNow } from "../date";
import { emailVerificationTemplate } from "./templates/verifyEmailTemplate";

import mailingSystem from "../../useCases/mailingSystem";
import VerificationCodeType from "../../constants/verificationCodeType";

export async function userVerificationEmail(newUser: string, email: string){
  const emailVerify = await createVerificationCode({
    userId: newUser,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow()
  });

  const url = `${APP_ORIGIN}/email/verify/${emailVerify.userId}`;
  const emailTemplate = emailVerificationTemplate(url);

  await mailingSystem({
    from: SMTP_FROM_EMAIL,
    to: email,
    subject: emailTemplate.subject,
    text: emailTemplate.text,
    html: emailTemplate.html
  });
}