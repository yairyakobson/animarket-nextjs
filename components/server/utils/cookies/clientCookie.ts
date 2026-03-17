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
      _id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      avatar: decoded.avatar,
      picture: {
        public_id: decoded.picture.public_id,
        url: decoded.picture.url,
        signed_url: decoded.picture.signed_url
      }
    };
  }
  catch{
    return null;
  }
}