import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import {
  CREATED,
  BAD_REQUEST,
  CONFLICT
} from "@/components/server/constants/httpCodes";
import { PLACEHOLDER_URL } from "@/components/server/constants/env-keys";

import { zodRegisterSchema } from "@/components/server/schemas/zod/zod-auth/ZodRegister";
import { insertUser, registerUser } from "@/components/server/dataAccess/users";
import { userVerificationEmail } from "@/components/server/utils/email/verificationEmail";
import { hashValue } from "@/components/server/utils/bcrypt/hashValue";

import AppError from "@/components/server/utils/appError";
import errorHandler from "@/components/server/middleware/errorHandler";

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const parsed = zodRegisterSchema.safeParse(body);
  
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }
    
    const { name, email, password } = parsed.data;

    const duplicatedUserKeys = await registerUser({ name, email });

    if(duplicatedUserKeys){
      throw new AppError(CONFLICT, "User and/or Email Address already exists");
    }

    const initials = name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase();

    const seed = `${initials}-${uuidv4()}`;
    const placeholderURL = `${PLACEHOLDER_URL}/${seed}`
    const hashedPassword = await hashValue(password);
    
    const newUser = await insertUser({
      name,
      email,
      password: hashedPassword,
      avatar: placeholderURL
    });
    await userVerificationEmail(newUser.id as string, email);

    return NextResponse.json({
      message: "A verification email has been sent"
    }, { status: CREATED });
  }
  catch(error){
    return errorHandler(req, error);
  }
}