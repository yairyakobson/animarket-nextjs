import { APP_ORIGIN, SMTP_FROM_EMAIL } from "../constants/env-keys";
import { createVerificationCode } from "../dataAccess/verification";

import { getVerifyEmailTemplate } from "../utils/email/templates/verifyEmailTemplate";
import { oneYearFromNow } from "../utils/date";

import VerificationCodeType from "../constants/verificationCodeType";
import sendEmail from "../utils/email/sendEmail";

export async function mailingSystem(newUser: string, email: string){
  const emailVerify = await createVerificationCode({
    name: newUser,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow()
  });

  const url = `${APP_ORIGIN}/email/verify/${emailVerify._id}`;
  const emailTemplate = getVerifyEmailTemplate(url);

  await sendEmail({
    from: SMTP_FROM_EMAIL,
    to: email,
    subject: emailTemplate.subject,
    text: emailTemplate.text,
    html: emailTemplate.html
  });
}