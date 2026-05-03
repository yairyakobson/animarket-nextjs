import { User } from "@/drizzle-utils/schemas";

export function omitPassword(user: User){
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}