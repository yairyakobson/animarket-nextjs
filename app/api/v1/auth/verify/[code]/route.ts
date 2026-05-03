import { NextRequest, NextResponse } from "next/server";

import { INTERNAL_SERVER_ERROR, OK } from "@/components/server/constants/httpCodes";

import { zodVerificationCodeSchema } from "@/components/server/schemas/zod/zod-auth/ZodVerificationCode";
import { userStatusUpdate } from "@/components/server/useCases/userStatus";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ code: string }> }
){
  const { code } = await context.params;
  
  try{
    const verificationCode = zodVerificationCodeSchema.parse(code);
    await userStatusUpdate(verificationCode);
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