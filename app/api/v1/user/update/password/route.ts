import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { BAD_REQUEST, OK } from "@/components/server/constants/httpCodes";

import { ZodChangePassword } from "@/components/server/schemas/zod/zod-password/ZodChangePassword";
import { fetchUserById, updateUserPassword } from "@/components/server/dataAccess/users";

import { comparePassword } from "@/components/server/utils/userUtils/comparePassword";
import { isAuthenticatedUser } from "@/components/server/utils/auth";
import { sendToken } from "@/components/server/utils/jwt/jwtToken";

import AppError from "@/components/server/utils/appError";
import errorHandler from "@/components/server/middleware/errorHandler";

export async function PUT(req: NextRequest){

  try{
    const body = await req.json();
    const parsed = ZodChangePassword.safeParse(body);
  
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }
    
    const { currentPassword, newPassword } = parsed.data;
    
    const user = await isAuthenticatedUser();
    await fetchUserById(user?.id);

    const isMatchedPass = await comparePassword(currentPassword, user?.password);
    if(!isMatchedPass){
      throw new AppError(BAD_REQUEST, "Old Password Is Incorrect");
    }

    if(currentPassword === newPassword){
      throw new AppError(BAD_REQUEST, "New password must be different");
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await updateUserPassword(user.id, hashedNewPassword);

    return await sendToken(user, OK, {
      message: "Password successfully changed"
    });
  }
  catch(error){
    return errorHandler(req, error);
  }
}