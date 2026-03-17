import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import {
  CREATED,
  BAD_REQUEST,
  CONFLICT
} from "@/components/server/constants/httpCodes";
import { PLACEHOLDER_URL } from "@/components/server/constants/env-keys";

import { connectDB } from "@/components/server/config/connection";
import { zodRegisterSchema } from "@/components/server/schemas/zod/zod-auth/ZodRegister";
import { mailingSystem } from "@/components/server/useCases/mailingSystem";
import { registerUser } from "@/components/server/dataAccess/users";

import AppError from "@/components/server/utils/appError";
import errorHandler from "@/components/server/middleware/errorHandler";
import User from "@/components/server/schemas/mongoose/User";

export async function POST(req: NextRequest){
  await connectDB();

  try{
    const body = await req.json();
    const parsed = zodRegisterSchema.safeParse(body);
  
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }
    
    const { email, name, password } = parsed.data;

    const duplicatedUserKeys = await registerUser(name, email);

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
    
    const newUser = new User({
      email,
      name,
      password,
      avatar: placeholderURL
    });
    await newUser.save();
    await mailingSystem(newUser._id as string, email);

    return NextResponse.json({
      message: "A verification email has been sent"
    }, { status: CREATED });
  }
  catch(error){
    return errorHandler(req, error);
  }
}