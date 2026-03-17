import { NextRequest, NextResponse } from "next/server";

import { INTERNAL_SERVER_ERROR, OK } from "@/components/server/constants/httpCodes";

import { connectDB } from "@/components/server/config/connection";
import { zodVerificationCodeSchema } from "@/components/server/schemas/zod/zod-auth/ZodVerificationCode";
import { verifyEmail } from "@/components/server/utils/email/verifyEmail";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ code: string }> }
){
  await connectDB();
  
  const { code } = await context.params;
  try{
    const verificationCode = zodVerificationCodeSchema.parse(code);
    await verifyEmail(verificationCode);
    return NextResponse.json({
      message: "Your Email is verified"
    },{ status: OK });
  }
  catch(error){
    console.error(error);
    return NextResponse.json({
      error: "Email verification error"
    },{ status: INTERNAL_SERVER_ERROR });
  }
};