import { NextRequest, NextResponse } from "next/server";

import { BAD_REQUEST, OK } from "@/components/server/constants/httpCodes";

import { connectDB } from "@/components/server/config/connection";
import { isAuthenticatedUser } from "@/components/server/utils/auth";
import { updateUserPassword } from "@/components/server/dataAccess/users";
import { sendToken } from "@/components/server/utils/jwt/jwtToken";
import { ZodChangePassword } from "@/components/server/schemas/zod/zod-password/ZodChangePassword";

import AppError from "@/components/server/utils/appError";
import errorHandler from "@/components/server/middleware/errorHandler";

export async function PUT(req: NextRequest){
  await connectDB();

  try{
    const body = await req.json();
    const parsed = ZodChangePassword.safeParse(body);
  
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }
    
    const { currentPassword, newPassword } = parsed.data;
    
    const userId = await isAuthenticatedUser();

    const user = await updateUserPassword(userId);

    const isMatchedPass = await user.compareNewPassword(currentPassword);
    if(!isMatchedPass){
      throw new AppError(BAD_REQUEST, "Old Password Is Incorrect");
    }

    if(currentPassword === newPassword){
      throw new AppError(BAD_REQUEST, "New password must be different");
    }
    user.password = newPassword;
    await user.save();

    return await sendToken(user, OK, {
      message: "Password successfully changed"
    });
  }
  catch(error){
    return errorHandler(req, error);
  }
}