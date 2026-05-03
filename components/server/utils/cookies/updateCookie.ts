import { cookies } from "next/headers";

import { getJwtToken } from "../userUtils/getJwtToken"
import { oneWeekFromNow } from "../date";
import { User } from "@/drizzle-utils/schemas";

export async function updateUserCookie(user: User){
  const newToken = getJwtToken(user);
  const cookieStore = await cookies();

  cookieStore.set("token", newToken, {
    name: "token",
    httpOnly: true,
    path: "/",
    expires: oneWeekFromNow(),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
}