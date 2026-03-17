import { NextRequest, NextResponse } from "next/server";

import { BAD_REQUEST, OK } from "@/components/server/constants/httpCodes";

import { connectDB } from "@/components/server/config/connection";
import {
  deleteResetPasswordEntry,
  updateResettedPassword
} from "@/components/server/dataAccess/password";
import { zodResetPasswordSchema } from "@/components/server/schemas/zod/zod-password/ZodResetPassword";

import AppError from "@/components/server/utils/appError";
import errorHandler from "@/components/server/middleware/errorHandler";
import VerificationCodeType from "@/components/server/constants/verificationCodeType";

export async function PUT(req: NextRequest,
  context: { params: Promise<{ token: string }> }){
    
  await connectDB();

  try{
    const { token } = await context.params;

    const user = await updateResettedPassword(token);

    if(!user){
      throw new AppError(BAD_REQUEST, "Invalid or expired reset token");
    }

    const body = await req.json();
    const parsed = zodResetPasswordSchema.safeParse(body);

    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }

    const { newPassword } = parsed.data;

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await deleteResetPasswordEntry({
      name: user?._id,
      type: VerificationCodeType.PasswordReset
    });

    await user.save();

    return NextResponse.json({
      message: "Password reset was successful",
      success: true
    }, { status: OK });

  }
  catch(error){
    return errorHandler(req, error);
  }
}