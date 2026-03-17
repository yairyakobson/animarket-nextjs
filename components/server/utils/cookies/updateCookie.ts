import { cookies } from "next/headers";
import { oneWeekFromNow } from "../date";

export async function updateUserCookie(user: any){
  const newToken = user.getJwtToken();
  const cookieStore = await cookies();

  cookieStore.set("token", newToken, {
    name: "token",
    value: newToken,
    httpOnly: true,
    path: "/",
    expires: oneWeekFromNow(),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
}