import { NextRequest, NextResponse } from "next/server";

import {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  TOO_MANY_REQUESTS
} from "@/components/server/constants/httpCodes";
import { APP_ORIGIN, SMTP_FROM_EMAIL } from "@/components/server/constants/env-keys";

import { connectDB } from "@/components/server/config/connection";

import { findUserPassword } from "@/components/server/dataAccess/password";
import { ZodForgotPassword } from "@/components/server/schemas/zod/zod-password/ZodForgotPassword";
import { resetPasswordEmailTemplate } from "@/components/server/utils/email/templates/resetPasswordTemplate";
import { fiveMinutesAgo, oneHourFromNow } from "@/components/server/utils/date";

import {
  createResetPasswordCode,
  createResetPasswordEmail
} from "@/components/server/dataAccess/verification";

import sendEmail from "@/components/server/utils/email/sendEmail";
import VerificationCodeType from "@/components/server/constants/verificationCodeType";

export async function POST(req: NextRequest){
  await connectDB();

  const body = await req.json();
  const parsed = ZodForgotPassword.safeParse(body);
      
  if(!parsed.success){
    return NextResponse.json({
      error: parsed.error.issues
    }, { status: BAD_REQUEST });
  }

  const { email } = parsed.data;

  const user = await findUserPassword(email);

  if(!user){
    return NextResponse.json({
      message: "User doesn't exist"
    }, { status: NOT_FOUND });
  }

  const recentReset = await createResetPasswordEmail({
    name: user?._id,
    type: VerificationCodeType.PasswordReset,
    createdAt: { $gt: fiveMinutesAgo() }
  });

  if(recentReset){
    return NextResponse.json({
      message: "An email has already been sent. Try again later."
    }, { status: TOO_MANY_REQUESTS });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save();

  await createResetPasswordCode({
    name: user?._id,
    token: resetToken,
    type: VerificationCodeType.PasswordReset,
    expiresAt: oneHourFromNow()
  });

  const resetUrl = `${APP_ORIGIN}/reset-password/${resetToken}`;
  const message = resetPasswordEmailTemplate(user?.name, resetUrl);

  try{
    await sendEmail({
      from: SMTP_FROM_EMAIL,
      to: email,
      subject: message?.subject,
      text: message?.text,
      html: message?.html
   });
   return NextResponse.json({
     message: `The Email has been sent to: ${user?.email}`
   }, { status: CREATED });
  }
  catch(error: unknown){
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save();

    return NextResponse.json({
      message: "Failed to send reset email"
    }, { status: BAD_REQUEST });
  }
}