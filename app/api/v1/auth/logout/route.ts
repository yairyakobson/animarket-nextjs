import { NextRequest, NextResponse } from "next/server";

import { NODE_ENV } from "@/components/server/constants/env-keys";
import { OK } from "@/components/server/constants/httpCodes";

import { verifyJwtToken } from "@/components/server/utils/tokens/verificationToken";
import { userStatus } from "@/components/server/dataAccess/users";

export async function GET(req: NextRequest){
  try{
    const token = req.cookies.get("token")?.value;

    if(token){
      const decoded = verifyJwtToken(token) as { id: string };

      if(decoded && decoded.id){
        await userStatus(decoded.id, "Offline");
      }
    }
  }
  catch(error){
    console.warn("Logout token verification failed:", error);
  }

  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: OK }
  );

  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0)
  });

  return response;
}