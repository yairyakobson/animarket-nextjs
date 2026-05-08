import { cookies } from "next/headers";

import { JWT_SECRET } from "../../constants/env-keys";

import { UserQueryData } from "@/components/client/clientInterfaces/userQueryInterface";
import { verifyToken } from "../tokens/verifyToken";
import { JWTPayload } from "../../serverInterfaces/jwtPayloadInterface";

export async function getServerUser(): Promise<UserQueryData | null>{
  const token = (await cookies()).get("token")?.value;
  
  if(!token) return null;

  try{
    const decoded = verifyToken(token, JWT_SECRET) as JWTPayload;

    return{
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      createdAt: decoded.createdAt,
      avatar: decoded.avatar,
      public_id: decoded.public_id ?? null,
      url: decoded.url ?? null,
      signed_url: decoded.signed_url ?? null
    };
  }
  catch{
    return null;
  }
}