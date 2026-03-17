import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../constants/env-keys";
import { UNAUTHORIZED } from "../constants/httpCodes";

import { fetchUser } from "../dataAccess/users";
import AppError from "./appError";

export const isAuthenticatedUser = async() =>{
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if(!token){
    throw new AppError(UNAUTHORIZED ,"Login to gain access to this resource");
  }
  const decoded = jwt.verify(token, JWT_SECRET!) as { id: string };
  const user = await fetchUser(decoded.id);

  if(!user){
    throw new Error("User not found");
  }
  return user;
};