import { NextResponse } from "next/server";

import { COOKIE_EXPIRATION_TIME, NODE_ENV } from "../../constants/env-keys";

import { getJwtToken } from "../userUtils/getJwtToken";
import { User } from "@/drizzle-utils/schemas";

export async function sendToken(
  user: User,
  statusCode: number,
  payload: Record<string, any> = {}
){
  const token = getJwtToken(user); // Create JWT Token

  const cookieExpirationDays = Number(COOKIE_EXPIRATION_TIME) || 7; // fallback: 7 days
  const expires = new Date(Date.now() + cookieExpirationDays * 24 * 60 * 60 * 1000);

  const response = NextResponse.json({
    ...payload,
    user: {
      _id: user.id?.toString(),
      name: user?.name,
      email: user?.email
    },
    token
  }, { status: statusCode });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    expires,
    path: "/", // ensure it's available app-wide
    secure: NODE_ENV === "production",
    sameSite: "strict"
  });

  return response;
}