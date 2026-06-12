import { NextRequest, NextResponse } from "next/server";

import {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  TOO_MANY_REQUESTS
} from "@/components/server/constants/httpCodes";
import { APP_ORIGIN } from "@/components/server/constants/env-keys";

import { ZodForgotPassword } from "@/components/server/schemas/zod/zod-password/ZodForgotPassword";
import { findUserPassword, resetPasswordRecord } from "@/components/server/dataAccess/password";
import {
  createResetPasswordCode,
  createResetPasswordEmail
} from "@/components/server/dataAccess/verification";
import { resetPasswordEmailTemplate } from "@/components/server/utils/email/templates/resetPasswordTemplate";
import { fifteenMinutesFromNow } from "@/components/server/utils/date";
import { resetPasswordEmail } from "@/components/server/utils/email/resetPasswordEmail";

import VerificationCodeType from "@/components/server/constants/verificationCodeType";

export async function POST(req: NextRequest){
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
    userId: user?.id,
    type: VerificationCodeType.PasswordReset
  });

  if(recentReset){
    return NextResponse.json({
      message: "An email has already been sent. Try again later."
    }, { status: TOO_MANY_REQUESTS });
  }
  
  const resetRecord = await createResetPasswordCode({
    userId: user?.id,
    type: VerificationCodeType.PasswordReset,
    expiresAt: fifteenMinutesFromNow()
  });
  const resetToken = resetRecord.id;

  await resetPasswordRecord({
    userId: user?.id,
    resetPasswordToken: resetToken,
    resetPasswordExpire: fifteenMinutesFromNow()
  });

  const resetUrl = `${APP_ORIGIN}/reset-password/${resetToken}`;
  resetPasswordEmailTemplate(user?.name, resetUrl);

  try{
    await resetPasswordEmail(user.id, user.email, resetToken);
    return NextResponse.json({
      message: `The Email has been sent to: ${user?.email}`
    }, { status: CREATED });
  }
  catch(error: unknown){
    return NextResponse.json({
      message: "Failed to send reset email"
    }, { status: BAD_REQUEST });
  }
}