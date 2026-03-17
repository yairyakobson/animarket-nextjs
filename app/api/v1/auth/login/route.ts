import { NextRequest, NextResponse } from "next/server";

import {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN
} from "@/components/server/constants/httpCodes";

import { connectDB } from "@/components/server/config/connection";
import { zodLoginSchema } from "@/components/server/schemas/zod/zod-auth/ZodLogin";
import { loginUser, userStatus } from "@/components/server/dataAccess/users";
import { sendToken } from "@/components/server/utils/jwt/jwtToken";

import AppError from "@/components/server/utils/appError";
import errorHandler from "@/components/server/middleware/errorHandler";

export async function POST(req: NextRequest){
  await connectDB();
  
  try{
    const body = await req.json();
    const parsed = zodLoginSchema.safeParse(body);
  
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }
    
    const { email, password } = parsed.data;
  
    const user = await loginUser(email);
    if(!user || !(await user.comparePassword(password))){
      throw new AppError(UNAUTHORIZED, "Invalid Email and/or Password");
    }
    else if(!user.verified){
      throw new AppError(FORBIDDEN, "Verify your email address first");
    }
    await userStatus(user?._id as string, "Online");

    if(user.status === "Online"){
      throw new AppError(BAD_REQUEST, "You're already logged in");
    }

    return await sendToken(user, OK, {
      message: "Login Successful"
    });
  }
  catch(error: unknown){
    return errorHandler(req, error);
  }
}