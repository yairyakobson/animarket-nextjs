import { NextResponse } from "next/server";

import { OK, UNAUTHORIZED } from "@/components/server/constants/httpCodes";

import { isAuthenticatedUser } from "@/components/server/utils/auth";

export async function GET(){
  try{
    const user = await isAuthenticatedUser();
    return NextResponse.json(user, { status: OK });
  }
  catch(error){
    console.error("Authentication error:", error);
    return NextResponse.json({
      error: "Unauthorized"
    }, { status: UNAUTHORIZED });
  }
}